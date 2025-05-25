type Params = Promise<{ slug: string }>;

export default async function ProfilePage({ params }: { params: Params }) {
    const { slug } = await params;;
    console.log("ProfilePage slug:", slug);

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    'http://localhost:3000';

  // Construct absolute URL for SSR fetch (at build time)
  const apiUrl = `${base}/api/items?id=${slug}`;

  let data = null;
  try {
    const response = await fetch(apiUrl, { cache: 'force-cache' }); // Use 'force-cache' for SSG
    if (!response.ok) throw new Error("Failed to fetch officer data");
    const apiData = await response.json();
    data = apiData.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching officer data:", error);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>{data?.service}</div>
      <h1 className="text-3xl font-bold mb-4">
        {data?.name} ({data?.service})
      </h1>
      <p className="mb-4">{data?.introduction}</p>
      <div className="mb-2">Father&apos;s Name: {data?.father}</div>
      <div className="mb-2">Father&apos;s Occupation: {data?.father_occupation}</div>
      <div className="mb-2">Mother&apos;s Name: {data?.mother}</div>
      <div className="mb-2">Mother&apos;s Occupation: {data?.mother_occupation}</div>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Optional Subjects of {data?.name}:
      </h2>
      {/* <ul className="list-disc list-inside mb-4">
        {data?.optional_subjects?.map((subject: string, i: number) => (
          <li key={i}>{subject}</li>
        ))}
      </ul> */}
      <div>Number of attempts: {data?.attempts}</div>
      <div>Rank: {data?.rank} ({data?.year})</div>
    </div>
  );
}

// /app/profile/[slug]/page.tsx

export async function generateStaticParams() {
  // Fetch all possible slugs from your API, DB, or a list
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    'http://localhost:3000';

  const apiUrl = `${base}/api/items`; // Fetch all items

  const response = await fetch(apiUrl, { cache: 'force-cache' });
  const { data } = await response.json();

  // Suppose each item has an `_id` you want to use as the slug
  return data.map((item: {_id: string}) => ({
    slug: item._id,
  }));
}
