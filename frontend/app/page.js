"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../lib/api';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    // Defining the function inside useEffect fixes the ESLint dependency warning
    const fetchJobs = async () => {
      setLoading(true);
      setFetchError('');
      try {
        const endpoint = category ? `/api/jobs?category=${category}` : '/api/jobs';
        const response = await api.get(endpoint);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setFetchError('Failed to connect to the server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Requests</h1>
          <Link 
            href="/jobs/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + New Request
          </Link>
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <label className="text-gray-700 font-medium">Filter by Category:</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2 bg-white"
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500 font-medium">Loading jobs...</p>
        ) : fetchError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {fetchError}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500 font-medium">No job requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <span className="text-sm text-gray-500">{job.category}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{job.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{job.location}</span>
                  <Link 
                    href={`/jobs/${job._id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}