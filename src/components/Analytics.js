import React, { useState, useEffect } from "react";
import Applications from "./Applications";
import LeftHeader from "./LeftHeader";
import "./../css/Opportunity.css";
import { useNavigate } from "react-router-dom";
import NewOpportunityCard from "./NewOpportunityCard2";
import AnalyticsCard from "./AnalyticsCard";
import ProfileButton from "./ProfileButton";
import { db } from "./Firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const Analytics = () => {
  const [dataApplication, setDataApplication] = useState([]);
  let navigate = useNavigate();
  if (localStorage.getItem("isLoggedIn") !== "true") {
    navigate("/login", { replace: true });
  }

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "opportunities"));
    let data_list = [];
    querySnapshot.forEach((doc) => {
        let data_json = doc.data()
        data_json['doc_name'] = doc.id;
        data_list.push(data_json);
    });
    setDataApplication(data_list);
    // console.log("Here");
    // console.log(data_list);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const type = localStorage.getItem("acc");

  return (
    <>
    {type === "ad" ? (
    <div className="opportunityMain">
      <div style={{ position: "absolute", right: "50px" }}>
        <ProfileButton />
      </div>
      <div style={{ width: "228px" }}>
        <LeftHeader />
      </div>
      <div className="opportunityMainRight">
        <h1 style={{marginTop : "25px", fontSize: "30px"}}>Companies List</h1>
        {dataApplication.map((item) => {
          return (
            <>
              <AnalyticsCard info={item} />
              <br />
            </>
          );
        })}
        {/* <Item data={tempData}/> */}
      </div>
    </div>):(<h1> 404 </h1>)}</>
  );
};

export default Analytics;
