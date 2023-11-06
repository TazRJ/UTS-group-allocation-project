import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import uts from './../uts.svg'
import { Button, Grid } from '@mui/material'
import { useAuth } from '../helpers/authProvider'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar
        sx={{
          minHeight: 20,
          height: 120,
          backgroundColor: '#fff',
          // paddingBottom: '1rem',
          color: 'black',
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: '10px solid black',
          }}
        >
          <Grid item>
            <Link href="/">
              <img
                src={uts}
                alt="Logo"
                style={{ height: 60, marginLeft: -20 }}
              />
            </Link>
          </Grid>
          <Grid item sx={{display: 'flex', gap: '0.5em', alignItems: 'center' }}>
            <h4
              // variant="h6"
              // sx={{ textAlign: 'right', color: 'black' }}
              style={{textAlign: 'end'}}
            >
              {user && user.name}
              <br />
              {user && user.UTS_Id
                ? user.UTS_Id
                : user && user.id
                ? user.id
                : null}
              <br />
            </h4>
            <Button
            size='small'
              variant="contained"
              onClick={() => {
                logout()
              }}
              sx={{
                background: 'gray',
                // borderRadius: '20px',
                boxShadow: 'none',
                height: 'fit-content',
                textTransform: 'none',
                color: 'white',
                '&:hover': {
                  background: 'gray',
                },
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
