'use client';
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
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 m-10'>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="service"
          placeholder="Service"
          value={form.service}
          onChange={handleChange}
        />
        <input
          name="batch"
          placeholder="Batch Year"
          value={form.batch}
          onChange={handleChange}
        />
        <input
          name="rank"
          placeholder="Rank"
          value={form.rank}
          onChange={handleChange}
        />
        <input
          name="article_url"
          placeholder="Article URL"
          value={form.article_url}
          onChange={handleChange}
        />

        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item: {name: string, _id: string, description: string, rank: string, service: string, batch: string}) => (
          <li key={item._id}>
            {item.name} - {item.description}
            <br />
            Service: {item.service} | Batch: {item.batch} | Rank: {item.rank}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}