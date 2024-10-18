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
  if (req.query.Name !== undefined) {
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
        res
          .status(400)
          .json({ message: "Failed to create student", error: err });
      });
  } else {
    res.status(400).json({
      message: "No query parameters provided",
    });
  }
});
app.get("/api/getAllstudents", (req, res) => {
  // db.collection.find
  student
    .find()
    .then((d) => {
      res.status(200).json(d);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to get all students", error: err });
    });
});
app.delete("/api/studentdelete/:id", (req, res) => {
  console.log(req.params.id);
  if (req.params.id !== undefined) {
    student
      .deleteOne({ _id: Object(req.params.id) })
      .then((d) => {
        res.status(200).json({
          message: "Student deleted successfully",
          deletedStudent: d.deletedCount > 0 ? d.value : null,
        });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Failed to delete student", error: err.message });
      });
  } else {
    res.status(400).json({
      message: "No id provided",
    });
  }
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.json());
