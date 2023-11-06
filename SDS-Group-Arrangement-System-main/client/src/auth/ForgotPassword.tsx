import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import banner from '../banner.svg'
import { Link } from 'react-router-dom'
import axiosInstance from '../helpers/authentication'

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  })
  const [success, setSuccess] = useState('')

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
    const url = '/auth/forgot-password'

    try {
      const response = await axiosInstance.post(url, { ...formData })
      if (response.status === 200) {
        setSuccess(response.data.message)
        setFormData({ email: '' })
        // Clears the error message
        setError('');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any, any>
        if (axiosError.response) {
          // Checks the response status and provide a custom error message
          if (axiosError.response.status === 404) {
            setError('Email not found. Please check your email address.');
          } else {
            setError(axiosError.response.data.message);
          }
          setSuccess(''); // Clears the success message
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
            <span style={{ borderBottom: '5px solid black' }}>
              Forgot Password
            </span>
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

            {success && (
              <Typography
                color="green"
                variant="body2"
                style={{ marginTop: '1rem' }}
              >
                {success}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Send Reset Link
            </Button>
          </form>

          <div
            style={{
              margin: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>
      </Box>
    </Box>
  )
}
