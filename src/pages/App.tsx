import React from "react";
import Logo from "../assets/images/rmp_logo.png";

function App() {
  return (
    <div>
      <div className="grid grid-cols-8">
        <div className="col-start-1 col-end-4">
          <div className="flex flex-col items-center justify-center min-h-full">
            <img src={Logo} width={128} />
            <div className="heading-1 mt-9 text-4xl">RmpSYS</div>
            <div className="heading-3 mt-2 text-xl">
              Resident Management System
            </div>
          </div>
        </div>
        <div className="col-start-4 col-end-9 min-h-screen bg-background-dark text-white flex flex-col items-center justify-center ">
          Reserved For Login
        </div>
      </div>
    </div>
  );
}

export default App;
