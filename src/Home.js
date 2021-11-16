import React from "react";
import AboutHome from "./components/AboutHome";
import FirstBannerHome from "./components/FirstBannerHome";
import TestimonialsHome from "./components/TestimonialsHome";

function Home() {
  return (
    <div>
      <FirstBannerHome />
      <AboutHome />
      <TestimonialsHome />
    </div>
  );
}

export default Home;
