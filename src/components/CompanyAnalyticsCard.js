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

const CompanyAnalyticsCard = ({ info }) => {

    const email = info.email


    const [user, setUser] = useState([]);
    const fetchApplicant = async () => {
        const querySnapshot2 = await getDoc(doc(db, "people", email))
        setUser(querySnapshot2.data())
    }

    useEffect(() => {
        fetchApplicant();
    }, []);

    return (
        <div className="rowout row">
            <div className="id">{user.roll}</div>
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
            <div className="branch">{user.department}</div>
            <div className="cgpa">{user.cgpa}</div>
            <div className="phone">{user.phone_number}</div>
        </div>
    );
};

export default CompanyAnalyticsCard;
