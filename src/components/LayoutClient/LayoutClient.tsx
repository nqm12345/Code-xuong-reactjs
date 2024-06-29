

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slideshow from "../Slideshow/Slideshow";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <Slideshow />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutClient;
