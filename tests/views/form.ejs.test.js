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

it("has an input for the author's name", async () => {
  const response = await request(testServer).get("/new");
  expect(response.text).toContain('<label for="author_name">Username:</label>');
  expect(response.text).toContain(
    '<input type="text" id="author_name" name="username">',
  );
});
