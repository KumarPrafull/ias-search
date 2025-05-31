'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { createSlug } from "../utils";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOfficers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?search=${searchTerm}`);
        if (!response.ok) {
          throw new Error("Failed to fetch officers");
        }
        const data = await response.json();
        setOfficers(data.data || []);
        setError("");
      } catch (err) {
        console.error("Error fetching officers:", err);
        setError("Unable to fetch officers. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (searchTerm.length >= 3) {
      fetchOfficers();
    } else {
      setOfficers([]);
      setError("");
    }
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-2xl px-6 py-6 mb-2 w-full"> 
      <div className="relative mb-4">
        {/* Search Icon Inside Input */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-3.5-3.5" />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name"
          className="w-full border border-gray-200 rounded-xl p-3 pl-10 text-lg shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 outline-none transition"
        />
      </div>
      {loading && (
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <span className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
          <span>Searching...</span>
        </div>
      )}
      {error && (
        <div className="text-red-500 font-medium py-2">{error}</div>
      )}
      {officers.length === 0 && searchTerm.length >= 3 && !loading && !error && (
        <div className="text-gray-500 italic py-2">
          No officers found for &quot;{searchTerm}&quot;.
        </div>
      )}
      {officers.length > 0 && (
        <ul className="divide-y divide-blue-50">
          {officers.map((officer: { _id: string, name: string, service: string, rank: string, batch: string, description: string }) => (
            <li key={officer._id} className="py-2">
              <Link
                href={`/profile/${createSlug({name: officer.name, batch: officer.batch || "", rank: officer.rank || "", service: officer.service || "", _id: officer._id})}`}
                className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 px-2 py-2 rounded-xl hover:bg-blue-50 group transition"
              >
                <span className="font-semibold text-blue-800 group-hover:underline text-lg">{officer.name}</span>
                <span className="inline-flex items-center gap-2">
                  {officer.service && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
                      {officer.service}
                    </span>
                  )}
                  {officer.batch && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      Batch {officer.batch}
                    </span>
                  )}
                  {officer.rank && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                      Rank {officer.rank}
                    </span>
                  )}
                </span>
                {/* <span className="block text-gray-600 text-sm ml-1">
                  {officer.description}
                </span> */}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
