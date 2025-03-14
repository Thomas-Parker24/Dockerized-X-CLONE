import { createRequest, createResponse } from "node-mocks-http";
import { UserModel } from "../../Users/Models/UserModel.js";
import { describe, expect, jest, test } from "@jest/globals";
import {
  LogInWithEmailAndPassWord,
  LogInWithUserNameAndPassWord,
  logOut,
} from "../Controller/index.js";
import supertest from "supertest";
import { app } from "../../app.js";

jest.mock("../../Users/Models/UserModel.js");

describe("LogInController", () => {
  describe("LogIn With Email And Password", () => {
    describe("When everything is ok", () => {
      test("should return ok true", async () => {
        const mockedUser = {
          _id: 1234,
        };

        UserModel.findOneAndUpdate = jest.fn(() => ({
          exec: jest.fn().mockResolvedValue(mockedUser),
        }));

        const request = createRequest();
        const response = createResponse();
        await LogInWithEmailAndPassWord(request, response);

        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(jsonRequest.ok).toBe(true);
      });
    });
    describe("When body request is empty", () => {
      test("should return ok false", async () => {
        const response = await supertest(app)
          .post("/api/v1/Auth/Session/Email")
          .send({});

        expect(response.ok).toBe(false);
      });
    });
    describe("When email is missing in body request", () => {
      test("should return ok false and description", async () => {
        const response = await supertest(app)
          .post("/api/v1/Auth/Session/Email")
          .send({
            passWord: "1234",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When password is missing in body request.", () => {
      test("should return ok false and description", async () => {
        const response = await supertest(app)
          .post("/api/v1/Auth/Session/Email")
          .send({
            email: "ThomasParker24@correo.com",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When no user match found", () => {
      test("should return ok false and error description", async () => {
        UserModel.findOneAndUpdate = jest.fn(() => ({
          exec: jest.fn().mockResolvedValue(undefined),
        }));

        const request = createRequest();
        const response = createResponse();
        await LogInWithEmailAndPassWord(request, response);

        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
  });
  describe("LogIn With UserName And Password", () => {
    describe("When everything is ok", () => {
      test("should return ok true", async () => {
        const mockedUser = {
          _id: 1234,
        };

        UserModel.findOneAndUpdate = jest.fn(() => ({
          exec: jest.fn().mockResolvedValue(mockedUser),
        }));

        const request = createRequest();
        const response = createResponse();
        await LogInWithUserNameAndPassWord(request, response);

        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(jsonRequest.ok).toBe(true);
      });
    });
    describe("When body is empty", () => {
      test("should return ok false", async () => {
        const response = await supertest(app)
          .post("/api/v1/Auth/Session/UserName")
          .send({});

        expect(response.ok).toBe(false);
      });
    });
    describe("When UserName is missing in body request", () => {
      test("should return ok false and description", async () => {
        const response = await supertest(app)
          .post("/api/v1/Auth/Session/UserName")
          .send({
            passWord: "1234",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When password is missing in body request.", () => {
      test("should return ok false and description", async () => {
        const response = await supertest(app)
          .post("/api/v1/Auth/Session/UserName")
          .send({
            UserName: "ThomasParker24",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When no user match found", () => {
      test("should return ok false and error description", async () => {
        UserModel.findOneAndUpdate = jest.fn(() => ({
          exec: jest.fn().mockResolvedValue(undefined),
        }));

        const request = createRequest();
        const response = createResponse();
        await LogInWithUserNameAndPassWord(request, response);

        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
  });
  describe("LogOut", () => {
    describe("When everything is ok", () => {
      test("should return ok true", async () => {
        UserModel.updateOne = jest.fn(() => ({
          exec: jest.fn().mockResolvedValue({ matchedCount: 1 }),
        }));

        const request = createRequest();
        request.user = "1234";

        const response = createResponse();
        await logOut(request, response);

        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(200);
        expect(jsonRequest.ok).toBe(true);
      });
    });
    describe("When body request is empty", () => {
      test("should return ok false", async () => {
        const response = await supertest(app)
          .delete("/api/v1/Auth/Session/Email")
          .send({});

        expect(response.ok).toBe(false);
      });
    });
    describe("When email is missing in body request", () => {
      test("should return ok false and description", async () => {
        const response = await supertest(app)
          .delete("/api/v1/Auth/Session/Email")
          .send({
            passWord: "1234",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When password is missing in body request.", () => {
      test("should return ok false and description", async () => {
        const response = await supertest(app)
          .delete("/api/v1/Auth/Session/Email")
          .send({
            email: "ThomasParker24@correo.com",
          });

        expect(response.ok).toBe(false);
      });
    });
    describe("When no user match found", () => {
      test("should return ok false and error description", async () => {
        UserModel.updateOne = jest.fn(() => ({
          exec: jest.fn().mockResolvedValue({ matchedCount: 0 }),
        }));

        const request = createRequest();
        const response = createResponse();
        await logOut(request, response);

        const jsonRequest = response._getJSONData();
        expect(response.statusCode).toBe(500);
        expect(jsonRequest.ok).toBe(false);
      });
    });
  });
});
