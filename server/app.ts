import * as express from "express";
import * as mysql from "mysql";
const app = express();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "world"
});

connection.connect();

const queryPV = async sql => {
  try {
    const rows = await connection.query(sql);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

app.get("/sql", (req, res) => {
  // const rows = queryPV("SELECT * FROM country LIMIT 10;");
  connection.query("SELECT * FROM country LIMIT 10;", (err, rows) => {
    if (err) console.log(err);
    console.log(rows);
    res.send("hello");
  });
  console.log("成功");
});

app.get("/", (req, res) => res.send("hello"));

app.listen(3000, () => console.log("working at 3000"));
