const request = require("supertest");
const { app } = require("../../index");

const testServer = app.listen(0);
let response;

beforeAll(async () => {
  response = await request(testServer).get("/");
});

afterAll(() => {
  testServer.close();
});

describe("head partial view", () => {
  it("has correct encoding", () => {
    expect(response.text).toContain('<meta charset="UTF-8" />');
  });

  it("has 'Homepage' title", () => {
    expect(response.text).toContain("<title>Homepage</title>");
  });
});

it("displays application title", () => {
  expect(response.text).toContain("<h1>Mini Message Board</h1>");
});

it("has a link tag to the New Message view", () => {
  expect(response.text).toContain('<a href="/new">Write a new message!</a>');
});
