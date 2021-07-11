import dayJs from "dayjs";
import { NextFunction, Request, Response } from "express";
import {
  MAX_REQUEST_COUNT_PER_WINDOW,
  RECORD_LOG_INTERVAL_IN_SECONDS,
  WINDOW_SIZE_IN_MINS,
} from "./constants";
import { User, UserAccessRecord } from "./rateLimiter.types";

const userAccessMap: Record<string, Array<UserAccessRecord>> = {};

const getFreshRecord = () => {
  return {
    timeStamp: dayJs().unix(),
    count: 1,
  };
};

export const rateLimiter = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  try {
    const userEmail = (request.user as User)?.email;
    const userRecords = userAccessMap[userEmail];

    if (!userEmail) {
      response.status(400).send("Invalid request");
      return;
    }

    // If no existing req records found for user,
    // create a fresh entry and allow user to access APIs
    if (!userRecords || userRecords.length < 1) {
      userAccessMap[userEmail] = [getFreshRecord()];
      next();
      return;
    }

    // If records are found, calculate num of requests made within the last min
    const windowStartTimestamp = dayJs()
      .subtract(WINDOW_SIZE_IN_MINS, "minutes")
      .unix();

    const requestRecordsWithinWindow = userRecords.filter(
      (entry: UserAccessRecord) => {
        return entry.timeStamp > windowStartTimestamp;
      }
    );

    // If no requests in past one min, create fresh record and allow user
    if (requestRecordsWithinWindow.length === 0) {
      userAccessMap[userEmail] = [getFreshRecord()];
      next();
      return;
    }

    // Aggregate the count of all the request records for user in the past min
    const requestsCountWithinWindow = requestRecordsWithinWindow.reduce(
      (acc: number, entry: UserAccessRecord) => {
        return acc + entry.count;
      },
      0
    );

    // If number of requests made is greater than or equal to limit, return error
    if (requestsCountWithinWindow >= MAX_REQUEST_COUNT_PER_WINDOW) {
      response.status(429).send("Rate limit exceeded");
    } else {
      const lastRequestRecord = userRecords[userRecords.length - 1];
      const currentLogWindowTimeStamp = dayJs()
        .subtract(RECORD_LOG_INTERVAL_IN_SECONDS, "seconds")
        .unix();

      // If previous request record within record log interval,
      // increment counter in existing record to reduce mem footprint
      if (lastRequestRecord.timeStamp > currentLogWindowTimeStamp) {
        lastRequestRecord.count += 1;
        userRecords[userRecords.length - 1] = lastRequestRecord;
      } else {
        userRecords.push(getFreshRecord());
      }
      userAccessMap[userEmail] = userRecords;
      next();
    }
  } catch (error) {
    next(error);
  }
};
