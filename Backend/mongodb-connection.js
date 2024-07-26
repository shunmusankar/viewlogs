const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Successfully connected to MongoDB");

    const database = client.db("test");
    const successLogsCollection = database.collection("Success Logs");
    const errorLogsCollection = database.collection("Error Logs");

    app.get('/successlogs', async (req, res) => {
      try {
        const logs = await successLogsCollection.find().toArray();
        const result = logs.map(log => ({
          message: JSON.stringify(log, null, 2),
        }));
        res.json(result);
      } catch (error) {
        console.error("Error fetching success logs:", error);
        res.status(500).send("Error fetching success logs");
      }
    });

    app.get('/errorlogs', async (req, res) => {
      try {
        const logs = await errorLogsCollection.find().toArray();
        const result = logs.map(log => ({
          message: JSON.stringify(log, null, 2),
        }));
        res.json(result);
      } catch (error) {
        console.error("Error fetching error logs:", error);
        res.status(500).send("Error fetching error logs");
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }
}

main().catch(console.error);
