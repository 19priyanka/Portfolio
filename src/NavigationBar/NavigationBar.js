import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
//import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function NavigationBar() {
  let navigate = useNavigate();

  return (
    <div>
      
      <AppBar
        position="static"
        style={{ backgroundColor: "#405D72", paddingBottom: "15px" }}
      >
        <Toolbar style={{
          display: "flex",
        flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
      }}
    >
          <Typography variant="h6" component="div">
            Priyanka Gautam
          </Typography>
          <Box sx={{ paddingLeft: { sm: '0px', md: '450px' } }}>
            
                <Button color="inherit">Home</Button>
            <Button
              color="inherit"
              onClick={() => navigate("/ProjectsHomepage")}
            >
              Projects
            </Button>
            <Button color="inherit"  onClick={() => navigate("/ExtracurricularHomepage")}>Extracurricular</Button>
            <Button color="inherit" onClick={() => navigate("/CapstoneHomepage")}>Capstone</Button>
            <Button color="inherit" onClick={() => navigate("/ResumeHomepage")}>Resume</Button>
           
          
          </Box>
          <Box>
            <IconButton
              color="inherit"
              href="https://www.linkedin.com"
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com/19priyanka"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="mailto:pgautam.dev19@gmail.com"
              target="_blank"
            >
              <EmailIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
