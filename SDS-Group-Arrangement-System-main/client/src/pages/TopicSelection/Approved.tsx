import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material'
import axiosInstance from '../../helpers/authentication'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../helpers/authProvider'

export default function Approved({ group }: any) {
  const [show, setShow] = useState(false)
  const { number } = useParams()
  const { user } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(-1)

  const handleOpen = (index: number) => setOpen(index)
  
  const handleClose = () => setOpen(-1)

  const requestLeave = async () => {
    try {
      const result = await axiosInstance.post('/groups/request-leave', {
        subjectNumber: number,
        UTS_Id: user.UTS_Id,
      })
      if (result.status === 200) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        window.location.reload()

        }, 2000)
        handleCloseDialog()
      }
    } catch (e) {
      const error = e as Error; 
      setError(error.message)
    }
  }

  const cancelRequestLeave = async () => {
    try {
      const result = await axiosInstance.post('/groups/request-leave/cancel', {
        subjectNumber: number,
        UTS_Id: user.UTS_Id,
      })
      if (result.status === 200) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
        window.location.reload()
        // handleCloseDialog()
      }
    } catch (e) {
      const error = e as Error; 
      setError(error.message)
    }
  }

  const handleCloseDialog = () => {
    setShow(false)
  }

  console.log(group)

  return (
    <>
      <Box>
        <Box
          sx={{
            background: '#E2E2E2',
            color: 'black',
            borderRadius: '30px',
            padding: '1rem',
            margin: 'auto',
            marginBottom: '2rem',
            minHeight: '100px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>Group: {group && group.groupName}</Typography>
            {group.studentLeaveRequest && group.studentLeaveRequest.requestLeave ? (
              <Button
                sx={{
                  background: '#EF2F2F',
                  color: 'white',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#EF2F2F',
                  },
                }}
                size="small"
                onClick={cancelRequestLeave}
              >
                Cancel leave request
              </Button>
            ) : (
              <Button
                sx={{
                  background: '#EF2F2F',
                  color: 'white',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#EF2F2F',
                  },
                }}
                size="small"
                onClick={() => setShow(true)}
              >
                Leave
              </Button>
            )}
          </Box>
          <Typography
            align="left"
            sx={{ color: '#726D6D', marginBottom: '2rem' }}
          >
            Topic: Nexus Infrastructure
          </Typography>

          <Typography align="left">Member List</Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              background: '#EFEFEF',
              width: '60%',
              margin: 'auto',
              padding: '3rem',
              borderRadius: '30px',
              border: '2px solid #c5baba',
              marginBottom: '4rem',
            }}
          >
            {group &&
              group.studentGroup.map((student: any, index: number) => (
                <React.Fragment key={student._id}>
                  <Typography
                    sx={{
                      color: 'black',
                      borderRadius: '30px',
                      textTransform: 'none',
                      marginBottom: '1rem',
                      width: '40%',
                    }}
                  >
                     <Tooltip
                  key={student._id}
                  title={<Typography>{student.email}</Typography>}
                  open={open === index}
                  onOpen={() => handleOpen(index)}
                  onClose={handleClose}
                  placement="top"
                  arrow
                >
                  <Box
                    sx={{
                      background: '#E2E2E2',

                      color: 'black',

                      borderRadius: '30px',

                      padding: '1rem',

                      minWidth: '100px',
                    }}
                  >
                    {student.name}
                  </Box>
                </Tooltip>

                  </Typography>
                </React.Fragment>
              ))}
          </Box>
        </Box>
      </Box>

      <Dialog
        open={show}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are requesting to leave the current group.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={requestLeave}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <div style={{ background: 'red', color: 'white', padding: '10px' }}>
          {error}
        </div>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <div style={{ background: 'green', color: 'white', padding: '10px' }}>
          Request submitted successfully!
        </div>
      </Snackbar>
    </>
  )
}
