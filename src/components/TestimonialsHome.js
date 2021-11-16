import React from "react";
import "./TestimonialsHome.css";
import mobileImage from "./../assets/mobile.svg";
function TestimonialsHome() {
  return (
    <div className="testimonials">
      <h1>TESTIMONIALS</h1>
      <p>
        By far the best community ever seen for students, this platform is need
        of the hour,It has got a massive potential to influence our life as a
        student <span>-nishkarsh</span>
      </p>
      <div className="testimonials__app">
        <div className="testimonials__app__info">
          <h1>DOWNLOAD</h1>
          <h1>OUR APP</h1>
          <p>
            Our apps are comming soon, as this platform is still under
            construction 🚧, stay tuned for updates
          </p>
          <button>App Store</button>
          <button>Google play</button>
        </div>
        <div className="testimonials__app__photo">
          <img src={mobileImage} />
        </div>
      </div>
    </div>
  );
}

export default TestimonialsHome;
