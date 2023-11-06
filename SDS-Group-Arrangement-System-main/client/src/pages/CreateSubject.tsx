import React, { useState } from 'react'
import Container from '../layout/Container'
import { Typography, TextField, Button, Box, Snackbar } from '@mui/material'
import axiosInstance from '../helpers/authentication'
import axios, { AxiosError } from 'axios'

export default function CreateSubject() {
  const [formData, setFormData] = useState({
    name: '',
    subjectNumber: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post('/subject/new', formData)


      setFormData({ name: '', subjectNumber: '' })
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
    <Container>
      <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', padding: 2 }}>
        <Typography variant="h4">Create Subject</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Subject Number"
            variant="outlined"
            id="subjectNumber"
            name="subjectNumber"
            value={formData.subjectNumber}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Create Subject
          </Button>
        </form>
        {error && (
          <Typography
            color="error"
            variant="body2"
            style={{ marginTop: '1rem' }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  )
}
