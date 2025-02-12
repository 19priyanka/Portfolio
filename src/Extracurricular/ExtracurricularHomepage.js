import * as React from "react";

import NavigationBar from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


import Typography from "@mui/material/Typography";
import CAGISLogo from "../CAGISLogo.png";

 export default function ExtracurricularHomepage(){
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
              src={CAGISLogo}
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
                Volunteer Work
                            </Typography>
                            <div style={{paddingBottom: "50px"}}>

                            </div>
              <Typography variant="h4" component="h1" gutterBottom>
                About CAGIS - Canadian Association for Girls in Science
              </Typography>
              <Typography variant="body1" gutterBottom>
                                The Canadian Association for Girls in Science (CAGIS) is Canada’s largest and longest-running STEM club for girls and gender-diverse youth aged 7-17. Founded in 1992, CAGIS aims to spark curiosity and foster a love for STEM (science, technology, engineering, trades, and math) through hands-on activities, mentorship, and behind-the-scenes field trips to STEM workplaces. By prioritizing equity, diversity, inclusion, and accessibility, CAGIS creates a safe, welcoming space where participants can see themselves represented and explore
                                STEM fields in fun and engaging ways. The organization’s
                                work is grounded in research and guided by an intersectional approach that removes barriers and promotes a sense of belonging in STEM.
                            </Typography>
                            <br></br>
             <Typography variant="h4" component="h1" gutterBottom>
               My Role 
              </Typography>
              <Typography variant="body1" gutterBottom>
                                As a STEM Expert Volunteer with CAGIS, I contribute by creating and delivering interactive events that explain software concepts in fun and accessible ways. My responsibilities include designing age-appropriate presentations, developing engaging hands-on activities, and mentoring youth to spark their interest in STEM. By showcasing real-world applications of technology and fostering inclusivity, I help inspire participants to imagine themselves in STEM careers
                                and equip them with the knowledge and confidence to pursue those pathways. Through this role, I actively support CAGIS’s mission to make STEM accessible and exciting for all.
              </Typography>
            </div>
           
          </Grid>
        </Grid>

       
      </Grid>
    </Box>
  );
};
