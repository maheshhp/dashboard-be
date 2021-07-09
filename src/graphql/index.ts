import { ApolloServer } from "apollo-server-express";
import { GraphQLError } from "graphql";
import resolvers from "./resolvers";
import { errorCodeMap } from "./constants";
import { typeDefs } from "./schema";
import { Application } from "express";

const formatError = (error: GraphQLError) => {
  console.error(`Error occurred: ${error.message}`);
  const formattedError =
    errorCodeMap[error.message] || errorCodeMap.IMPLEMENTATION_ERROR;
  // Formatting to ensure no sensitive info goes to FE
  return {
    message: formattedError.errorCategory,
    extensions: {
      errorCode: formattedError.errorCode,
    },
  };
};

const gqlServer = new ApolloServer({ typeDefs, resolvers, formatError });

export const attchGqlMw = (app: Application): void => {
  gqlServer.applyMiddleware({ app });
};
