import React, { useEffect, useState } from "react";
import logo from "../assets/letter_z.png";
// import "../css/AnalyticsCard.css";
import { Icon } from "semantic-ui-react";
import hat from "../assets/hat.png";
import { indigo } from "@mui/material/colors";
import { toast, ToastContainer } from "react-toastify";
import { db } from "./Firebase";
import { collection, getDoc, setDoc, doc, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyAnalyticsCard from "./CompanyAnalyticsCard";
import LeftHeader from "./LeftHeader";
import "./../css/Opportunity.css";
import ProfileButton from "./ProfileButton";
import Papa from 'papaparse';

const CompanyAnalytics = () => {
    const { state } = useLocation();
    const { id } = state;


    const [dataApplication, setDataApplication] = useState([]);

    const fetchApplicants = async () => {
        const querySnapshot = await getDocs(query(collection(db, "applications"), where("oppor_id", "==", id)));
        let data_list = []
        querySnapshot.forEach((docu) => {
            data_list.push({ "email": docu.data().userEmail })
        });
        setDataApplication(data_list);
    }

    useEffect(() => {
        fetchApplicants();
    }, []);

    const type = localStorage.getItem("acc");

    const convertToCSV = (data) => {
        const csv = Papa.unparse(data);
        return csv;
    };

    const downloadCSV = (csv, filename) => {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const url = URL.createObjectURL(blob);

            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const handleExport = async () => {
        const results = await Promise.all(
            dataApplication.map(async (item) => {
                const { roll, name, email, cgpa, program, department, phone_number, resume_link, address } = (await getDoc(doc(db, "people", item.email))).data();
                return {
                    roll, name, email, cgpa, program, department, phone_number, resume_link, address
                }
            }));

        const csv = convertToCSV(results);
        downloadCSV(csv, `${state.name}Applicants.csv`);
    };

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
                        <div style={{ marginTop: "35px", marginBottom:"20px", display: "flex", justifyContent: "space-evenly", alignItems: "center", gap: "10px" }}>
                            <h1 style={{ fontSize: "30px" }}> Applicants list for {state.name}</h1>
                            <button style={{ color: "white", background: "green", padding: "5px 10px" }} onClick={handleExport}>Export</button>
                        </div>
                        <div className="rowout table">
                            <div className="id">Roll No.</div>
                            <div className="name">Name</div>
                            <div className="email">Email</div>
                            <div className="branch">Branch</div>
                            <div className="cgpa">CGPA</div>
                            <div className="phone">Phone Number</div>
                        </div>
                        <hr />
                        {dataApplication.map((item) => {
                            return (
                                <>
                                    <CompanyAnalyticsCard info={item} />
                                    <br />
                                </>
                            );
                        })}
                        {/* <Item data={tempData}/> */}
                    </div>
                </div>) : (<h1> 404 </h1>)}
        </>
    );
};

export default CompanyAnalytics;
