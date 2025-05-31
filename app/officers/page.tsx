import Link from "next/link";

type Officer = {
  _id: string;
  name: string;
  service?: string;
  batch?: string;
  rank?: string;
  optional_subject?: string;
  home_state?: string;
};

const SERVICE_ORDER = ["IAS", "IPS", "IFS", "IRS"];
const SERVICE_LABELS: Record<string, string> = {
  IAS: "Indian Administrative Service (IAS)",
  IPS: "Indian Police Service (IPS)",
  IFS: "Indian Foreign Service (IFS)",
  IRS: "Indian Revenue Service (IRS)",
};

export default async function OfficersPage() {
  // Fetch all officers at build time (SSG)
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000";
  const apiUrl = `${base}/api/items`;

  let officers: Officer[] = [];
  try {
    const res = await fetch(apiUrl, { cache: "force-cache" });
    if (res.ok) {
      const data = await res.json();
      officers = data.data || [];
    }
  } catch (error) {
    // Optionally handle error
  }

  // Group by service
  const grouped: Record<string, Officer[]> = {};
  for (const service of SERVICE_ORDER) {
    grouped[service] = [];
  }
  officers.forEach((officer) => {
    const key = (officer.service || "").toUpperCase();
    if (SERVICE_ORDER.includes(key)) {
      grouped[key].push(officer);
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-700">
        Civil Services Officers Directory
      </h1>
      <p className="text-center text-lg mb-12 text-gray-700">
        Browse the toppers and distinguished officers of <span className="font-semibold">IAS</span>, <span className="font-semibold">IPS</span>, <span className="font-semibold">IFS</span>, and <span className="font-semibold">IRS</span> services.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {SERVICE_ORDER.map((service) =>
          grouped[service]?.length ? (
            <section
              key={service}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 shadow-lg p-6"
            >
              <h2 className="text-2xl font-extrabold text-blue-800 mb-6 flex items-center gap-2">
                {SERVICE_LABELS[service] || service}
                <span className="bg-blue-200 text-blue-900 text-xs font-bold px-2 py-1 rounded ml-2">
                  {grouped[service].length}
                </span>
              </h2>
              <div className="flex flex-col gap-4">
                {grouped[service].map((officer) => (
                  <Link
                    href={`/profile/${officer._id}`}
                    key={officer._id}
                    className="block hover:bg-blue-100 transition rounded-xl p-4 border border-gray-200 shadow flex flex-col md:flex-row md:items-center gap-2"
                  >
                    <div className="font-semibold text-lg text-blue-900">
                      {officer.name}
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-700 ml-1">
                      {officer.batch && (
                        <span className="bg-blue-600 text-white rounded-full px-3 py-1 font-bold">
                          {officer.batch}
                        </span>
                      )}
                      {officer.rank && (
                        <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 font-bold">
                          Rank {officer.rank}
                        </span>
                      )}
                      {officer.optional_subject && (
                        <span className="bg-green-100 text-green-700 rounded-full px-3 py-1">
                          Optional: {officer.optional_subject}
                        </span>
                      )}
                      {officer.home_state && (
                        <span className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1">
                          State: {officer.home_state}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </div>
  );
}
