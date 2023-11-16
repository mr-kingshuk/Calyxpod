import React from "react";
import "../css/LogIn.css";
import Grid from "@mui/material/Grid";
import LoginForm from "./LoginForm";
import { StylesProvider } from "@material-ui/core";

const LogIn = () => {
  return (
    <div>
      <div>
        <Grid container>
          <Grid
            item
            xs={8}
            style={{ height: "100vh" }}
          >
            <div id="imageSide">
              <div className="image_college">
                <img src="./download.png" alt="" />   
              </div>
              <img src="./sideImage.jpeg"  alt="" />
            </div>
          </Grid>
          <Grid item xs={4}>
            <LoginForm />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LogIn;
