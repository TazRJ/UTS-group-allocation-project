import React, { useState } from 'react'
import {
  FormControl,
  Button,
  Box,
  StepLabel,
  List,
  ListItem,
} from '@mui/material'
import PreferenceSelectionModal from './PreferenceSelectionModal'
import InterestSelectionModal from './InterestSelectionModal'
import CapabilitySelectionModal from './CapabilitySelectionModal'
import BackgroundSelectionModal from './BackgroundSelectionModal'
import axiosInstance from '../../helpers/authentication'
import { useAuth } from '../../helpers/authProvider'

export default function TopicSelectionForm({ number }: any) {
  const [formValues, setFormValues] = useState({
    preferences: [],
    background: [],
    interests: [],
    capabilities: [],
  })
  const [showDialog, setShowDialog] = useState({
    preference: false,
    interest: false,
    capability: false,
    background: false,
  })
  const [error, setError] = useState('');

  const { user } = useAuth()

  const handleInputChange = (name: any, value: any) => {
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); 
  
    if (
      formValues.preferences.length === 0 ||
      formValues.background.length === 0 ||
      formValues.interests.length === 0 ||
      formValues.capabilities.length === 0
    ) {
        setError('Please fill in all the fields before submitting.');
    } else {
      try {
        const res = await axiosInstance.post(
          `/selection/${number}/${user.UTS_Id}`,
          formValues
        );
  
        if (res.status === 200) {
          setFormValues({
            preferences: [],
            background: [],
            interests: [],
            capabilities: [],
          });
          window.location.reload();
        }
      } catch (error) {
        setError('Error submitting the form. Please try again.');
      }
    }
  };
  

  const closeDialog = (step: any) => {
    setShowDialog({
      ...showDialog,
      [step]: false,
    })
  }

  return (
    <Box
      sx={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
        },
        borderRadius: '30px',
        background: '#E1E1E1',
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%', flex: '1' }}>
        <FormControl
          sx={{
            width: '100%',
            alignItems: {
              xs: 'center',
              sm: 'center',
              md: 'flex-start',
            },
            padding: {
              xs: 'none',
              sm: 'none',
              md: '4rem',
            },
          }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <StepLabel
              style={{
                fontFamily: 'Montserrat',
                fontWeight: '500',
                fontSize: '18px',
              }}
            >
              Select Your Project
            </StepLabel>
            <Button
              sx={{
                marginTop: '1rem',
                background: '#C0D6C0',
                color: '#F9F9F9',
                borderRadius: '20px',
                width: '130px',
                '&:hover': {
                  backgroundColor: '#bfb5b5',
                },
                display: 'block',
              }}
              onClick={() => setShowDialog({ ...showDialog, preference: true })}
            >
              Start
            </Button>
          </div>
          <div style={{ marginBottom: '3rem' }}>
            <StepLabel
              style={{
                fontFamily: 'Montserrat',
                fontWeight: '500',
                fontSize: '18px',
              }}
            >
              Select Your Background
            </StepLabel>
            <Button
              sx={{
                marginTop: '1rem',
                background: '#C0D6C0',
                color: '#F9F9F9',
                borderRadius: '20px',
                width: '130px',
                '&:hover': {
                  backgroundColor: '#bfb5b5',
                },
                display: 'block',
              }}
              onClick={() => setShowDialog({ ...showDialog, background: true })}
            >
              Start
            </Button>
          </div>
          <div style={{ marginBottom: '3rem' }}>
            <StepLabel
              style={{
                fontFamily: 'Montserrat',
                fontWeight: '500',
                fontSize: '18px',
              }}
            >
              Select Your Interests
            </StepLabel>
            <Button
              sx={{
                marginTop: '1rem',
                background: '#C0D6C0',
                color: '#F9F9F9',
                borderRadius: '20px',
                width: '130px',
                '&:hover': {
                  backgroundColor: '#bfb5b5',
                },
                display: 'block',
              }}
              onClick={() => setShowDialog({ ...showDialog, interest: true })}
            >
              Start
            </Button>
          </div>
          <div style={{ marginBottom: '3rem' }}>
            <StepLabel
              style={{
                fontFamily: 'Montserrat',
                fontWeight: '500',
                fontSize: '18px',
              }}
            >
              Select Your Capabilities
            </StepLabel>
            <Button
              sx={{
                marginTop: '1rem',
                background: '#C0D6C0',
                color: '#F9F9F9',
                borderRadius: '20px',
                width: '130px',
                '&:hover': {
                  backgroundColor: '#bfb5b5',
                },
                display: 'block',
              }}
              onClick={() => setShowDialog({ ...showDialog, capability: true })}
            >
              Start
            </Button>
          </div>
        </FormControl>
      </form>
      <Box
        sx={{
          flex: '1',
          padding: {
            md: '2rem',
          },
          paddingLeft: 'none',
        }}
      >
        <Box
          sx={{
            padding: '1rem',
            background: '#E4E2F1',
            borderRadius: '30px',
            alignItems: 'flex-start',
          }}
        >
          <h3>Selections</h3>
          <p>
            To complete the form, select your preferences by clicking on the buttons on the left. Ensure all preferences are chosen, review the form, and click "Submit" to finalize your choices.</p>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {formValues.preferences.length > 0 && (
              <List sx={{ textAlign: 'start' }}>
                <h4 style={{ padding: '0px', margin: '0px' }}>Topic Selections</h4>
                {formValues.preferences.map((preference, index) => (
                  <ListItem key={index} component="li">
                    <strong>{index + 1}. </strong>
                    {preference}
                  </ListItem>
                ))}
              </List>
            )}
            {formValues.background.length > 0 && (
              <List sx={{ textAlign: 'start' }}>
                <h4 style={{ padding: '0px', margin: '0px' }}>Background</h4>
                {formValues.background.map((bg, index) => (
                  <ListItem key={index} component="li">
                    <strong>{index + 1}. </strong>
                    {bg}
                  </ListItem>
                ))}
              </List>
            )}
            {formValues.interests.length > 0 && (
              <List sx={{ textAlign: 'start' }}>
                <h4 style={{ padding: '0px', margin: '0px' }}>Interests</h4>
                {formValues.interests.map((interest, index) => (
                  <ListItem key={index} component="li">
                    <strong>{index + 1}. </strong>
                    {interest}
                  </ListItem>
                ))}
              </List>
            )}
            {formValues.capabilities.length > 0 && (
              <List sx={{ textAlign: 'start' }}>
                <h4 style={{ padding: '0px', margin: '0px' }}>Capabilities</h4>
                {formValues.capabilities.map((capability, index) => (
                  <ListItem key={index} component="li">
                    <strong>{index + 1}. </strong>
                    {capability}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          {formValues.preferences.length > 0 ||
          formValues.background.length > 0 ||
          formValues.capabilities.length > 0 ||
          formValues.interests.length > 0 ? null : (
            <p>Make a selection</p>
          )}
        </Box>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      {showDialog && showDialog.preference && (
        <PreferenceSelectionModal
          subject={number}
          closeDialog={closeDialog}
          handleInputChange={handleInputChange}
        />
      )}
      {showDialog && showDialog.background && (
        <BackgroundSelectionModal
          subject={number}
          closeDialog={closeDialog}
          handleInputChange={handleInputChange}
        />
      )}
      {showDialog && showDialog.interest && (
        <InterestSelectionModal
          subject={number}
          closeDialog={closeDialog}
          handleInputChange={handleInputChange}
        />
      )}
      {showDialog && showDialog.capability && (
        <CapabilitySelectionModal
          subject={number}
          closeDialog={closeDialog}
          handleInputChange={handleInputChange}
        />
      )}
    </Box>
  )
}
