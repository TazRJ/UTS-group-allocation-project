import React from 'react'
import { Grid, Typography, Paper, Box } from '@mui/material'
import homePageBanner from '../homePageBanner.svg'

export default function TopBanner() {
  return (
    <Box
      sx={{
        margin: '1.5rem',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
        },
        color: 'white',
      }}
    >
      <Box sx={{ flex: '1', background: '#4946CE', padding: '1.5rem' }}>
        <Typography variant="body1">
          <h3>UTS ranked in the top 100 universities worldwide</h3>
          <p>
            UTS continues its climb up the QS global rankings to affirm its
            reputation as a leading university.
          </p>
        </Typography>
      </Box>
      <Box sx={{ flex: '2', display: 'flex', alignItems: 'center' }}>
        <img
          src={homePageBanner}
          alt="home page banner"
          style={{ width: '100%' }}
        />
      </Box>
      <Box sx={{ flex: '1', background: '#4946CE', padding: '2.5rem' }}>
        <Typography variant="body1">
          Elevating Student Experience with Cutting-Edge Grouping System:
          Tailoring Teams Through Preferences for an Enhanced Collaborative
          Journey and Developing the Next Generation of Team Collaboration
        </Typography>
      </Box>
    </Box>
  )
}
