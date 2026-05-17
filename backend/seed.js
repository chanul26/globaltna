require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./src/models/JobRequest');

const sampleJobs = [
  {
    title: "Leaking kitchen tap",
    description: "The tap in the kitchen is constantly dripping. Need it fixed or replaced urgently.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "John Smith",
    contactEmail: "john@example.com",
    status: "Open"
  },
  {
    title: "Rewire living room lights",
    description: "Installing new spotlights in the ceiling, need a qualified electrician.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "Sarah Connor",
    contactEmail: "sarah@example.com",
    status: "In Progress"
  },
  {
    title: "Paint exterior fences",
    description: "Need the back garden fences painted before winter arrives.",
    category: "Painting",
    location: "London",
    contactName: "David Brent",
    contactEmail: "david@example.com",
    status: "Closed"
  },
  {
    title: "Fit new kitchen cabinets",
    description: "Looking for a joiner to install 6 new kitchen cabinets and a worktop.",
    category: "Joinery",
    location: "Manchester",
    contactName: "Emma Wilson",
    contactEmail: "emma@example.com",
    status: "Open"
  },
  {
    title: "Bathroom pipe replacement",
    description: "Old pipes under the sink are corroded and need full replacement.",
    category: "Plumbing",
    location: "Birmingham",
    contactName: "Liam Brown",
    contactEmail: "liam@example.com",
    status: "Open"
  },
  {
    title: "Install outdoor security lighting",
    description: "Need 4 motion-sensor security lights fitted around the property exterior.",
    category: "Electrical",
    location: "Leeds",
    contactName: "Priya Patel",
    contactEmail: "priya@example.com",
    status: "In Progress"
  },
  {
    title: "Repaint entire living room",
    description: "Full repaint of walls and ceiling in living room, approximately 20 square metres.",
    category: "Painting",
    location: "Bristol",
    contactName: "Tom Harris",
    contactEmail: "tom@example.com",
    status: "Open"
  },
  {
    title: "Build garden decking",
    description: "Need a joiner to design and build a 4x3 metre wooden decking area in the back garden.",
    category: "Joinery",
    location: "Glasgow",
    contactName: "Claire McDonald",
    contactEmail: "claire@example.com",
    status: "Open"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    await JobRequest.deleteMany();
    console.log('Old jobs cleared.');

    await JobRequest.insertMany(sampleJobs);
    console.log(`${sampleJobs.length} sample jobs inserted successfully!`);

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();