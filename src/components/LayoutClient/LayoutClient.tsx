import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Slideshow from "../Slideshow/Slideshow";
import AboutPage from "@/pages/About/About";
import Websiteproduct from "../Websiteproduct/Websiteproduct";
import Customer from "../Customer/Customer";
import EmailFeedback from "../EmailFeedback/EmailFeedback";

const LayoutClient = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <Slideshow />
      {isHomePage && (
        <>
          <AboutPage />
          <Websiteproduct />
          <Customer />
          <EmailFeedback />
        </>
      )}
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutClient;
