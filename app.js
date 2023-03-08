const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
app.use(express.json());

const dbFile = path.join(__dirname, "todoApplication.db");

let db = null;

const intializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbFile,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server is running at http://localhost:3001/");
    });
  } catch (e) {
    console.log(`DB Error is ${e.message}`);
    process.exit(1);
  }
};

intializeDbAndServer();

// Get Method
app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  const getQueryDetails = `
    SELECT 
        * 
    FROM 
        todo
    WHERE 
        status LIKE ${status}
  `;
  const dbResponse = await db.all(getQueryDetails);
  response.send(dbResponse);
});
