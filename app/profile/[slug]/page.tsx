type Params = Promise<{ slug: string[] }>

export default async function Home({params} : {params : Params}) {
    const { slug } = await params;;

    const base =
    process.env.NEXT_PUBLIC_SITE_URL || // Use your deployed domain in production
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` ||
    'http://localhost:3000'; // fallback for local dev

  // Construct absolute URL for SSR fetch
  const apiUrl = `${base}/api/items?id=${slug}`;
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch officer data");
        }
        const data = await response.json();
        return data.data[0];
      } catch (error) {
        console.error("Error fetching officer data:", error);
      }
    };
  const data = await fetchData();
  console.log("Officer Data:", data);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>
        {data?.service}
      </div>
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
        {data.optional_subjects.map((subject, i) => (
          <li key={i}>{subject}</li>
        ))}
      </ul> */}
      <div>Number of attempts: {data?.attempts}</div>
      <div>
        Rank: {data?.rank} ({data?.year})
      </div>
    </div>
  );
}
