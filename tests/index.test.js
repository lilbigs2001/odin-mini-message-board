const app = require("../index");
const request = require("supertest");

const testServer = app.listen(0);

afterAll(() => {
  testServer.close();
});

it("Returns a response when the user navigates to root", async () => {
  const response = await request(testServer).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello, World!");
});
