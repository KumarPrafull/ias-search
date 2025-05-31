import Link from "next/link";
import { createSlug } from "../utils";

// Reuse your type for Officer (adjust if your API structure differs)
type Officer = {
    _id: string;
    name: string;
    service?: string;
    batch?: string;
    rank?: string;
    optional_subject?: string;
    home_state?: string;
};

export default async function ToppersPage() {
    const isAdmin = false; // Replace with your actual admin check logic
    // You might want to add a `?sort=rank` or similar param on your API if needed
    const base =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
        "http://localhost:3000";
    const apiUrl = `${base}/api/toppers`;
    let toppers: Officer[] = [];
    try {
        const response = await fetch(apiUrl, { cache: "force-cache" });
        const data = await response.json();
        toppers = data.data ?? [];
    } catch (error) {
        console.error("Error fetching toppers:", error);
        toppers = [];
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-2">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-blue-800 mb-2">
                            UPSC Toppers List
                        </h1>
                        <p className="text-gray-600">
                            Explore details of successful toppers: Batch, Optional, Home State, Service.
                        </p>
                    </div>
                    {isAdmin && <Link href="/profile/create" className="mt-3 md:mt-0 bg-blue-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow transition">
                        Add Officer
                    </Link>}
                </div>
                <div className="bg-white rounded-3xl shadow-lg border border-blue-100 px-6 py-6">
                    {toppers.length === 0 ? (
                        <div className="text-gray-500 italic py-10 text-center">
                            No toppers available yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                                        <th className="py-3 px-4 font-bold rounded-l-2xl">Name</th>
                                        <th className="py-3 px-4 font-bold">Batch</th>
                                        <th className="py-3 px-4 font-bold">Optional</th>
                                        <th className="py-3 px-4 font-bold">Home State</th>
                                        <th className="py-3 px-4 font-bold rounded-r-2xl">Service</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toppers.map((officer) => (
                                        <tr
                                            key={officer._id}
                                            className="border-b hover:bg-blue-50 transition"
                                        >
                                            <td className="py-3 px-4 font-semibold text-blue-700">
                                                <Link
                                                    href={`/profile/${createSlug({name: officer.name, batch: officer.batch || "", rank: officer.rank || "", service: officer.service || "", _id: officer._id})}`}
                                                    className="hover:underline"
                                                >
                                                    {officer.name}
                                                </Link>
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">
                                                {officer.batch || "-"}
                                            </td>
                                            <td className="py-3 px-4 text-purple-800">
                                                {officer.optional_subject || "-"}
                                            </td>
                                            <td className="py-3 px-4 text-gray-700">
                                                {officer.home_state || "-"}
                                            </td>
                                            <td className="py-3 px-4 text-blue-700 uppercase">
                                                {officer.service || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
