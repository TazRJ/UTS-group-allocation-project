import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import banner from '../banner.svg'
import { Link } from 'react-router-dom';
import axiosInstance from '../helpers/authentication';
import { useAuth } from '../helpers/authProvider'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { login } = useAuth(); 

  const [error, setError] = useState('')

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const url = '/auth/login'

    try {
      const response = await axiosInstance.post(url, { ...formData })

      if (response.status === 200) {
        setFormData({
          email: '',
          password: '',
        })

        const userToken = response.data.user
        if (response.data.user) {
          
          login(userToken);

        }

        window.location.href = '/'
        setError('')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any, any>
        if (axiosError.response) {
          setError(axiosError.response.data.message)
        }
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <Box
        color="white"
        py={50}
        textAlign="center"
        sx={{
          width: '50%',
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        paddingLeft={20}
        paddingRight={20}
      >
        <div style={{ paddingLeft: '2rem' }}>
          <Typography
            variant="h3"
            style={{
              marginBottom: '4rem',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            <span style={{ borderBottom: '5px solid black' }}>Login</span>
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography
                color="error"
                variant="body2"
                style={{ marginTop: '1rem' }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Sign In
            </Button>
          </form>

          <div
            style={{
              margin: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/register">Sign Up</Link>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </div>
      </Box>
    </Box>
  )
}
