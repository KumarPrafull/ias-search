"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Params = Promise<{ slug: string }>;

export default function EditProfilePage({ params }: { params: Params }) {
  // Await params (your requested pattern)
  const [slug, setSlug] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    father: "",
    father_occupation: "",
    rank: "",
    batch: "",
    service: "",
    optional_subject: "",
    total_marks: "",
    attempts_count: "",
    // Add more fields as required
  });
  const router = useRouter();

  useEffect(() => {
    async function getSlugAndData() {
      const { slug } = await params;
      setSlug(slug);

      // Fetch existing officer data
      const response = await fetch(`/api/items?id=${slug}`);
      const json = await response.json();
      const data = json.data?.[0] || {};

      setForm({
        name: data.name || "",
        father: data.father || "",
        father_occupation: data.father_occupation || "",
        rank: data.rank || "",
        batch: data.batch || "",
        service: data.service || "",
        optional_subject: data.optional_subject || "",
        total_marks: data.total_marks || "",
        attempts_count: data.attempts_count || "",
        // Add more fields as required
      });
    }
    getSlugAndData();
  }, [params]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slug) return;
    await fetch(`/api/items/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push(`/profile/${slug}`);
  }

  if (!slug) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Officer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            name="name"
            className="border p-2 w-full"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Father&apos;s Name</label>
          <input
            name="father"
            className="border p-2 w-full"
            value={form.father}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Father&apos;s Occupation</label>
          <input
            name="father_occupation"
            className="border p-2 w-full"
            value={form.father_occupation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Marks</label>
          <input
            name="total_marks"
            className="border p-2 w-full"
            value={form.total_marks}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Number of Attempts</label>
          <input
            name="attempts_count"
            className="border p-2 w-full"
            value={form.attempts_count}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Optional Subject</label>
          <input
            name="optional_subject"
            className="border p-2 w-full"
            value={form.optional_subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Batch</label>
          <input
            name="batch"
            className="border p-2 w-full"
            value={form.batch}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rank</label>
          <input
            name="rank"
            className="border p-2 w-full"
            value={form.rank}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Service</label>
          <input
            name="service"
            className="border p-2 w-full"
            value={form.service}
            onChange={handleChange}
          />
        </div>
        {/* Add more fields as necessary */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
