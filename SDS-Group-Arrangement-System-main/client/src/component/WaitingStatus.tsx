import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
} from '@mui/material'
import React, { useState, useEffect } from 'react'

export default function WaitingStatus() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
      )
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #000000',
          height: '50vh',
          padding: '6rem',
          background: '#EFEFEF',
          borderRadius: '30px',
        }}
      >
        <Typography variant="h5" style={{ marginTop: '1rem' }}>
          Waiting to be placed in a group...
        </Typography>
        <Box sx={{ width: '100%', padding: '4rem' }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: '36px',
              background: '#EFEFEF',
              border: '1px solid #000000',
              marginTop: '80px',
              borderRadius: '30px',
              '& .css-5xe99f-MuiLinearProgress-bar1': {
                backgroundColor: '#6A5B5B',
              },
            }}
          />
        </Box>

        {/* <CircularProgress
           size={100}
           sx={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             marginTop: '-70px',
             marginLeft: '-50px',
           }}
         /> */}
      </Box>
    </Box>
  )
}
