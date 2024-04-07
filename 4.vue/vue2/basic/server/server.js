const express = require("express");
const history = require("connect-history-api-fallback");

const app = express();

app.use(history());
app.use(express.static(__dirname + "/static"));

app.get("/person", (req, res) => {
  res.send({
    name: "sever",
    age: 18,
  });
});

app.listen(5000, (err) => {
  if (!err) console.log("服务器启动成功！");
});
