import Search from "./components/Search";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center my-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col items-center w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-4 text-center">
              Discover the Journey of India&apos;s Top Civil Servants
            </h1>
            <div className="w-full max-w-xl">
              <Search />
            </div>
          </div>
        </section>

        {/* SEARCH SECTION */}
        <section className="flex flex-col items-center justify-center my-12">
          <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 p-6 rounded-xl shadow flex flex-col items-center w-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-800 text-center">
              Know Successful IAS Officer&apos;s Strategy, Optional Subjects, Numbers and Preparation Tips
            </h2>
            <p className="text-gray-700 text-lg text-center">
              IAS (Indian Administrative Service) is one of the most prestigious and sought-after careers in India. 
              <br />
              A dream for many aspirants who wish to serve the nation and make a difference in society.
            </p> 
          </div>
        </section>

        {/* INFO CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start border border-purple-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">A Test Beyond Knowledge</h3>
            <p className="text-gray-600 text-sm">
              The IAS exam is not just a test of knowledge, but also of character, leadership, and decision-making skills.
              It requires a deep understanding of history, geography, polity, economy, and current affairs.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start border border-purple-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Exam Structure</h3>
            <ul className="list-disc ml-4 text-gray-600 text-sm">
              <li>
                <span className="font-medium text-blue-600">Preliminary:</span> 2 papers (General Studies I &amp; II)
              </li>
              <li>
                <span className="font-medium text-blue-600">Main:</span> 9 papers (Essay, General Studies, Optional Subjects)
              </li>
              <li>
                <span className="font-medium text-blue-600">Interview:</span> Personality Test
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-start border border-purple-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Success Requires Perseverance</h3>
            <p className="text-gray-600 text-sm">
              With thousands of aspirants and a low success rate, dedication and right preparation are key. Use modern resources and expert strategies to achieve your IAS dream.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
