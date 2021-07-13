import app from "../../server";
import supertest from "supertest";
import jwt from "jsonwebtoken";

describe("Testing auth routes", () => {
  const request = supertest(app);

  test("should get 400 for no email in req", (done) => {
    request
      .post("/login")
      .send({
        email: null,
      })
      .set("Accept", "application/json")
      .expect(400)
      .end((err, res) => {
        expect(res.body).toEqual({
          error: "No or Invalid email address in request",
        });
        done();
      });
  });

  test("should get access token for valid req", (done) => {
    request
      .post("/login")
      .send({
        email: "a@b.co",
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        const { accessToken } = res.body;
        expect(accessToken).toBeTruthy();
        const jwtContent = jwt.verify(
          accessToken,
          String(process.env.JWT_SECRET)
        ) as jwt.JwtPayload;
        expect(jwtContent.email).toEqual("a@b.co");
        done();
      });
  });
});
