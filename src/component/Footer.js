import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'text.secondary', color: 'white', p: 6 }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Section 1
            </Typography>
            <ul>
              <li>
                <Typography variant="subtitle1" color="inherit">
                  Link 1
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1" color="inherit">
                  Link 2
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Section 2
            </Typography>
            <ul>
              <li>
                <Typography variant="subtitle1" color="inherit">
                  Link 3
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle1" color="inherit">
                  Link 4
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Section 3
            </Typography>
            <Typography variant="subtitle1" color="inherit" gutterBottom>
              Some more detailed text can go here. This section can be used for additional information.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;