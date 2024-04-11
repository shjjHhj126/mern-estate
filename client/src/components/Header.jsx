import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

//rfc
export default function Header() {
  const { currentUser } = useSelector((state) => state.user); // useSelector will listen to the change of currentUser

  // const location = useLocation();

  // const isHomePage = location.pathname === "/";

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
    <header className="bg-white shadow-md">
      <div className="flex justify-between flex-wrap items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-500 text-4xl">Estate Marketplace</span>
          </h1>
        </Link>

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
