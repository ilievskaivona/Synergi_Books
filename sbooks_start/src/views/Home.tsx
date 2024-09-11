import React from "react";
import NavbarWrapper from "../components/nav/NavbarWrapper";
import Sidebar from "../components/nav/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="App">
      Home
        {/* Home Page */}   
        <NavbarWrapper></NavbarWrapper>
        <Sidebar/>
       
    </div>
  );
};

export default Home;
