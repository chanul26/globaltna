require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./src/models/JobRequest');

const sampleJobs = [
  {
    title: "Leaking kitchen tap",
    description: "The tap in the kitchen is constantly dripping. Need it fixed or replaced.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "John Smith",
    contactEmail: "john@example.com",
    status: "Open"
  },
  {
    title: "Rewire living room lights",
    description: "Installing new spotlights in the ceiling, need an electrician.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "Sarah Connor",
    contactEmail: "sarah@example.com",
    status: "In Progress"
  },
  {
    title: "Paint exterior fences",
    description: "Need the back garden fences painted before winter.",
    category: "Painting",
    location: "London",
    contactName: "David Brent",
    contactEmail: "david@example.com",
    status: "Closed"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');
    
    await JobRequest.deleteMany(); // Clear existing
    console.log('Old jobs cleared.');
    
    await JobRequest.insertMany(sampleJobs);
    console.log('Sample jobs inserted successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();