const request = require("supertest");
const server = require("../server");
const db = require("../../data/db-config");

beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert([
    { username: "ahmet", email: "ahmet@gmail.com" },
    { username: "ayse", email: "ayse@gmail.com" },
  ]);
});

describe("Users API", () => {
  describe("GET /users", () => {
    test("[1] Statü kodu 200 dönüyor", async () => {
      const res = await request(server).get("/users");
      expect(res.status).toEqual(200);
    });
    test("[2] Dizi olarak dönüyor", async () => {
      const res = await request(server).get("/users");
      expect(res.body).toBeInstanceOf(Array);
    });
  });
  describe("GET /users/:id", () => {
    test("[3] Geçerli ID ile 200 dönüyor", async () => {
      const res = await request(server).get("/users/2");
      expect(res.status).toEqual(200);
    });
    test("[4] Geçersiz ID ile 404 dönüyor", async () => {
      const res = await request(server).get("/users/99");
      expect(res.status).toEqual(404);
    });
  });
  describe("POST /users", () => {
    test("[5] Body geçerliyken 201 dönüyor", async () => {
      const body = { username: "mert", email: "mertkaya.codes@gmail.com" };
      const res = await request(server).post("/users").send(body);
      expect(res.status).toEqual(201);
    });
    test("[6] Body yokken 400 dönüyor", async () => {
      const res = await request(server).post("/users");
      expect(res.status).toEqual(400);
    });
    test("[7] Body varken fakat geçersizken 400 dönüyor", async () => {
      const body = { name: "MertK", gmail: "asdasd@gmail.com" };
      const res = await request(server).post("/users").send(body);
      expect(res.status).toEqual(400);
    });
  });
});
