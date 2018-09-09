import React from 'react';
import Typography from '@material-ui/core/Typography';

const Landing = () =>
  <div style={{maxWidth:"300", marginLeft:20, paddingTop:"20px"}}>
    <Typography variant="headline">Welcome to the J Percy Page Scavenger Hunt</Typography>
    <br/>
    <Typography variant="body1">
    To get started, please log in with your schoolzone(share.epsb.ca) email.
    </Typography>
    
    <Typography variant="body1">Once you create an acount, join a team using your team's "secret code", or create a new team.
    </Typography>
    <br/>
    <Typography variant="title">Playing the game.</Typography>
    <br/>
    <Typography variant="body1">
      The rules are simple;<br/>
      Find the item using the clue and take a picture of it.<br/>  
      Your team earns points every time you complete a challenge.<br/>
      The team with the most points at the end wins.<br/>
      <br/>
      Good Luck!
    
    </Typography>
  </div>

export default Landing;