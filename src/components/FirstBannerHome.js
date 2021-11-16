import React from "react";
import "./FirstBannerHome.css";
import { Link } from "react-router-dom";
import studentImage from "./../assets/home_page.svg";
function FirstBannerHome() {
  return (
    <div className="firstBanner">
      {/* logo and signin btn */}
      <div className="firstBanner__header">
        <h1>Portal</h1>
        <Link to="signin">
          <h3>Join The Community</h3>
        </Link>
      </div>
      {/* flex div */}
      <div className="firstBanner__main">
        <div className="firstBanner__main__info">
          <h1>JOIN THIS</h1>
          <h1 className="greatCommunity">GREAT COMMUNITY</h1>
          <p>
            portal is a online platform for students like you ,engage
            ,collaborate ,particiapte, Make sure your signin we hope to see you
            on the other side
          </p>
          <Link to="signin">
            <h3>SIGN UP ></h3>
          </Link>
        </div>
        <div className="firstBanner__main__imageDiv">
          <img src={studentImage} />
        </div>
      </div>
      {/* title header*/} {/*Image*/}
      {/* bio */}
      {/* signin btn */}
    </div>
  );
}

export default FirstBannerHome;
