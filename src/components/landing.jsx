import React from 'react';
import "../sss.css"
import  feath from "../images/feather-15-white.svg";
import feath2 from "../images/feather2-17-white.svg";
import magn from "../images/magnifier-2.svg";
import { Link } from 'react-router-dom';

const Landing = () =>
  <div>
    <div className="hero-section centered">
      <div data-ix="new-interaction" className="w-container">
        <h1 data-ix="fade-in-bottom-page-loads" className="hero-heading"> J Percy Page Scavenger Hunt</h1>
        <div data-ix="fade-in-bottom-page-loads"><Link to="/signin" className="button">Join Now</Link><a href="https://en.wikipedia.org/wiki/Scavenger_hunt" className="hollow-button all-caps">Learn more</a></div>
      </div>
    </div>
    <div className="section">
      <div className="w-container">
        <div className="section-title-group">
          <h2 className="section-heading centered">PLAYING THE GAME</h2>
        
        </div>
        <div className="w-row">
          <div className="w-col w-col-4">
            <div className="white-box"><img src={magn} width="210" className="grid-image"/>
              <h3>Find The Thing</h3>
              <p>Using the clue and your brains, find the item that the clue refers to. You may be creative in your interpretations of the clue and if you get stuck, you may use a hint.</p>
            </div>
          </div>
          <div className="w-col w-col-4">
            <div className="white-box"><img src={feath2} width="210" className="grid-image"/>
              <h3>Take a Picture</h3>
              <p>Take a picture of what the clue asks you to find. Make sure your team&#x27;s picture is <strong>unique</strong></p>
            </div>
          </div>
          <div className="w-col w-col-4">
            <div className="white-box"><img src={feath}  width="210" className="grid-image"/>
              <h3>Be Quick</h3>
              <p>You only have <strong>70 minutes</strong> to find everything. You can split up and find things independently or work together. First to get em all, wins.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer center">
      <div className="w-container">
        <div className="footer-text">Made by Qasim </div>
      </div>
    </div>
  </div>

  
  
export default Landing;