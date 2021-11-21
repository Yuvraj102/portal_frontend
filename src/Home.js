import React, { useEffect } from "react";
import AboutHome from "./components/AboutHome";
import FirstBannerHome from "./components/FirstBannerHome";
import TestimonialsHome from "./components/TestimonialsHome";
import { useLocation, useHistory } from "react-router-dom";

function Home() {
  // check if there is status and token query and redirect to /feed passing same args
  const history = useHistory();
  const { search } = useLocation();
  useEffect(() => {
    let query = search.slice(1);
    const queryArgs = search.split("&");
    const status = queryArgs[0]?.split("=")[1];
    const token = queryArgs[1]?.split("=")[1];
    if (status && token) {
      // take them to signin
      history.push(`/signin${search}`);
    }
    // console.log("environment:", process.env.NODE_ENV);
  }, []);

  return (
    <div>
      <FirstBannerHome />
      <AboutHome />
      <TestimonialsHome />
    </div>
  );
}

export default Home;
