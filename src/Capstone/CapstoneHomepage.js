import React from "react";
import Handheld_App_Poster from "../Handheld_App_Poster.pdf";
import NavigationBar from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid";

export default function CapstoneHomepage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavigationBar />

      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        style={{ backgroundColor: "#758694", flex: 1 }}
      >
        <Grid item xs={12} md={10} sx={{  height: "90vh" }}>
          <iframe
            title="handheld_app_poster"
            src={`${Handheld_App_Poster}`}
            style={{
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </Grid>
      </Grid>
    </div>
  );
}
