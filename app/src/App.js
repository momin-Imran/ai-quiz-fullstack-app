import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Quiz from "./components/Quiz";

function App() {
  //navigating home
  const navigateToHome = () => {
    window.location.href = "/";
  };

  //state management
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false); // <-- Add this line

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //JSX begins here:
  return (
    <div className="App flex flex-col items-center text-center bg-gradient-to-r from-blue-600 to-purple-900 w-screen min-h-screen m-0 p-0 overflow-visible">
      <div
        className={`NavBar flex justify-between rounded-b-2xl w-screen sticky top-0 z-50 ${
          isScrolled ? "bg-navy-200 backdrop-blur-md shadow-2xl " : ""
        }`}
      >
        <div className="Logo cursor-pointer" onClick={navigateToHome}>
          <div
            className={`   drop-shadow-xl flex items-center text-yellow-400 text-2xl font-bold ml-5 mt-3 mb-3 self-start`}
          >
            <img src="/quiz.png" alt="logo" className="max-w-6 max-h-6" />
            Quiz<span className="text-white">Me</span>
          </div>
        </div>
        <div className="flex items-center mr-9">
          <button className=" text-white text-md  "></button>
        </div>
      </div>
      <h1 className="text-white drop-shadow-2xl tracking-tighter text-center text-4xl sm:text-6xl lg:text-7xl font-bold mx-auto m-0 pt-28 z-10">
        <span>Step up your learning game</span> <br />
        <span>using the help of AI-powered </span>
        <span
          className="drop-shadow-xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 94, 77, 1) 0%, rgba(255, 153, 0, 1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          quizzes!
        </span>
      </h1>
      <div className="mt-10 sm:mt-20">
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <div>
        <Quiz searchTerm={searchTerm} />
      </div>
      {/* <div className=" h-screen"></div> */}
    </div>
  );
}

export default App;
