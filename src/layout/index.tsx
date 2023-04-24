import React from "react";
import Navbar from "../navbar";
import "./styles.scss";

interface LayoutProps {
  children: React.ReactNode;
  loggedInUser?: any;
}
const Layout = (props: LayoutProps) => {
  return (
    <section className="app-wrapper">
      <div>
        <Navbar />
      </div>

      <div className="app-main-container">{props.children}</div>
    </section>
  );
};

export default Layout;
