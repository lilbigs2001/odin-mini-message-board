const { app, messages } = require("../index");
const request = require("supertest");

const testServer = app.listen(0);

afterAll(() => {
  testServer.close();
});

it("returns successful response when user navigates to root", async () => {
  const response = await request(testServer).get("/");
  expect(response.status).toBe(200);
});

it("displays messages on home page", async () => {
  const response = await request(testServer).get("/");
  messages.forEach((message) => {
    expect(response.text).toContain(`<p>User: ${message.user}</p>`);
    expect(response.text).toContain(`<p>message: ${message.text}</p>`);
    expect(response.text).toContain(`<p>date: ${message.added}</p>`);
  });
  expect(response.text).toContain("<hr>");
});

it("returns successful response when user navigates to '/new'", async () => {
  const response = await request(testServer).get("/new");
  expect(response.status).toBe(200);
});

it("returns successful response when user sends POST request to '/new'", async () => {
  const response = await request(testServer).post("/new");
  expect(response.status).toBe(200);
});
