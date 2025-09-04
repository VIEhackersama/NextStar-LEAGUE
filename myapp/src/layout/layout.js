import Header from "../components/header";
import React from 'react';
import Routers from "../router/router";
import Footer from "../components/footer.js";
 function Layout () {
  return ( 
    <>
      <Header/>
      <Routers/>
      <Footer/>
    </>
  );
  
};
export default Layout;