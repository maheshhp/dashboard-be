import dayJs from "dayjs";
import { NextFunction, Request, Response } from "express";
import { MAX_REQUEST_COUNT_PER_WINDOW, WINDOW_SIZE_IN_MINS } from "./constants";
import { User } from "./rateLimiter.types";

const userAccessMap: Record<string, Array<number>> = {};

export const rateLimiter = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  try {
    const userEmail = (request.user as User)?.email;
    const userRecords = userAccessMap[userEmail];
    const currentTimeStamp = dayJs().unix();

    if (!userEmail) {
      response.status(400).send("Invalid request");
      return;
    }

    // If no existing req records found for user,
    // create a fresh entry and allow user to access APIs
    if (!userRecords || userRecords.length < 1) {
      userAccessMap[userEmail] = [currentTimeStamp];
      next();
      return;
    }

    // If records are found, calculate num of requests made within the last min
    const firstRecordTimestamp = userRecords[0];
    const windowStartTimestamp = dayJs()
      .subtract(WINDOW_SIZE_IN_MINS, "minutes")
      .unix();

    // First request in window is within last min
    if (firstRecordTimestamp > windowStartTimestamp) {
      // Rate limit reached
      if (userRecords.length === MAX_REQUEST_COUNT_PER_WINDOW) {
        response.status(429).send("Rate limit exceeded");
        return;
      }
      userRecords.push(currentTimeStamp);
    } else {
      // First record in window older than 1 min, shift array if limit reached
      // Add record and allow user
      if (userRecords.length === MAX_REQUEST_COUNT_PER_WINDOW) {
        userRecords.shift();
      }
      userRecords.push(currentTimeStamp);
    }
    userAccessMap[userEmail] = userRecords;
    next();
  } catch (error) {
    next(error);
  }
};
