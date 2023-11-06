import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import banner from '../banner.svg'
import axios, { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import axiosInstance from '../helpers/authentication'


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: '',
    password: '',
  })

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
    const url = '/auth/register'

    try {
      const response = await axiosInstance.post(url, { ...formData })
      if (response.status === 201) {
        setFormData({
          name: '',
          email: '',
          id: '',
          password: '',
        })

        const userToken = response.data.user
        if (response.data.user) {
          localStorage.setItem('token', userToken)
        }

        window.location.href = '/login'

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
        flexDirection="column"
        alignItems="center"
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
            <span style={{ borderBottom: '5px solid black' }}>Sign Up</span>
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
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
                  label="UTS ID"
                  name="id"
                  value={formData.id}
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
              Sign Up
            </Button>
          </form>
          <div style={{ margin: '1rem' }}>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default Register
