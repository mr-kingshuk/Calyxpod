import React from "react";
import "../css/LeftHeader.css";
// import mainLogo from "../assets/mainLogo.jpg";
import HeaderOptions from "./HeaderOptions";

function LeftHeader() {
  return (
    <div className="main-leftHeader">
      <div  className="main-inner-leftHeader">
        <img className="main-logo"  src="./mainLogo.png" alt="" />
      </div>
      <div id="name" style={{fontSize: "30px", marginLeft: "15px"}} className="main-inner-label">
        LNMIIT
      </div>
      <div className="header-options">
        <div className="option1">
          <HeaderOptions name={"Dashboard"} />
          {/* <HeaderOptions name={"People"} /> */}
        </div>
      </div>
    </div>
  );
}

export default LeftHeader;
