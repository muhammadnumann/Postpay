import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

interface ITabs {
  label: string;
  route: string;
}

interface IProps {
  tabs: Array<ITabs>;
}

const SideBar: React.FC<IProps> = ({ tabs }) => {
  const router = useRouter();
  const {
    query: { tab }
  } = router

  return (
    <>
      {tabs.map((tabItem, index) => (
        <div key={tabItem.route} className={`side-tab ${tabItem.route === tab ? 'active' : ''}`}><Link
          href={'/about-us/[tab]'} as={`/about-us/${tabItem.route}`}><a>{tabItem.label}</a></Link></div>
      ))}
      <style jsx>{`
        .side-tab a {
          cursor: pointer;
          font-size: 1.4rem;
          line-height: 2.6rem;
          font-family: var(--font-regular);
          color: #888888;
        }

        :global([dir='rtl']) .side-tab a {
          font-family: var(--font-light);
        }

        .active a {
          font-family: var(--font-demi-bold);
          color: black;
        }

        :global([dir='rtl']) .active a {
          font-family: var(--font-medium);
        }

        @media screen and (max-width: 900px) {
          .container {
            top: 5px;
            right: -20px;
          }
        }

        @media screen and (max-width: 500px) {
          .container {
            top: 5px;
            right: -20px;
          }
        }
      `}</style>
    </>)
}

SideBar.defaultProps = {
  tabs: []
}
export default SideBar;
