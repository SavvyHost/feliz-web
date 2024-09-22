import React from "react";
import { Header } from "../atoms/Header";

const Navbar: React.FC = () => {
  const headerText = "My Header"; // Define the header text or get it from props, state, etc.

  return (
    <>
      <Header header={headerText} />
    </>
  );
};

export default Navbar;
