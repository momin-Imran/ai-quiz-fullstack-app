import React, { useState } from "react";


const SearchBar = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      //validating entry to make sure no empty string gets searched
      if(!inputValue.trim()){
        setSearchTerm(null)
      }
      else{setSearchTerm(inputValue)}
      
    }
  };

  return (
    <div>
      
        <form id="search" onSubmit={(e) => e.preventDefault()}>
          <input
            className="bg-transparent hover:drop-shadow-x text-white rounded-full text-sm sm:text-base px-3 py-3 sm:px-10 sm:py-5 outline-none border-2 border-white hover:border-yellow-400 sm:hover:px-20 sm:focus:px-20 transition-all duration-700"
            type="text"

            value={inputValue}
            placeholder="Choose a topic..."
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </form>
      
    </div>
  );
};

export default SearchBar;
