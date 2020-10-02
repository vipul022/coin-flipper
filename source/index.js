// ExpressJS `Hello ${username}!` app
// Build an ExpressJS server that does these things:

// when the "/greeter" route of the server is visited, return "Hello world!" to the client

// when a "/greeter/someNameHere" route is visited, return "Hello someNameHere!" to the client

// You may want to look into these topics for hints & how-to:

// JS string interpolation

// ExpressJS route parameters

// NOTE: Do this challenge locally on your own computer!

// You may want to read the docs on route parameters for this one, too: https://expressjs.com/en/guide/routing.html#route-parameters

// Build an ExpressJS server that does these things:

// when the "/coinflip" route of the server is visited, return "heads" or "tails" to the client (randomly pick one to send)

// when a "/coinflip/someNumberHere" route is visited, return an object to the client that shows the number of times heads and tails were called after flipping the coin the specified amount of times. For example, calling "/100" should call the coin-flip functionality 100 times, and populate an object with the count of how many heads & tails were returned from that function across its 100 calls.

// You may want to look into these topics for hints & how-to:

// JS objects

// JS loops

// JS functions

// ExpressJS route parameters

// ExpressJS returning JSON

// NOTE: Do this challenge locally on your own computer!

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get(`/greeter`, (req, res) => {
  try {
    if (req.method !== "GET") {
      console.log("hello");
      // res.send("hello");
      throw new Error("Invalid Route!");
    }
    // console.log("inside get req");
    // console.log("req=> ", req.method);
    // console.log("req.params =>", req.params);

    const { name } = req.params;

    console.log("name=> ", name);

    res.json({
      message: `Hello ${name}`,
    });
  } catch (err) {
    // console.log("hiiii");
    res.json({
      error: err.message,
    });
  }
});

let coin = ["heads", "tails"];
app.get("/coinflip", (req, res) => {
  // let { num } = req.params;
  // for (let i = 0; i <= num; i++) {
  const headTail = coin[Math.floor(Math.random() * coin.length)];
  res.send(`${headTail}`);
  // }
});

let headOrTails = (req, res, next) => {
  // let coin = ["heads", "tails"];
  let { num } = req.params;
  // console.log(num);
  let head = 0;
  let tail = 0;
  for (let i = 0; i < num; i++) {
    const headTail = coin[Math.floor(Math.random() * coin.length)];
    headTail === "heads" ? (head += 1) : (tail += 1);
  }

  req.result = { head: `${head}`, tail: `${tail}` };
  next();
};

app.get("/coinflip/:num", headOrTails, (req, res) => {
  res.send(req.result);
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

module.exports = {
  app,
  server,
};
