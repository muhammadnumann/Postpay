import React from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Nav: React.FC = () => (
  <>
    <div className="nav-container">
      <div className="mobile-nav">
        <MobileNav />
      </div>
      <div className="desktop-nav">
        <DesktopNav />
      </div>

    </div>
    <style jsx>{`
      .desktop-nav {
        display: block;
      }

      .mobile-nav {
        display: none;
      }

      @media screen and (max-width: 750px) {
        .desktop-nav {
          display: none;
        }

        .mobile-nav {
          display: block;
        }
      }
    `}</style>
  </>
);

export default Nav;
