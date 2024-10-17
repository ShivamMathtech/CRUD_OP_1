const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
// Middleware for handling CORS requests
// Let's create a some routes
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017")
  .then((d) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
let studentSchema = {
  StudentId: Number,
  Name: String,
  Roll: Number,
};
const student = mongoose.model("Student", studentSchema);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});
app.get("/api/student/create", (req, res) => {
  const newStudent = new student({
    StudentId: req.query.StudentId,
    Name: req.query.Name,
    Roll: req.query.Roll,
  });
  newStudent
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      res.status(400).json({ message: "Failed to create student", error: err });
    });
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.json());
