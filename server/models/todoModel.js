const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A todo must have a title'],
      trim: true
    },

    date: {
      type: Date,
      required: [true, 'A todo must have a date']
    },

    description: {
      type: String,
      trim: true
    },

    completed: {
      type: Boolean,
      default: false
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy, medium or difficult'
      },
      required: [true, 'A todo must have a title']
    }
  },
  {
    timestamps: true
  }

);

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;