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
import './Preferences.css'

export default function PreferenceSelectionModal({
  subject,
  closeDialog,
  handleInputChange,
}: any) {
  const [selections, setSelections] = useState(['', '', ''])
  const [error, setError] = useState('')

  const initialOptions = [
    'Nexus Infrastructure',
    'CPB Contractors',
    'John Holland',
    'Watpac Limited Australia',
  ];

  const [availableOptions, setAvailableOptions] = useState([
    initialOptions,
    initialOptions,
    initialOptions,
  ]);
    
  const handleChoiceChange = (
    event: SelectChangeEvent<string>,
    index: number,
  ) => {
    const newSelections = [...selections]
    const prevSelection = newSelections[index]
    newSelections[index] = event.target.value
    setSelections(newSelections);

    // Update available options for all choices
    const newAvailableOptions = availableOptions.map((options, i) =>
      i === index
        ? options
        : options.filter((option) => option !== event.target.value).concat(prevSelection ? [prevSelection] : []) 
    );

    // If the previous selection is not in the initial options, add it back
    if (prevSelection && !initialOptions.includes(prevSelection)) {
      newAvailableOptions.forEach(options => {
        if (!options.includes(prevSelection)) {
          options.push(prevSelection);
        }
      });
    }
    
    setAvailableOptions(newAvailableOptions)
  }

  const choiceLabels = ['First Choice', 'Second Choice', 'Third Choice']

  const handSubmit = () => {
    for (let i = 0; i < selections.length; i++) {
      const selection = selections[i]
      if (!selection) {
        setError(`Please make a selection for ${choiceLabels[i]}`)
        return
      }
    }
    setError('')
    handleInputChange('preferences', selections);
    closeDialog('preference')
  }

  return (
    <div>
      <Dialog
        open={true}
        sx={{
          borderRadius: '30px',
          padding: '2rem',
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {subject} Preference Selection
          <IconButton
            edge="end"
            color="error"
            onClick={() => closeDialog('preference')}
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
              <Typography variant="subtitle1" >{label}</Typography>
              <InputLabel sx={{ marginTop: '2rem' }}>Select Choice</InputLabel>
              <Select
                key={availableOptions[index].join(',')} // add a key that changes when the available options change
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
                {availableOptions[index].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
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
