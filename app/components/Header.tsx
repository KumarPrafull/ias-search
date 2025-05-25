import Link from "next/link";

const Header = () => {
    return (
        <div>

        <header className="flex justify-between bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold mb-4">IAS</h1>
        <nav className="mt-2">
            <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/profile/create" className="hover:underline">Create</Link></li>
            </ul>
        </nav>
        </header>
        </div>
    );
    }

export default Header;