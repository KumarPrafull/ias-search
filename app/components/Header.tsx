import Link from "next/link";

const Header = () => {
    return (
        <div>

        <header className="flex justify-between bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold"><Link href='/'>IAS</Link></h1>
        <nav>
            <ul className="flex space-x-4">
            <li><Link href="/profile/create" className="hover:underline">Create</Link></li>
            </ul>
        </nav>
        </header>
        </div>
    );
    }

export default Header;