import Search from "./components/Search";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">IAS</h1>
      <h1>IAS (Indian Administrative Service) is one of the most prestigious and sought-after careers in India. It is a dream for many aspirants who wish to serve the nation and make a difference in society. The IAS exam, conducted by the Union Public Service Commission (UPSC), is known for its rigorous selection process and high standards.</h1>
      <p className="mt-4">
        The IAS exam is not just a test of knowledge, but also of character, leadership, and decision-making skills. It requires candidates to have a deep understanding of various subjects, including history, geography, polity, economy, and current affairs. The exam consists of three stages: the Preliminary exam, the Main exam, and the Personality Test (Interview).
      </p>
      <p className="mt-4">
        The Preliminary exam is an objective type test that consists of two papers: General Studies Paper I and General Studies Paper II (CSAT). Candidates who qualify the Preliminary exam are eligible to appear for the Main exam, which is a written examination consisting of nine papers, including essay writing, general studies, and optional subjects. Finally, candidates who clear the Main exam are called for the Personality Test, where their personality, communication skills, and overall suitability for the IAS are assessed.
      </p>
      <p className="mt-4">
        The IAS exam is known for its low success rate, with thousands of candidates competing for a limited number of vacancies. However, with the right preparation, dedication, and perseverance, aspirants can achieve their dream of becoming an IAS officer. Many coaching institutes and online platforms offer guidance and resources to help candidates prepare effectively for the exam.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Know Successful IAS Officer&apos;s strategy, optional subjects, numbers and preparation tips
      </h2>
      <Search />
    </div>
  );
}
