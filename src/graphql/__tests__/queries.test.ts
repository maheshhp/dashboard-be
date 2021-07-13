import app from "../../server";
import supertest from "supertest";
import { AxiosRequestConfig } from "axios";
import jwt from "jsonwebtoken";
import { countrySearchMockRes, currencySearchMockRes } from "./api.mocks";

jest.mock("axios", () =>
  jest.fn((reqConfig: AxiosRequestConfig) => {
    if (reqConfig.url?.includes("invalidCountry")) {
      return Promise.reject({ response: { status: 404 } });
    }
    if (reqConfig.url?.includes("validCountry")) {
      return Promise.resolve({ data: countrySearchMockRes });
    }
    if (reqConfig.params.symbols === "TMY") {
      return Promise.resolve({ data: currencySearchMockRes });
    }
  })
);

const getTempJwt = () => {
  return jwt.sign({ email: "testEmail" }, String(process.env.JWT_SECRET), {
    algorithm: "HS256",
    expiresIn: 10,
  });
};

describe("Testing GQL queries", () => {
  const request = supertest(app);

  test("should get 401 for query without valid JWT", (done) => {
    request
      .post("/graphql")
      .send({
        query: `{ searchCountries(countryName: "test") { name alpha3Code population currencies {  name  symbol  code } }}`,
      })
      .set("Accept", "application/json")
      .expect(401)
      .end(() => {
        done();
      });
  });

  test("should get countries search response", (done) => {
    const tempJwt = getTempJwt();
    request
      .post("/graphql")
      .send({
        query: `{ searchCountries(countryName: "validCountry") { name alpha3Code population currencies {  name  symbol  code } }}`,
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${tempJwt}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          data: {
            searchCountries: countrySearchMockRes,
          },
        });
        done();
      });
  });

  test("should get empty array when no country in search response", (done) => {
    const tempJwt = getTempJwt();
    request
      .post("/graphql")
      .send({
        query: `{ searchCountries(countryName: "invalidCountry") { name alpha3Code population currencies {  name  symbol  code } }}`,
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${tempJwt}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          data: {
            searchCountries: null,
          },
          errors: [
            {
              message: "NOT_FOUND",
              extensions: {
                errorCode: "COUNTRY_NOT_FOUND_ERROR",
              },
            },
          ],
        });
        done();
      });
  });

  test("should get currencies search response", (done) => {
    const tempJwt = getTempJwt();
    request
      .post("/graphql")
      .send({
        query: `{ currencyRates(currencySymbols: ["TMY"]) { base rates {  code  rate } }}`,
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${tempJwt}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          data: {
            currencyRates: {
              base: "EUR",
              rates: [
                {
                  code: "TMY",
                  rate: 1.18581,
                },
              ],
            },
          },
        });
        done();
      });
  });
});
