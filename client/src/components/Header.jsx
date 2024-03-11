import { FaSearch } from "react-icons/fa"; //fa:font awesome
import { Link } from "react-router-dom";

export default function Header() {
  return (
    //className is how u add CSS classes to components
    //text-sm, for mobile, defaultly. sm:text-xl, for bigger window, sm means at the small breakpoint, bigger than sm display...
    //flex, tailwind expression, means display:flex
    //flex-wrap, tailwind expression, means flex-wrap:wrap

    //hidden, for mobile. sm:inline, showed up for bigger window
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sherry</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"></input>
          <FaSearch className="text-slate-600"></FaSearch>
        </form>
      </div>

      <ul className="flex gap-4">
        <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            About
          </li>
        </Link>
        <Link to="/sign-in">
          <li className="text-slate-700 hover:underline">Sign in</li>
        </Link>
      </ul>
    </header>
  );
}
