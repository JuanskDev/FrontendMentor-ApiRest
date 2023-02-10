import React from "react";
import { useState } from "react";
import { useDarkModeContext } from "../../context/DarkModeContext";

const Search = ({ onSearch, onSelect }) => {
  const [input, setInput] = useState("");

  const { darkMode } = useDarkModeContext();

  const submitHandler = (e) => {
    e.preventDefault();

    onSearch(input);
  };

  const selectHandler = (e) => {
    e.preventDefault();
    const regionName = e.target.value;
    onSelect(regionName);
  };

  return (
    <>
      <section className={`filter ${darkMode ? "bg-lightMode" : "bg-primary"}`}>
        <form
          onSubmit={submitHandler}
          className={`form-control  ${
            darkMode ? "bg-lightMode" : "bg-secondary"
          } 
             ${darkMode ? "text-black" : "text-white"}`}
        >
          <input
            className={`rounded w-full p-3  shadow-lg  ${
              darkMode ? "bg-lightModeInput" : "bg-secondary"
            } 
             ${darkMode ? "text-black" : "text-white"}`}
            type="text"
            name="search"
            value={input}
            placeholder="Search for a country"
            onChange={(e) => setInput(e.target.value)}
          />
        </form>

        <div className="region-filter">
          <select
            className={` p-2 w-48 border-none rounded  shadow-lg ${
              darkMode ? "bg-lightModeInput" : "bg-secondary"
            } 
          ${darkMode ? "text-black" : "text-white"}`}
            onChange={selectHandler}
          >
            <option value="Filter by Region">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </section>
    </>
  );
};

export default Search;
