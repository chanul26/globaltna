const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  category: { type: String, enum: ['Plumbing', 'Electrical', 'Painting', 'Joinery'] },
  location: { type: String },
  contactName: { type: String },
  contactEmail: { type: String, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobRequest', jobRequestSchema);        