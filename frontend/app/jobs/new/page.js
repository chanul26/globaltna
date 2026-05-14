"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../../lib/api';

export default function NewJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Plumbing', location: '', contactName: '', contactEmail: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/jobs', formData);
      router.push('/'); // Redirect to home on success
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">New Service Request</h1>
          <Link href="/" className="text-gray-500 hover:text-gray-700">Cancel</Link>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input required type="text" className="w-full border border-gray-300 rounded-md p-2"
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea required rows="4" className="w-full border border-gray-300 rounded-md p-2"
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full border border-gray-300 rounded-md p-2"
                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Joinery">Joinery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2"
                value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2"
                value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-md p-2"
                value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-6">
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </main>
  );
}