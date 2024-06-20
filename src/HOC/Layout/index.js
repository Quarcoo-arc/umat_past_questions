import React from "react";

import { Footer, Header } from "../../components";

const Layout = ({ children }) => {
  return (
    <>
      <div className="background-red">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
