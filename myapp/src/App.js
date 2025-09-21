import React from "react";
import Header from "./components/header";
import Routers from "../src/router/router";
import Footer from "./components/footer";

export default function App() {
  return (
    <>
      <Header />
      <main id="app-main" className="app-main">
        <Routers />
      </main>
      <Footer />
    </>
  );
}
