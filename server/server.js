const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));
const port = 5000;

app.get("/api/call", (req, res) => {
  // do not return anything to create long running process
  //   res.status(200).send("app is working correctly");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
