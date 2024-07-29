import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function NavigationBar() {
  return (
    <AppBar position="static" style={{ backgroundColor: '#405D72', margin:'0' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Priyanka Gautam
        </Typography>
        <Box style={{marginLeft:'500px'}}>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Case Studies</Button>
        <Button color="inherit">Testimonials</Button>
        <Button color="inherit">Recent Work</Button>
        <Button color="inherit">Get In Touch</Button>
        </Box>
     
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" href="https://www.linkedin.com" target="_blank">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit" href="https://www.behance.net" target="_blank">
          <GitHubIcon />
        </IconButton>
        <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
          <EmailIcon />
        </IconButton>
        <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
          <LocalPhoneIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
