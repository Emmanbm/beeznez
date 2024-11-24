const express = require("express");
cors = require("cors");
const app = express();
const PORT = 3000;
const users = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
  { id: 3, name: "Bob", email: "bob@example.com" },
  { id: 4, name: "Mary", email: "mary@example.com" },
  { id: 5, name: "David", email: "david@example.com" },
];

app.use(express.json());
app.use(cors());
app.get("/api/", (req, res) => {
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
