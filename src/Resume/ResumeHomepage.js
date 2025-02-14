import Resume from "../PriyankaGautam_SoftwareResume.pdf";
import * as React from "react";

import NavigationBar from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

export default function ResumeHomepage() {
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
        <Grid item xs={12} md={4} sx={{ width: "100%", height: "98%" }}>
          <iframe
            title="resume"
            src={Resume}
            style={{ width: "100%", height: "100%", overflow: "auto" }}
          ></iframe>
        </Grid>
      </Grid>
    </div>
  );
}
