const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/student_tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
  courseId: String,
  taskName: String,
  dueDate: Date,
  additionalDetails: String
});

const Task = mongoose.model('Task', taskSchema);

// Route to retrieve tasks for a specific course
app.get('/courses/:courseId/tasks', (req, res) => {
  const courseId = req.params.courseId;
  Task.find({ courseId })
    .then(tasks => {
      if (!tasks || tasks.length === 0) {
        res.status(404).json({ message: 'No tasks found for the specified course ID.' });
      } else {
        res.json(tasks);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error.' });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
