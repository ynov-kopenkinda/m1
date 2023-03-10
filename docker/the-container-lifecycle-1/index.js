const { execSync } = require("child_process");
const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const closeOnExit = (signale) => () => {
  console.log(`[${signale}] Hurry, I'm closing!`);
  execSync("sleep 5");
  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
};

process.on("SIGTERM", closeOnExit("SIGTERM"));
process.on("SIGINT", closeOnExit("SIGINT"));
