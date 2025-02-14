import * as React from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import BrainyBeesLogo from "../BrainyBeesLogo.png";
import GetHomeSafeLogo from "../GetHomeSafeLogo.png";
import MatchAidLogo from "../MatchAidLogo.png";
import VRLogo from "../VRLogo.png";
import MachineLearningLogo from "../MachineLearningLogo.png";

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
        container
        spacing={4} 
        sx={{
          flexGrow: 1,
          backgroundColor: "#758694",
          justifyContent: "center", 
          padding: 4, 
        }}
      >
        {[
          {
            logo: BrainyBeesLogo,
            alt: "BrainyBees",
            title: "Brainy Bees",
            description:
              "A website designed to teach coding to students in grades 5-9, catering to diverse learning styles such as visual, auditory, interactive, and hands-on approaches. It provides games, videos, quizzes, and coding challenges to support beginners, intermediates, and advanced users.",
            links: [
              { text: "Website", href: "https://spontaneous-tulumba-bb55aa.netlify.app/" },
              { text: "Source Code", href: "https://github.com/19priyanka/CPSC481_BrainyBees" },
              { text: "Youtube Video", href: "https://youtu.be/yJtHYlctFEg" },
            ],
          },
          {
            logo: GetHomeSafeLogo,
            alt: "gethomesafe",
            title: "Get Home Safe",
            description:
              "An app that provides a reliable way to monitor friends' safety and confirm their safe arrival home from outings, ensuring peace of mind in scenarios where walking alone or using ride shares feels unsafe.",
            links: [
              { text: "Source Code", href: "https://github.com/19priyanka/GetHomeSafe" },
              {
                text: "Figma Overview",
                href: "https://www.figma.com/proto/HQ3pqTTEgOCHoUBwUnG4oa/559-Presentation?node-id=112-1355&starting-point-node-id=112%3A1355",
              },
            ],
          },
          {
            logo: MatchAidLogo,
            alt: "matchaid",
            title: "Match Aid",
            description:
              "A centralized platform connecting volunteers and organizations, making it easy to find opportunities based on interests and location while ensuring accountability through feedback and reporting. Empowering communities by bridging the volunteer gap.",
            links: [
              { text: "Source Code", href: "https://github.com/19priyanka/MatchAid" },
              { text: "Youtube Video", href: "https://www.youtube.com/watch?v=qqGJYLxnbPc" },
                  { text: "Figma Overview", href: "https://www.figma.com/design/aiwWQoBjliScRLP4StmSXu/Volunteer-v2?node-id=2103-2&p=f&t=7ZSYt8MrYHypvBtV-0" },
              {
                text: "Presentation",
                href: "https://docs.google.com/presentation/d/1zTdt8UEbLen7Cvina28zZfCKMoFrYMv25MS2jh9E0Ko/edit?usp=sharing",
              },
            ],
          },
          {
            logo: VRLogo,
            alt: "vr",
            title: "VR-HaptoSkin-Pro-VR-LayerSense",
            description:
              "A VR-based medical training tool designed to enhance the accuracy of needle placement through realistic simulations of human skin layers. By integrating haptic feedback, this project compares consistent feedback (HaptoSkin Pro) and variable feedback (LayerSense Precision) to improve precision in medical procedures.",
            links: [
              {
                text: "Source Code",
                href: "https://github.com/19priyanka/VR-HaptoSkin-Pro-VR-LayerSense-?tab=readme-ov-file",
              },
            ],
          },
          {
            logo: MachineLearningLogo,
            alt: "Machine Learning",
            title: "Machine Learning Models for Handwritten Digit Recognition",
            description:
              "This project predicts handwritten digits using the MNIST dataset. It explores Random Forest Classifier, SVM, and CNN models, comparing their complexity, performance, and efficiency. Results show CNN as the most accurate.",
            links: [
              {
                text: "Source Code",
                href: "https://drive.google.com/drive/u/1/folders/1zQDmYtzk8F0WWuujj_U748AwjGLm4SZn",
              },
              { text: "Youtube Video", href: "https://youtu.be/TbAjnlTfCkQ" },
              {
                text: "Presentation",
                href: "https://docs.google.com/presentation/d/1bmzTm12OP0q0MxjytglE7glLdmweB-QqjSU-5Kh86Wc/edit?usp=sharing",
              },
            ],
          },
        ].map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ height: "100%", padding: 2 }}>
              <img
                src={project.logo}
                alt={project.alt}
                style={{
                  width: "100%",
                  objectFit: "contain",
                  height: 250,
                }}
              />
                    <Typography gutterBottom variant="h5" component="div">
                        <br></br>
                {project.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                {project.description}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {project.links.map((link, idx) => (
                  <Link to={link.href} key={idx}>
                    {link.text}
                  </Link>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
