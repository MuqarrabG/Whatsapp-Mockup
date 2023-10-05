import React, { useState } from "react";
import SignupPage from "./signupPage.js";
import randomService from "./../services/randomService.js";

function HomePage() {
  //const data = randomService.getRandomUsers();
  //console.log(data);
  return (
    <div class="grid grid-cols-3 divide-x">
      <div>01</div>
      <div>{SignupPage}</div>
      <div>03</div>
    </div>
  );
}

export default HomePage;
