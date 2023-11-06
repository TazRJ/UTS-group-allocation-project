import React from 'react'
import { Box, Typography } from '@mui/material'
import Container from './Container'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}

function NotInScope() {
  return (
    <Container>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h4" color="textSecondary">
          This page is not in scope, go back
        </Typography>
      </Box>
    </Container>
  )
}

export default NotInScope
