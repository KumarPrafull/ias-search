'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CreateProfile() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', service: '', batch: '', rank: '', article_url: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data.data);
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      fetchItems();
      setForm({ name: '', description: '', service: '', batch: '', rank: '', article_url: '' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className='font-black'>Add Successful UPSC Candidates</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 m-10'>
        <input
          className="border border-gray-300 p-2 rounded mb-4"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 p-2 rounded mb-4"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 p-2 rounded mb-4"
          name="service"
          placeholder="Service"
          value={form.service}
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 p-2 rounded mb-4"
          name="batch"
          placeholder="Batch Year"
          value={form.batch}
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 p-2 rounded mb-4"
          name="rank"
          placeholder="Rank"
          value={form.rank}
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 p-2 rounded mb-4"
          name="article_url"
          placeholder="Article URL"
          value={form.article_url}
          onChange={handleChange}
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item: { name: string, _id: string, description: string, rank: string, service: string, batch: string }) => (
          <li className='py-2' key={item._id}>
            <Link href={`/profile/${item._id}`} className='text-blue-500 hover:underline'>
            <span className='font-semibold'>{item.name}</span> 
            - {item.service.toUpperCase()} | 
            Batch: {item.batch} | 
            Rank: {item.rank} |
            {item.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}