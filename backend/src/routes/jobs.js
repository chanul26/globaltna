const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// GET /api/jobs - List all jobs (with optional filters)
router.get('/', async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    
    // Apply filters if they exist in the query string
    if (category) filter.category = category;
    if (status) filter.status = status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
});

// GET /api/jobs/:id - Fetch single job
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ error: 'Job not found' });
    next(error);
  }
});

// POST /api/jobs - Create a new job
router.post('/', async (req, res, next) => {
  try {
    const newJob = await JobRequest.create(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    // Catch Mongoose validation errors and return a clean 400 Bad Request
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    next(error);
  }
});

// PATCH /api/jobs/:id - Update status ONLY
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    
    // Strict validation enforcing the brief's rules
    if (!['Open', 'In Progress', 'Closed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedJob = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status }, // Security: explicitly only passing status, ignoring other payload fields
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ error: 'Job not found' });
    next(error);
  }
});

// DELETE /api/jobs/:id - Delete a job
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedJob = await JobRequest.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') return res.status(404).json({ error: 'Job not found' });
    next(error);
  }
});

module.exports = router;