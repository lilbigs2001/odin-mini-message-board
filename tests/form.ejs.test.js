const { app } = require("../index");
const request = require("supertest");

const testServer = app.listen(0);

afterAll(() => {
  testServer.close();
});

it("contains DOCTYPE designation", async () => {
  const response = await request(testServer).get("/new");
  expect(response.text).toContain("<!DOCTYPE html>");
});
