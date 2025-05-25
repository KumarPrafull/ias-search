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

export default function EditProfilePage({ params }: { params: Params }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>({ ...emptyForm });
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
    }
    fetchProfile();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  if (!slug) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 p-6">
      <div className='flex-1 w-full lg:w-1/3 bg-gray-100 p-4 rounded shadow'>
        <h1 className='font-black text-2xl'>Edit IAS/IPS Officer</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 m-10'>
          {Object.entries(emptyForm).map(([key]) => (
            <input
              key={key}
              className="border border-gray-300 p-2 rounded mb-4"
              name={key}
              placeholder={key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
              value={form[key as keyof ProfileForm] ?? ""}
              onChange={handleChange}
            />
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
