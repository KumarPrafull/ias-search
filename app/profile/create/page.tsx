'use client';
import OfficersList from '@/app/components/OfficersList';
import { useState, useCallback, useEffect } from 'react';

export type Officer = {
  _id: string;
  name: string;
  description?: string;
  service?: string;
  batch?: string;
  rank?: string;
  article_url?: string;
  optional_subject?: string;
  optional_subject_marks?: string;
  interview_marks?: string;
  total_marks?: string;
  attempts?: string;
  father_name?: string;
  father_occupation?: string;
  mother_name?: string;
  mother_occupation?: string;
  hometown?: string;
  home_state?: string;
  cadre?: string;
  essay_marks?: string;
  gs_paper_1_marks?: string;
  gs_paper_2_marks?: string;
  gs_paper_3_marks?: string;
  gs_paper_4_marks?: string;
  optional_paper_1_marks?: string;
  optional_paper_2_marks?: string;
  tenth_marks?: string;
  tenth_school_name?: string;
  twelfth_marks?: string;
  twelfth_school_name?: string;
  twelfth_stream?: string;
  graduation_marks?: string;
  graduation_college_name?: string;
  graduation_degree?: string;
  post_graduation_marks?: string;
  post_graduation_college_name?: string;
  post_graduation_degree?: string;
  hobbies?: string;
  achievements?: string;
  struggles?: string;
  work_experience?: string;
};

const fields = [
  "name", "description", "service", "batch", "rank", "article_url",
  "optional_subject", "optional_subject_marks", "interview_marks", "total_marks", "attempts",
  "father_name", "father_occupation", "mother_name", "mother_occupation",
  "hometown", "home_state", "cadre", "essay_marks",
  "gs_paper_1_marks", "gs_paper_2_marks", "gs_paper_3_marks", "gs_paper_4_marks",
  "optional_paper_1_marks", "optional_paper_2_marks",
  "tenth_marks", "tenth_school_name", "twelfth_marks", "twelfth_school_name", "twelfth_stream",
  "graduation_marks", "graduation_college_name", "graduation_degree",
  "post_graduation_marks", "post_graduation_college_name", "post_graduation_degree",
  "hobbies", "achievements", "struggles", "work_experience"
] as const;

type FormType = Record<(typeof fields)[number], string>;

const EMPTY_FORM: FormType = Object.fromEntries(fields.map(f => [f, ""])) as FormType;

export default function CreateProfile() {
  const [items, setItems] = useState<Officer[]>([]);
  const [form, setForm] = useState<FormType>({ ...EMPTY_FORM });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = useCallback(async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data.data);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error creating profile");
      await fetchItems();
      setForm({ ...EMPTY_FORM });
    } catch (err) {
      console.error("Error creating profile:", err);
      setError("Failed to create profile. Please try again.");
    }
    setSubmitting(false);
  };

  const textareaFields: (keyof FormType)[] = [
    "description", "achievements", "struggles", "work_experience", "hobbies"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Form Card */}
        <div className="flex-1 w-full lg:w-1/2">
          <div className="bg-white rounded-3xl shadow-lg border border-blue-100 px-8 py-10">
            <h1 className="font-extrabold text-2xl mb-5 text-blue-800">
              Add IAS/IPS Officer
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {fields.map(field =>
                textareaFields.includes(field) ? (
                  <textarea
                    key={field}
                    className="border border-gray-300 p-2 rounded-xl mb-2 focus:outline-blue-400 transition"
                    name={field}
                    placeholder={field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    value={form[field]}
                    onChange={handleChange}
                    rows={3}
                  />
                ) : (
                  <input
                    key={field}
                    className="border border-gray-300 p-2 rounded-xl mb-2 focus:outline-blue-400 transition"
                    name={field}
                    placeholder={field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    value={form[field]}
                    onChange={handleChange}
                  />
                )
              )}
              <button
                disabled={submitting}
                className="bg-blue-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl mt-3 shadow transition"
                type="submit"
              >
                {submitting ? "Adding..." : "Add Officer"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>

        {/* Officers List Card */}
        <OfficersList items={items} showDescription={false} />
      </div>
    </div>
  );
}
