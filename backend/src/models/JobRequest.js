const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    minlength: [4, 'Title must be at least 4 characters long']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long']
  },
  category: { type: String, enum: ['Plumbing', 'Electrical', 'Painting', 'Joinery'], required: true },
  location: { type: String },
  contactName: { type: String },
  contactEmail: { type: String, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobRequest', jobRequestSchema);        