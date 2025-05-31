import Link from "next/link";
import { createSlug } from "../utils";
import { Officer } from "../profile/create/page";

const OfficersList = ({items, showDescription}: {items: Officer[], showDescription: boolean}) => {
  return (
        <div className="flex-1 w-full lg:w-1/2">
          <div className="bg-white rounded-3xl shadow-lg border border-purple-100 px-8 py-10">
            <h2 className="font-extrabold text-xl mb-4 text-purple-700">All Officers</h2>
            {items.length === 0 ? (
              <div className="text-gray-500 italic">No officers yet.</div>
            ) : (
              <ul>
                {items.map(item => (
                  <li className="py-2 border-b border-blue-50 last:border-b-0" key={item._id}>
                    <Link
                      href={`/profile/${createSlug({name: item.name, batch: item.batch || "", rank: item.rank || "", service: item.service || "", _id: item._id})}`}
                      className="text-blue-700 font-semibold hover:underline hover:text-purple-700 transition"
                    >
                      {item.name}
                    </Link>
                    <span className="ml-2 text-gray-500 text-xs">
                      {item.service?.toUpperCase() || ""} {item.batch ? `| Batch: ${item.batch}` : ""}
                      {item.rank ? ` | Rank: ${item.rank}` : ""}
                    </span>
                    {showDescription && <div className="text-gray-600 text-xs">{item.description}</div>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
  );
}

export default OfficersList;
