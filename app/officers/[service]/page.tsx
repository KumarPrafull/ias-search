import Link from "next/link";
// export const dynamic = "force-dynamic";

// Officer Type
type Officer = {
  _id: string;
  name: string;
  service?: string;
  batch?: string;
  rank?: string;
  optional_subject?: string;
  home_state?: string;
};

// List of services to choose from
const SERVICES = [
  { key: "ias", label: "IAS", full: "Indian Administrative Service" },
  { key: "ips", label: "IPS", full: "Indian Police Service" },
  { key: "ifs", label: "IFS", full: "Indian Foreign Service" },
  { key: "irs", label: "IRS", full: "Indian Revenue Service" },
];

// Make first letter uppercase, rest lowercase (for display)
function titleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

type Params = Promise<{ service: string }>;
// Main Page
export default async function OfficersByServicePage({ params }: { params: Params }) {
    const { service } = await params;
  const serviceParam = (service || "ias").toLowerCase();
  // const serviceParam = await (params.service || "ias").toLowerCase();
  const currentService = SERVICES.find(s => s.key === serviceParam) || SERVICES[0];
  console.log("Current Service:", currentService);

  // Fetch officers for the current service
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000";
  const apiUrl = `${base}/api/items?service=${currentService.key}`;

  let officers: Officer[] = [];
  try {
    const res = await fetch(apiUrl, { cache: "force-cache" });
    if (res.ok) {
      const data = await res.json();
      officers = data.data || [];
    }
  } catch {}

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Service Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {SERVICES.map(s => (
          <Link
            key={s.key}
            href={`/officers/${s.key}`}
            className={`px-6 py-2 rounded-xl font-bold border transition shadow
              ${
                s.key === currentService.key
                  ? "bg-blue-700 text-white border-blue-700 scale-105"
                  : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
              }
            `}
            aria-current={s.key === currentService.key ? "page" : undefined}
          >
            {s.label}
          </Link>
        ))}
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2 tracking-tight">
          {currentService.full}
        </h1>
        <p className="text-lg text-gray-600">
          Explore {currentService.label} toppers and distinguished officers.
        </p>
      </div>

      {/* Officer Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {officers.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-20">
            No officers found for {currentService.label}.
          </div>
        ) : (
          officers.map(officer => (
            <Link
              href={`/profile/${officer._id}`}
              key={officer._id}
              className="group border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow hover:shadow-lg p-5 flex flex-col gap-2 transition hover:-translate-y-1"
            >
              <div className="text-xl font-extrabold text-blue-800 group-hover:underline">{officer.name}</div>
              <div className="flex flex-wrap gap-2 text-sm">
                {officer.batch && (
                  <span className="bg-blue-700 text-white px-3 py-1 rounded-full font-semibold">
                    {officer.batch}
                  </span>
                )}
                {officer.rank && (
                  <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-semibold">
                    Rank {officer.rank}
                  </span>
                )}
                {officer.optional_subject && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Optional: {officer.optional_subject}
                  </span>
                )}
                {officer.home_state && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    {titleCase(officer.home_state)}
                  </span>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

// SSG: Generate static params for all service pages
export async function generateStaticParams() {
  return [
    { service: "ias" },
    { service: "ips" },
    { service: "ifs" },
    { service: "irs" },
  ];
}
