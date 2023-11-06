import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../helpers/authProvider'
import { Button } from '@mui/material'

export default function Container({ children }: any) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleReturn = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }, [])

  return (
    <div>
      <Navbar />
      {location.pathname !== '/' && (
        <div style={{display: 'flex', marginRight: '1.5rem', justifyContent: 'right'}}>
          {/* <Button
            variant="contained"
            onClick={handleReturn}
            sx={{
              background: '#FAF1F1',
              borderRadius: '10px', 
              textTransform: 'none',
              color: 'black',
              '&:hover': {
                backgroundColor: '#bfb5b5',
              },
            }}
          >
            Back
          </Button> */}
        </div>
      )}

      {children}
    </div>
  )
}
