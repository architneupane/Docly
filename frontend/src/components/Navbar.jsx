import { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { api_base_url } from "../pages/Helper";

function Navbar() {
  const { docId } = useParams();
  const userId = sessionStorage.getItem("userId");
  const [name, setName] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`${api_base_url}/getUser`, {
        mode: "cors",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      })
      .then((res) => res.json())
      .then((data) => {setName(data?.user?.name)})
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      {/* div containing logo and search */}
      <div className="flex justify-between px-28 bg-zinc-900 ">
        {/* div containing logo */}
        <div className="flex items-center ">
          <a href="/"> <img className="w-28" src={logo} alt="error" /></a>
          <h1 className="text-5xl ">
            <a href="/">Docly</a>
          </h1>
        </div>
        {/* div containing search */}
        <div className="flex items-center">
          {docId && (
            <button
              className="bg-green-600 mr-10 pl-5 pr-5 pt-1 pb-1 rounded-md"
              onClick={() => navigate("/")}
            >
              Save
            </button>
          )}
          <div className="flex items-center bg-zinc-950 pr-10 border-solid border-gray-400 border rounded-md pl-2 mr-10 ">
            <i>
              <FaSearch />
            </i>
            <input
              className="h-8 w-[350px] bg-transparent outline-none pl-2"
              type="text"
              placeholder="Search here...."
            />
          </div>
          {/* div containing account */}
          <h3 className="w-full h-11 px-3 pt-[10px] bg-red-500 rounded-full font-semibold">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
