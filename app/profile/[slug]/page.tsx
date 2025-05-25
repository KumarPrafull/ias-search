type Params = Promise<{ slug: string[] }>

export default async function Home({params} : {params : Params}) {
    const { slug } = await params;
    console.log('Slug:', slug);
  const data = {
    name: 'John Doe',
    service: 'IAS',
    rank: 1,
    year: 2023,
    introduction:
      'IAS (Indian Administrative Service) is one of the most prestigious and sought-after careers in India...',
    father: 'John Doe Sr.',
    father_occupation: 'Government Employee',
    mother: 'Jane Doe',
    mother_occupation: 'Teacher',
    attempts: 3,
    optional_subjects: ['Geography', 'Public Administration', 'Anthropology'],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>
        {data.service}
      </div>
      <h1 className="text-3xl font-bold mb-4">
        {data.name} ({data.service})
      </h1>
      <p className="mb-4">{data.introduction}</p>
      <div className="mb-2">Father&apos;s Name: {data.father}</div>
      <div className="mb-2">Father&apos;s Occupation: {data.father_occupation}</div>
      <div className="mb-2">Mother&apos;s Name: {data.mother}</div>
      <div className="mb-2">Mother&apos;s Occupation: {data.mother_occupation}</div>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Optional Subjects of {data.name}:
      </h2>
      <ul className="list-disc list-inside mb-4">
        {data.optional_subjects.map((subject, i) => (
          <li key={i}>{subject}</li>
        ))}
      </ul>
      <div>Number of attempts: {data.attempts}</div>
      <div>
        Rank: {data.rank} ({data.year})
      </div>
    </div>
  );
}
