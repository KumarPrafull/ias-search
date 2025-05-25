'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

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
            } catch (err) {
                console.error({ Error: err });
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

    return (<div>

        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search IAS Officer"
            className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        {/* {loading && <p>Loading...</p>} */}
        {error && <p className="text-red-500">{error}</p>}
        {officers.length === 0 && searchTerm !== "" && searchTerm?.length > 3 && !loading && !error && (
            <p>No officers found for &quot;{searchTerm}&quot;</p>
        )}
        {officers.length > 0 && (
            <ul className="list-disc pl-5">
                {officers.map((officer: { _id: string, name: string, service: string, batch: string, description: string }) => (
                    <li key={officer._id} className="mb-2">
                        <Link href={'profile/'+officer._id} className="text-blue-500 hover:underline">
                        <strong>{officer.name}</strong> - {officer.service} ({officer.batch})<br />
                        {officer.description}
                        </Link>
                    </li>
                ))}
            </ul>
        )}
    </div>
    )
}

export default Search;