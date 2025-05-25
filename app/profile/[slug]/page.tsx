import Link from "next/link";

type Officer = {
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

// const fields: (keyof Officer)[] = [
//   "name", "description", "service", "batch", "rank", "article_url",
//   "optional_subject", "optional_subject_marks", "interview_marks", "total_marks", "attempts",
//   "father_name", "father_occupation", "mother_name", "mother_occupation",
//   "hometown", "home_state", "cadre", "essay_marks",
//   "gs_paper_1_marks", "gs_paper_2_marks", "gs_paper_3_marks", "gs_paper_4_marks",
//   "optional_paper_1_marks", "optional_paper_2_marks",
//   "tenth_marks", "tenth_school_name", "twelfth_marks", "twelfth_school_name", "twelfth_stream",
//   "graduation_marks", "graduation_college_name", "graduation_degree",
//   "post_graduation_marks", "post_graduation_college_name", "post_graduation_degree",
//   "hobbies", "achievements", "struggles", "work_experience"
// ];

type Params = Promise<{ slug: string }>;

export default async function ProfilePage({ params }: { params: Params }) {
  const { slug } = await params;

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000";

  const apiUrl = `${base}/api/items?id=${slug}`;

  let data: Officer | null = null;
  try {
    const response = await fetch(apiUrl, { cache: "force-cache" });
    if (!response.ok) throw new Error("Failed to fetch officer data");
    const apiData = await response.json();
    data = apiData.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching officer data:", error);
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Officer Not Found</h1>
        <Link href="/profile/create" className="text-blue-500 underline">
          Add a new officer profile
        </Link>
      </div>
    );
  }

  // Section grouping for better UI
  const basicFields: (keyof Officer)[] = [
    "service", "batch", "rank", "optional_subject", "attempts"
  ];
  const parentFields: (keyof Officer)[] = [
    "father_name", "father_occupation", "mother_name", "mother_occupation"
  ];
  const marksFields: (keyof Officer)[] = [
    "optional_subject_marks", "interview_marks", "total_marks", "essay_marks",
    "gs_paper_1_marks", "gs_paper_2_marks", "gs_paper_3_marks", "gs_paper_4_marks",
    "optional_paper_1_marks", "optional_paper_2_marks",
    "tenth_marks", "tenth_school_name", "twelfth_marks", "twelfth_school_name", "twelfth_stream",
    "graduation_marks", "graduation_college_name", "graduation_degree",
    "post_graduation_marks", "post_graduation_college_name", "post_graduation_degree"
  ];
  const otherFields: (keyof Officer)[] = [
    "hometown", "home_state", "cadre", "hobbies", "achievements", "struggles", "work_experience"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow p-8 mb-8 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-6 border border-blue-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2">
            {data.name}
          </h1>
          <div className="text-xl font-semibold text-purple-700">
            {data.service?.toUpperCase()}
            {data.batch && (
              <span className="ml-2 text-blue-500">Batch {data.batch}</span>
            )}
            {data.rank && (
              <span className="ml-2 bg-blue-600 text-white rounded-lg px-3 py-1 text-base shadow font-bold">
                Rank #{data.rank}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            href={`/profile/${data._id}/edit`}
            className="bg-blue-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow transition"
          >
            Edit
          </Link>
          {data.article_url && (
            <a
              href={data.article_url}
              className="bg-white text-blue-700 font-semibold border border-blue-400 px-6 py-2 rounded-xl shadow hover:bg-blue-50 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Story
            </a>
          )}
        </div>
      </div>

      {/* About / Description */}
      {data.description && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-purple-800 mb-2">About</h2>
          <p className="text-gray-700 bg-gray-50 rounded-xl p-5 shadow">{data.description}</p>
        </div>
      )}

      {/* Basic Info */}
      <SectionCard title="Quick Details">
        <InfoGrid data={data} fields={basicFields} />
      </SectionCard>

      {/* Parents */}
      <SectionCard title="Parents">
        <InfoGrid data={data} fields={parentFields} />
      </SectionCard>

      {/* Marks */}
      <SectionCard title="Marks & Academics">
        <InfoGrid data={data} fields={marksFields} />
      </SectionCard>

      {/* Other Info */}
      <SectionCard title="Other Information">
        <InfoGrid data={data} fields={otherFields} />
      </SectionCard>
    </div>
  );
}

// Helper: InfoGrid
function InfoGrid({ data, fields }: { data: Officer; fields: (keyof Officer)[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields
        .filter(f => data[f] && String(data[f]).trim() !== "")
        .map(f => (
          <div key={f} className="flex flex-col">
            <span className="font-semibold text-gray-600">
              {f.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-gray-800">{data[f]}</span>
          </div>
        ))}
    </div>
  );
}

// Helper: SectionCard
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-blue-700 mb-2">{title}</h2>
      <div className="bg-white rounded-xl p-5 shadow border border-blue-100">{children}</div>
    </section>
  );
}

// SSG for all slugs
export async function generateStaticParams() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000";

  const apiUrl = `${base}/api/items`;

  const response = await fetch(apiUrl, { cache: "force-cache" });
  const { data } = await response.json();

  return data.map((item: { _id: string }) => ({
    slug: item._id,
  }));
}
