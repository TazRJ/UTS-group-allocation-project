import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { Typography } from '@mui/material'

export default function ConfirmationDialog({autoFill, handleCreateGroup, setConfirm}:any) {
  const [size, setSize] = useState<number>(0)
  const [error, setError] = useState('')

  const confirmSize = () => {
    if (size < 2) {
      setError('Group size needs to be greater than 2')
      return
    }
   
    handleCreateGroup(size)
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setSize(newSize);
    setError('');
  }

  return (
    <div>
      <Dialog open={true} fullWidth={true} maxWidth="sm">
        <DialogTitle>Confirm Group Size</DialogTitle>
        {error && (
          <Typography color="red" align="center">
            <small>{error}</small>
          </Typography>
        )}

        <DialogContent>
          <DialogContentText>How many students per group?</DialogContentText>
          <TextField
            autoFocus
            onChange={handleSizeChange}
            margin="dense"
            id="name"
            label="Student group size"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={()=>{
            setConfirm(false)
            autoFill({ preference: false, random: false })}}
          >
            Cancel
          </Button>
          <Button onClick={confirmSize}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
