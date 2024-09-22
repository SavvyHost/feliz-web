import React, { ReactElement } from "react";
import { Footer, Navbar } from ".";

type Layout_Tp = {
  children: ReactElement;
};

function Layout({ children }: Layout_Tp) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
