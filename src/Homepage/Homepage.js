import * as React from "react";

import NavigationBar from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


import Typography from "@mui/material/Typography";
import ProfilePicture from "../IMG_5017.jpeg";
import NewRelicLogo from "../new_relic_logo.png";
import SchulichLogo from "../schulich_logo.png";
import CNRLLogo from "../Canadian_Natural_Logo.svg";

export default function Homepage() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavigationBar />
      <Grid
        container
        spacing={2}
        style={{ flexGrow: 1, backgroundColor: "#758694" }}
      >
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4} md={4}>
            <img
              src={ProfilePicture}
              alt="Your Name"
              style={{
                borderRadius: "50%",
                width: "100%",
                maxWidth: "370px",
                marginBottom: "20px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={6} justifyContent="center" alignItems="center">
            <div
              style={{ textAlign: "center" , color: "white"}}
            >
              <Typography variant="h2" component="h1" gutterBottom>
                Priyanka Gautam
              </Typography>

              <Typography variant="body1" gutterBottom>
                Hi there! I'm Priyanka Gautam, a software engineer driven by a
                passion for technology's power to solve complex challenges and
                positively impact lives. I’m drawn towards innovation, and my
                experiences have fueled my commitment and enthusiasm to use
                technology to create solutions that truly make a difference.
                <br /> <br />
                At New Relic, I developed and launched a Distributed Tracing
                Setup Wizard and engineered performance-enhancing algorithms,
                focusing on technical excellence and user experience. I thrive
                in environments that require creativity, adaptability, and
                strong communication.
                <br /> <br />
                I'm known for my open-minded approach and ability to connect
                with others, making me an effective collaborator in diverse team
                settings. I have a passion for mentoring and have successfully
                guided over 80 engineering students. My adaptability and
                enthusiasm for continuous learning have been crucial to my
                success in both academic and professional environments.
                <br /> <br />
                Outside of work, I love exploring new technologies,
                participating in hackathons, and engaging with the tech
                community. Let's connect or collaborate on exciting projects!
              </Typography>
             
            </div>
           
          </Grid>
        </Grid>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexGrow: 1,
            backgroundColor: "#F7E7DC",
          }}
        >
          <div>
            <img
              src={NewRelicLogo}
              alt="New Relic"
              style={{ height: "90px", paddingTop:'5px' }}
            />
          </div>
          <div>
            <img src={CNRLLogo} alt="Cnrl" style={{ height: "110px", paddingBottom:'8px' }} />
          </div>
          <div>
            <img src={SchulichLogo} alt="Schulich" style={{ height: "130px", paddingBottom:'9px'}} />
          </div>
        </div>
      </Grid>
    </Box>
  );
}
