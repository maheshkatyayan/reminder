import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";

const app = express();
const port = 5000;

app.use(express.static("public"));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbConfig = {
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Mahesh@1802",
  port: 4000, // Corrected port number for PostgreSQL
};

const db = new pg.Client(dbConfig);
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to database:", err));

// Get all tasks
app.get("/gettask", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM task");
   // console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Error getting tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a task
app.post("/addtask", async (req, res) => {
  const receivedData1 = req.body.data;
  console.log( receivedData1);
  try {
    const result = await db.query("INSERT INTO task(task,dat) VALUES ($1,$2)",[ receivedData1.task,receivedData1.date]);
    res.status(200).send('Data received successfully1');
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
});

// Delete a task
app.delete("/deletetask/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  try {
    const result = await db.query('DELETE FROM task WHERE id = $1', [id]);
    res.status(200).send('Task deleted successfully');
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
