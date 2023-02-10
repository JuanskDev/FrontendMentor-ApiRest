import React from "react";
import { useState, useEffect } from "react";
import Search from "../Search/Search";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";
import { useDarkModeContext } from "../../context/DarkModeContext";

const Countries = () => {
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { darkMode } = useDarkModeContext();

  const getCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountry = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountriesByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);
  return (
    <>
      <Search onSearch={getCountry} onSelect={getCountriesByRegion} />

      <div className=" ">
        <div className=""></div>

        <div className="countryBottom">
          {isLoading && !error && <h4>Loading ... </h4>}
          {error && !isLoading && (
            <h4
              className={` pl-7 -mt-4
            ${darkMode ? "bg-lightMode" : "bg-primary"}
            ${darkMode ? "text-red-600" : "text-white"} `}
            >
              {error}
            </h4>
          )}
          <section
            className={`sm:flex sm:flex-row sm:w-full sm:flex-wrap sm:gap-2 pb-28 pt-10
           ${darkMode ? "bg-lightMode" : "bg-primary"}`}
          >
            {countries?.map((country) => (
              <div
                key={country.name.common}
                className="w-10/12 mx-auto my-8  sm:w-5/12 lg:w-3/12 xl:w-1/5 "
              >
                <div className="	">
                  <img
                    className="w-full rounded-t-md sm:w-72 sm:h-48 sm:m-auto shadow-lg "
                    src={country.flags.png}
                    alt=""
                  />
                </div>
                <div
                  className={`-mt-1 py-6 pl-2 rounded-b-md  sm:w-72 sm:m-auto shadow-lg  
                ${darkMode ? "bg-lightModeInput" : "bg-secondary"} 
                ${darkMode ? "text-black" : "text-white"}`}
                >
                  <h3 className="text-xl pb-3 font-semibold">
                    {country.name.common}
                  </h3>
                  <h6 className="pb-2 font-semibold">
                    Population:
                    <span className="pl-2 font-light">
                      {new Intl.NumberFormat("de-DE").format(
                        country.population
                      )}
                    </span>
                  </h6>
                  <h6 className="pb-2 font-semibold">
                    Region:
                    <span className="pl-2 font-light">{country.region}</span>
                  </h6>
                  <h6 className="pb-2 font-semibold">
                    Capital:
                    <span className="pl-2 font-light">{country.capital}</span>
                  </h6>
                  <Link
                    className={`text-sm  ${
                      darkMode ? "text-blue-600" : "text-blue-300"
                    } `}
                    to={`country/${country.name.common}`}
                  >
                    More information {country.flag}
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Countries;
