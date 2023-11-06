import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import banner from '../banner.svg'
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../helpers/authentication'

export default function PasswordReset() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const [linkValid, setLinkValid] = useState('')

  const [success, setSuccess] = useState('')

  const [error, setError] = useState('')

  const { userId, token } = useParams()

  const [formVisible, setFormVisible] = useState(true);


  useEffect(() => {
    const url = `/auth/reset-password/${userId}/${token}`

    axiosInstance
      .get(url)
      .then((res) => setLinkValid(res.data.message))
      .catch((err) => setError(error))
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Password does not match')
      return
    }

    const url = `/auth/reset-password/${userId}/${token}`

    try {
      const response = await axiosInstance.post(url, { ...formData })

      if (response.status === 200) {
        setError('')
        setFormData({
          password: '',
          confirmPassword: '',
        })
        setSuccess(response.data.message)
        setFormVisible(false) // Hides the password reset form

        setTimeout(() => {
          // Redirect to the login page after a successful reset
          window.location.href = '/login';
        }, 2000); // Delay for 2 seconds (2000 milliseconds)
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
          {linkValid !== 'Valid Url' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h2>Reset Link Expired</h2>
                <p>
                  The reset link has expired. Please sign in or sign up to
                  request a new reset link.
                </p>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    style={{
                      margin: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#1976D2',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    style={{
                      margin: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#1976D2',
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Typography
                variant="h3"
                style={{
                  marginBottom: '4rem',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                <span style={{ borderBottom: '5px solid black' }}>
                  New Password
                </span>
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="New Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
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
                  Confirm
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
            </>
          )}
        </div>
      </Box>
    </Box>
  )
}
