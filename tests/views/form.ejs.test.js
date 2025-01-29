const { app } = require("../../index");
const request = require("supertest");

const testServer = app.listen(0);
let response;

beforeAll(async () => {
  response = await request(testServer).get("/new");
});

afterAll(() => {
  testServer.close();
});

it("contains DOCTYPE designation", () => {
  expect(response.text).toContain("<!DOCTYPE html>");
});

it("has 'New Message' title", () => {
  expect(response.text).toContain("<title>New Message</title>");
});

it("has a 'New Message' heading", () => {
  expect(response.text).toContain("<h1>New Message</h1>");
});

it("has a form with correct method and action", () => {
  expect(response.text).toMatch(
    /<form\s+(?=.*method=["']?POST["']?)(?=.*action=["']?\/new["']?).*/i,
  );
  expect(response.text).toContain("</form>");
});

it("has a required input for the author's name", () => {
  expect(response.text).toContain('<label for="author_name">Username:</label>');
  expect(response.text).toMatch(
    /<input\s+(?=.*type=["']text["'])(?=.*id=["']author_name["'])(?=.*name=["']username["'])(?=.*required)[^>]*>/,
  );
});

it("has a required input for the user message", () => {
  expect(response.text).toContain('<label for="message">Message:</label>');
  expect(response.text).toMatch(
    /<textarea\s+(?=.*id=["']message["'])(?=.*name=["']message["'])(?=.*required)[^>]*>/,
  );
});

it("has a submit button", () => {
  expect(response.text).toContain('<button type="submit">Submit</button>');
});
