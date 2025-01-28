const request = require("supertest");
const { app } = require("../../index");

const testServer = app.listen(0);

afterAll(() => {
  testServer.close();
});

describe("head partial view", () => {
  it("has correct encoding", async () => {
    const response = await request(testServer).get("/");
    expect(response.text).toContain('<meta charset="UTF-8" />');
  });

  it("has 'Homepage' title", async () => {
    const response = await request(testServer).get("/");
    expect(response.text).toContain("<title>Homepage</title>");
  });
});

it("displays application title", async () => {
  const response = await request(testServer).get("/");
  expect(response.text).toContain("<h1>Mini Message Board</h1>");
});
