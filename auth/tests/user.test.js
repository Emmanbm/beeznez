const request = require("supertest");
const User = require("../models/User");
let server;

describe("user", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterAll(() => {
    server.close();
    User.collection.deleteMany();
  });

  describe("POST /register", () => {
    it("should not register a user because of incorrect format of email", async () => {
      const response = await request(server).post("/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "password123",
      });
      expect(response.status).not.toBe(201);
    });
    it("should not register a user because of incorrect format of password", async () => {
      const response = await request(server).post("/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "testATexample.com",
        password: "securePassword#123",
      });
      expect(response.status).not.toBe(201);
    });
    it("should register a user", async () => {
      const response = await request(server).post("/register").send({
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        password: "securePassword#123",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("user");
      expect(response.body?.user).toHaveProperty("email");
      expect(response.body?.user?.email).toBe("test@example.com");
    });
  });
  describe("POST /login", () => {
    it("should not allow to login because of incorrect credentials", async () => {
      const response = await request(server).post("/login").send({
        email: "test@example.com",
        password: "password123",
      });
      expect(response.status).toBe(401);
    });
    it("should allow to login", async () => {
      const response = await request(server).post("/login").send({
        email: "test@example.com",
        password: "securePassword#123",
      });
      expect(response.status).toBe(200);
    });
  });
  describe("GET /users", () => {
    it("should get users", async () => {
      const response = await request(server).get("/users").query({
        role: "admin",
      });
      expect(response.status).toBe(200);
      expect(
        response.body?.find((user) => user.email === "test@example.com")
          ?.firstName === "John"
      ).toBe(true);
    });
  });
});
