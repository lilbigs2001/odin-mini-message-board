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

it("can access the request body for a new message", async () => {
  const response = await request(testServer)
    .post("/new")
    .type("form")
    .send({ username: "Jennifer", message: "I made it!" });
  expect(response.body.username).toBe("Jennifer");
  expect(response.body.message).toBe("I made it!");
});

it("returns a 400 Bad Request error if user does not send username in '/new' POST request", async () => {
  const response = await request(testServer)
    .post("/new")
    .type("form")
    .send({ username: "", message: "I am a ghost" });
  expect(response.status).toBe(400);
  expect(response.text).toBe("400 Error - Username required");
});

it("returns a 400 Bad Request error if user does not send message in '/new' POST request", async () => {
  const response = await request(testServer)
    .post("/new")
    .type("form")
    .send({ username: "Laconica", message: "" });
  expect(response.status).toBe(400);
  expect(response.text).toBe("400 Error - Message required");
});

it("returns a 400 Bad Request error if user does not send username and message in '/new' POST request", async () => {
  const response = await request(testServer)
    .post("/new")
    .type("form")
    .send({ username: "", message: "" });
  expect(response.status).toBe(400);
  expect(response.text).toBe("400 Error - Username and Message required");
});
