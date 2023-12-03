import React, { useEffect, useState } from "react";
import logo from "../assets/letter_z.png";
import "../css/AnalyticsCard.css";
import { Icon } from "semantic-ui-react";
import hat from "../assets/hat.png";
import { indigo } from "@mui/material/colors";
import { toast, ToastContainer } from "react-toastify";
import { db } from "./Firebase";
import { collection, getDoc, setDoc, doc, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AnalyticsCard = ({ info }) => {
  const [cgpa, setCgpa] = React.useState(0);
  const [branch, setBranch] = React.useState(0);
  const [branchArray, setBranchArray] = React.useState([]);

  let navigate = useNavigate();
  // console.log(JSON.stringify(info));
  var date1 = new Date(info.date.seconds * 1000);
  var date2 = new Date();
  var diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // console.log(diffDays);
  date1 = new Date(info.end_date.seconds * 1000);
  diffTime = Math.abs(date2 - date1);
  const diffEndDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let usermail, querySnapshot, branchString;

  const handleRedirect = () => {
    navigate('/companyanalytics', { state: { id: info.doc_name, name: info.company_name } });
  }

  return (
    <div className="main-card" onClick={handleRedirect}>
      <div className="top">
        <div className="company-info">
          <img src={logo} alt="" />
          <div>
            <div className="xyz">
              <h3>{info.title}</h3>
              <img className="logoImage" src={hat} alt="" />
            </div>
            {/* <h3>{info.title}</h3> */}
            <p style={{ "text-align": "left" }}>{info.company_name}</p>
          </div>

          {/* <div className="graduation-cap">
            <img src={hat} alt="" />
          </div> */}
        </div>
        {/* <div className="graduation-cap">
        </div> */}
        {/* <div className="date"></div> */}
      </div>
    </div>
  );
};

export default AnalyticsCard;
