const { app } = require("../../index");
const request = require("supertest");

const testServer = app.listen(0);

afterAll(() => {
  testServer.close();
});

it("contains DOCTYPE designation", async () => {
  const response = await request(testServer).get("/new");
  expect(response.text).toContain("<!DOCTYPE html>");
});

it("has 'New Message' title", async () => {
  const response = await request(testServer).get("/new");
  expect(response.text).toContain("<title>New Message</title>");
});

it("has a 'New Message' heading", async () => {
  const response = await request(testServer).get("/new");
  expect(response.text).toContain("<h1>New Message</h1>");
});
