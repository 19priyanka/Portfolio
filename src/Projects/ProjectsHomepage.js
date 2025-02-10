import * as React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import BrainyBeesLogo from "../BrainyBeesLogo.png";
import GetHomeSafeLogo from "../GetHomeSafeLogo.png";

export default function ProjectsHomepage() {
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
        style={{ flexGrow: 1, backgroundColor: "#758694" }}
        container
        direction="row"
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: 450, height: 500 }}>
          <CardMedia
            component="img"
            height="250"
            sx={{ objectFit: "contain", height: 250 }}
            image={BrainyBeesLogo}
            title="BrainyBees"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Brainy Bees
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              A website is designed to teach coding to students in grades 5-9 by
              catering to diverse learning styles, including visual, auditory,
              interactive, and hands-on approaches. It provides a personalized
              experience with games, videos, quizzes, and coding challenges,
              making it accessible for beginners learning to code, intermediates
              revisiting concepts, and advanced users refining their skills.
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              to={{
                pathname: "https://spontaneous-tulumba-bb55aa.netlify.app/",
              }}
            >
              Website
            </Link>
            <Link
              to={{
                pathname: "https://github.com/19priyanka/CPSC481_BrainyBees",
              }}
            >
              Source Code
            </Link>
            <Link to="https://youtu.be/yJtHYlctFEg">Youtube Video</Link>
          </CardActions>
        </Card>
        <Card sx={{ width: 450, height: 500 }}>
          <CardMedia
            component="img"
            height="250"
            sx={{ objectFit: "contain", height: 250 }}
            image={GetHomeSafeLogo}
            title="Get Home Safe"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Get Home Safe
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              An app that provides a reliable way to monitor friends' safety and
              confirm their safe arrival home from outings, especially in
              situations where walking alone or using ride shares feels unsafe.
              By addressing the lack of an effective solution, it ensures peace
              of mind by keeping trusted contacts informed in real-time.
              <br />
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              to={{
                pathname: "https://github.com/19priyanka/GetHomeSafe",
              }}
            >
              Source Code
            </Link>
            <Link to="https://www.figma.com/proto/HQ3pqTTEgOCHoUBwUnG4oa/559-Presentation?node-id=112-1355&starting-point-node-id=112%3A1355">
              Figma Overview
            </Link>
          </CardActions>
        </Card>
        <Card sx={{ width: 450, height: 500 }}>
          <CardMedia
            component="img"
            height="250"
            sx={{ objectFit: "contain", height: 250 }}
            image={GetHomeSafeLogo}
            title="Match Aid"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Match Aid
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              An app that provides a reliable way to monitor friends' safety and
              confirm their safe arrival home from outings, especially in
              situations where walking alone or using ride shares feels unsafe.
              By addressing the lack of an effective solution, it ensures peace
              of mind by keeping trusted contacts informed in real-time.
              <br />
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            
            <Link
              to={{
                pathname: "https://github.com/19priyanka/CPSC481_BrainyBees",
              }}
            >
              Source Code
                      </Link>
                      <Link
              to="https://youtu.be/qqGJYLxnbPc"
            >
              Youtube Video
            </Link>
          </CardActions>
        </Card>
        <Grid item xs={4} md={4} lg={4}>
          <div> VR HaptoSkin</div>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <div> neural networks</div>
        </Grid>
      </Grid>
    </Box>
  );
}
