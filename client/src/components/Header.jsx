import { FaSearch } from "react-icons/fa"; //fa:font awesome
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user); // useSelector will listen to the change of currentUser
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // each time we hit the search icon, it reflect to the query(window.location.search) and redirect to that url
  const handleSubmit = (e) => {
    e.preventDefault();

    // set the new url
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    //navigate to the new url
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // each time we directly change the url, it reflect on the search input
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]); // not window.location.search cuz it in rendered within a router context

  return (
    //className is how u add CSS classes to components
    //text-sm, for mobile, defaultly. sm:text-xl, for bigger window, sm means at the small breakpoint, bigger than sm display...
    //flex, tailwind expression, means display:flex
    //flex-wrap, tailwind expression, means flex-wrap:wrap

    //hidden, for mobile. sm:inline, showed up for bigger window
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between flex-wrap items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Sherry</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
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
          <Link to="/profile" alt="profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}></img>
            ) : (
              <li className="text-slate-700 hover:underline">Log in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

// <form onSubmit={}>
//   <input>...</input>
//   <button></button>
// </form>
// clicking the button will submit the form
