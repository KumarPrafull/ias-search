import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-blue-100 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-block w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-400 rounded-full mr-2 group-hover:scale-y-110 transition" />
          <span className="text-2xl font-extrabold text-blue-700 tracking-tight group-hover:text-purple-700 transition">
            IAS Guide
          </span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <Link
                href="/"
                className="text-blue-700 font-medium hover:text-purple-700 hover:underline transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/profile/create"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-xl font-semibold shadow hover:bg-purple-600 transition"
              >
                Add Officer
              </Link>
            </li>
            {/* You can add more links here */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
