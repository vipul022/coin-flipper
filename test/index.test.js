let { app, server } = require("../source/index");
const request = require("supertest"); //require supertest
// jest.setTimeout(30000);
afterAll(async (done) => {
  // Force our server reference to close:
  await server.close();

  // Dumb hack to trick Jest into waiting a bit more before
  // it freaks out over processes hanging open.
  // Potentially because server.close() does not complete instantly? Not sure.
  // This has been an issue for ExpressJS & Jest devs
  // for several years & solutions are vague.
  await new Promise((resolve) => setTimeout(() => resolve(), 500));

  // Resolve the done() callback? Again not sure, as solutions are vague.
  done();
});

describe("Express user home page functionality", () => {
  test("should return status 200", async (done) => {
    const res = await request(app).get("/greeter/:name");
    expect(res.statusCode).toEqual(200);
    done(); //done() is a jest function which is required
  });

  test("Should return the right string based on route params", async (done) => {
    const res = await request(app).get("/greeter/vipul");

    expect(res.body.message).toEqual("Hello vipul");
    done();
  });
});
