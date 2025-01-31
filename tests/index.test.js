const { app, messages } = require("../index");
const request = require("supertest");
const he = require("he");

const testServer = app.listen(0);

afterAll(() => {
  testServer.close();
});

it("returns successful response when user navigates to root", async () => {
  await request(testServer).get("/").expect(200);
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
  await request(testServer).get("/new").expect(200);
});

it.each([
  ["Username", { username: "", message: "I am a ghost" }],
  ["Message", { username: "Laconica", message: "" }, "Message"],
  ["Username and Message", { username: "", message: "" }],
])(
  "returns a 400 Bad Request error if user does not send %s in '/new' POST request",
  async (errorMessage, data) => {
    await request(testServer)
      .post("/new")
      .type("form")
      .send(data)
      .expect(400)
      .expect(`400 Error - ${errorMessage} required`);
  },
);

it("redirects to Homepage after user adds new message", async () => {
  await request(testServer)
    .post("/new")
    .type("form")
    .send({ username: "Janet", message: "Hi everybody!" })
    .expect("Location", "/")
    .expect(302);
});

it("adds new message to the homepage", async () => {
  await request(testServer)
    .post("/new")
    .type("form")
    .send({ username: "Dot", message: "I'm cute!" });

  const response = await request(testServer).get("/");
  const decodedText = he.decode(response.text);
  expect(decodedText).toContain("<p>User: Janet</p>");
  expect(decodedText).toContain("<p>message: I'm cute!</p>");
});

// write test ensuring that failed messages don't get added to the messages array
