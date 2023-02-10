import React from "react";
import { FaMoon } from "react-icons/fa";

import { useDarkModeContext } from '../../context/DarkModeContext'

const Header = () => {

  const { toggleDarkMode } = useDarkModeContext()
  const { darkMode } = useDarkModeContext()

  return (
    <div className={`flex flex-row justify-between py-6 px-4  font-semibold items-center lg:py-8 ${darkMode ? 'bg-lightMode' : 'bg-secondary'}
    ${darkMode ? 'text-black' : 'text-white'}`}>
      <div>
        <h4 className="lg:text-xl">Where in the world?</h4>
      </div>
      <div>
        <span className="flex flex-row items-center gap-3 text-sm lg:text-lg">
          <FaMoon /> Dark Mode
          <div className="theme-switch-wrapper"> 
            <label className="theme-switch" htmlFor="checkbox"> 
            <input type="checkbox" id="checkbox"   onInput={() => toggleDarkMode()} />
            <div className="slider round" />
            </label>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Header;
