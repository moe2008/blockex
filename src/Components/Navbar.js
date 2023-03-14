import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <div className={classes.nav}>
        <div className={classes.left}>
          <Link to="/" className={classes.link}>Blockexplorer</Link>
        </div>
        <div className={classes.right}>
        <Link to="/acc" className={classes.link}>Account</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
