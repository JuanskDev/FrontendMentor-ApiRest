import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "../util/api";
import { FaArrowLeft } from "react-icons/fa";

import { useDarkModeContext } from "../../context/DarkModeContext";

const Country = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { darkMode } = useDarkModeContext();
  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();
        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className={` pb-20 ${darkMode ? "bg-lightMode" : "bg-primary"}`}>
      <Link to="/">
        <button
          className={`flex justify-center items-center gap-2 relative top-5 left-4 px-7 py-4  rounded shadow-lg
      ${darkMode ? "bg-lightModeInput" : "bg-secondary"}
      ${darkMode ? "text-black" : "text-white"}`}
        >
          {" "}
          Back
          {<FaArrowLeft />}
        </button>
      </Link>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && (
        <h4
          className={` pl-7 -mt-4
            ${darkMode ? "bg-secondary" : "bg-primary"}
            ${darkMode ? "text-black" : "text-white"} `}
        >
          {error}
        </h4>
      )}

      {country?.map((country) => (
        <div
          className="flex flex-col items-center  mt-10 lg:w-7/12  lg:mx-auto"
          key={country.name}
        >
          <div className="w-2/3 sm:w-1/2 ">
            <img
              className=" w-full rounded-t-md"
              src={country.flags.png}
              alt=""
            />
          </div>

          <div
            className={`w-2/3 sm:w-1/2  py-6 px-4 rounded-b-md   ${
              darkMode ? "bg-lightModeInput" : "bg-secondary"
            }
      ${darkMode ? "text-black" : "text-white"}`}
          >
            <h3 className="text-xl pb-3 font-semibold">
              {country.name.common}
            </h3>

            <div>
              <h5 className="pb-2 font-semibold">
                Population:
                <span className="pl-2 font-light">
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </h5>
              <h5 className="pb-2 font-semibold">
                Region:
                <span className="pl-2 font-light">{country.region}</span>
              </h5>
              <h5 className="pb-2 font-semibold">
                Sub Region:
                <span className="pl-2 font-light">{country.subregion}</span>
              </h5>
              <h5 className="pb-2 font-semibold">
                Capital:
                <span className="pl-2 font-light">
                  {country.capital.map((cap) => {
                    return <span className="pl-2 font-light">{cap}</span>;
                  })}
                </span>
              </h5>
              <h5 className="pb-2 font-semibold">
                Languages:
                {Object.keys(country.languages).map((key) => {
                  return (
                    <span
                      className={`py-1 px-2 font-light mx-2 leading-10 d-flex flex-wrap content-center	justify-start	 rounded
                    ${darkMode ? "bg-neutral-100" : "bg-gray-400"}
                    ${darkMode ? "text-black" : "text-white"}`}
                    >
                      {country.languages[key]}
                    </span>
                  );
                })}
              </h5>
              <h5 className="pb-2 font-semibold">
                Borders:
                {country.borders ? (
                  country.borders?.map((border) => {
                    return (
                      <ul
                        className={`inline-block mx-1 p-1 rounded
                      ${darkMode ? "bg-neutral-100" : "bg-gray-400"}
                      ${darkMode ? "text-black" : "text-white"}`}
                        key={border.key}
                      >
                        <li key={border}>{border + " "}</li>
                      </ul>
                    );
                  })
                ) : (
                  <span className="pb-2 font-light"> No borders</span>
                )}
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Country;
