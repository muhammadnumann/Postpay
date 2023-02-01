import React from "react";
const WelcomeEid22: React.FC = () => {
  return (
    <>
      <div className="welcome">
        <div className="container">
        </div>
        <style jsx>{`
          .welcome {
            min-height: 100vh;
            direction: ltr;
            background-image: url("/static/images/eid/web-hero-22.png");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0 0;
            color: white;
            position: relative;
          }
          @media screen and (max-width: 600px) {
            .welcome {
              background-image: url("/static/images/eid/mobile-hero-22.png");
              background-position: 0 0;
            }
          }
        `}</style>
      </div>
    </>
  );
};
export default React.memo(WelcomeEid22);









