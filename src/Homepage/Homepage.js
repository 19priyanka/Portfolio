import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import BrainyBees from "../Projects/BrainyBees/BrainyBees";
import Capstone from "../Projects/Capstone/Capstone";
import GetHomeSafe from "../Projects/GetHomeSafe/GetHomeSafe";

export default function Homepage() {
  return (
    <>
      {/* <h1>Homepage</h1> */}
      <AboutMe />
      <BrainyBees />
      <Capstone />
      <GetHomeSafe />
    </>
  );
}
