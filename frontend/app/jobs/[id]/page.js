"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import api from '../../../lib/api';

export default function JobDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
        router.push('/'); // If not found, go home
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchJob();
  }, [id, router]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await api.patch(`/api/jobs/${id}`, { status: newStatus });
      setJob(res.data);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      await api.delete(`/api/jobs/${id}`);
      router.push('/');
    } catch (err) {
      alert('Failed to delete job');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  if (!job) return null;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-start mb-6 border-b pb-6">
          <div>
            <Link href="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">← Back to Dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{job.title}</h1>
            <p className="text-gray-500 mt-1">{job.location} • {job.category}</p>
          </div>
          
          <div className="text-right">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Status</label>
            <select 
              value={job.status} 
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border border-gray-300 rounded-md p-2 bg-gray-50 font-medium"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-100 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">Contact Name</p>
            <p className="text-gray-900">{job.contactName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Contact Email</p>
            <p className="text-gray-900">{job.contactEmail || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Created On</p>
            <p className="text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="border-t pt-6 flex justify-end">
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 font-medium px-4 py-2 border border-red-200 rounded-md hover:bg-red-50 transition"
          >
            Delete Request
          </button> 
        </div>
      </div>
    </main>
  );
}