import Link from "next/link";

// --- Types and fields list reused from your create page for consistency ---

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

const fields: (keyof Officer)[] = [
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
];

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {data.name} {data.service?.toUpperCase() ?? ""}
        {data.batch ? ` (${data.batch} Batch)` : ""}
      </h1>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Display only non-empty fields, and skip _id and name in details */}
        {fields
          .filter((f) => f !== "name" && f !== "_id" && (data?.[f] && String(data[f]).trim() !== ""))
          .map((f) => (
            <div key={f}>
              <span className="font-semibold">
                {f.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}:
              </span>{" "}
              <span>
                {f === "article_url" && data[f] ? (
                  <a href={data[f] as string} className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                    Read story
                  </a>
                ) : (
                  data[f]
                )}
              </span>
            </div>
          ))}
      </div>
      <Link
        href={`/profile/${data._id}/edit`}
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Edit
      </Link>
    </div>
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
