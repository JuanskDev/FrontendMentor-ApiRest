import Countries from "./components/Countries/Countries";
import Country from "./components/Country/Country";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DarkModeProvider } from './context/DarkModeContext';

function App() {
 
  
  return (
    <BrowserRouter>
    <DarkModeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Countries />}></Route>
        <Route path="/country/:countryName" element={<Country />}></Route>
      </Routes> 
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;
