"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const emptyForm = {
  name: '',
  description: '',
  service: '',
  batch: '',
  rank: '',
  article_url: '',
  optional_subject: '',
  optional_subject_marks: '',
  interview_marks: '',
  total_marks: '',
  attempts: '',
  father_name: '',
  father_occupation: '',
  mother_name: '',
  mother_occupation: '',
  hometown: '',
  home_state: '',
  cadre: '',
  essay_marks: '',
  gs_paper_1_marks: '',
  gs_paper_2_marks: '',
  gs_paper_3_marks: '',
  gs_paper_4_marks: '',
  optional_paper_1_marks: '',
  optional_paper_2_marks: '',
  tenth_marks: '',
  tenth_school_name: '',
  twelfth_marks: '',
  twelfth_school_name: '',
  twelfth_stream: '',
  graduation_marks: '',
  graduation_college_name: '',
  graduation_degree: '',
  post_graduation_marks: '',
  post_graduation_college_name: '',
  post_graduation_degree: '',
  hobbies: '',
  achievements: '',
  struggles: '',
  work_experience: ''
};

type ProfileForm = typeof emptyForm;
type Params = Promise<{ slug: string }>;

const textareaFields: (keyof ProfileForm)[] = [
  "description", "achievements", "struggles", "work_experience", "hobbies"
];

export default function EditProfilePage({ params }: { params: Params }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>({ ...emptyForm });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const { slug } = await params;
      setSlug(slug);
      const res = await fetch(`/api/items?id=${slug}`);
      const json = await res.json();
      const data = json.data?.[0] || {};
      setForm({
        ...emptyForm,
        ...data
      });
      setLoading(false);
    }
    fetchProfile();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;
    await fetch(`/api/items/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    router.push(`/profile/${slug}`);
  };

  if (loading || !slug) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="text-lg text-blue-600 font-semibold animate-pulse">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <div className='bg-white rounded-3xl shadow-lg border border-blue-100 px-8 py-10'>
          <h1 className='font-extrabold text-2xl mb-6 text-blue-800'>Edit IAS/IPS Officer</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            {Object.entries(emptyForm).map(([key]) =>
              textareaFields.includes(key as keyof ProfileForm) ? (
                <textarea
                  key={key}
                  className="border border-gray-300 p-2 rounded-xl mb-2 focus:outline-blue-400 transition"
                  name={key}
                  placeholder={key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  value={form[key as keyof ProfileForm] ?? ""}
                  onChange={handleChange}
                  rows={3}
                />
              ) : (
                <input
                  key={key}
                  className="border border-gray-300 p-2 rounded-xl mb-2 focus:outline-blue-400 transition"
                  name={key}
                  placeholder={key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  value={form[key as keyof ProfileForm] ?? ""}
                  onChange={handleChange}
                />
              )
            )}
            <button
              className="bg-blue-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl mt-3 shadow transition"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
