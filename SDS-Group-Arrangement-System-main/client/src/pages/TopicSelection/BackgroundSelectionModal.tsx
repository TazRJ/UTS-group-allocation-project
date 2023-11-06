import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Typography,
  IconButton,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function BackgroundSelectionModal({
  subject,
  closeDialog,
  handleInputChange,
}: any) {
  const [selections, setSelections] = useState([''])
  const [error, setError] = useState('')

  const handleChoiceChange = (
    event: SelectChangeEvent<string>,
    index: number,
  ) => {
    const newSelections = [...selections]
    newSelections[index] = event.target.value
    setSelections(newSelections)
  }

  const choiceLabels = ['Choices']

  const handSubmit = () => {
    for (let i = 0; i < selections.length; i++) {
      const selection = selections[i]
      if (!selection) {
        setError(`Please make a selection`)
        return
      }
    }
    setError('')
    handleInputChange('background', selections);
    closeDialog('background')
  }

  return (
    <div>
      <Dialog open={true} sx={{ padding: '2rem' }}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {subject} Background Selection
          <IconButton
            edge="end"
            color="error"
            onClick={() => closeDialog('background')}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{textAlign:'center'}}
          >
            {error}
          </Typography>
        )}
        <DialogContent sx={{ width: { md: '340px' }, padding: { md: '3rem' } }}>
          {choiceLabels.map((label, index) => (
            <FormControl key={label} fullWidth sx={{ marginBottom: '2rem' }}>
              <Typography variant="subtitle1">{label}</Typography>
              <InputLabel sx={{ marginTop: '2rem' }}>Select Choice</InputLabel>
              <Select
                value={selections[index]}
                label="Select Choice"
                onChange={(event) => handleChoiceChange(event, index)}
                sx={{
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                  border: 'none',
                  '&:hover': {
                    border: 'none',
                  },
                }}
              >
                {/* <MenuItem value="">Select Choice</MenuItem> */}
                <MenuItem value="Civil Engineering">
                  Civil Engineering
                </MenuItem>
                <MenuItem value="Biomedical Engineering">Biomedical Engineering</MenuItem>
                <MenuItem value="Software Engineering">Software Engineering</MenuItem>
                <MenuItem value="Mechatronics Engineering">Mechatronics Engineering</MenuItem>
                <MenuItem value="Electrical Engineering">
                  Electrical Engineering
                </MenuItem>
              </Select>
            </FormControl>
          ))}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handSubmit}
            sx={{
              background: '#69B068',
              color: '#F9F9F9',
              borderRadius: '20px',
              width: '102px',
              height: '34px',
              '&:hover': {
                backgroundColor: '#bfb5b5',
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
