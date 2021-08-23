import React, { useState } from 'react'
import { useHistory } from 'react-router'

import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core'

import {
  makeStyles
} from '@material-ui/core'

import {
  KeyboardArrowRight
} from '@material-ui/icons'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function() {
  const history = useHistory()

  const classes = useStyles()

  const
    [title, setTitle] = useState(''),
    [titleError, setTitleError] = useState(false)
  const
    [details, setDetails] = useState(''),
    [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('todos')

  const handleSubmit = (e) => {
    e.preventDefault()

    setTitleError(false)
    setDetailsError(false)

    if(title == '') setTitleError(true)
    if(details == '') setDetailsError(true)

    if(!(title && details)) return

    fetch('http://localhost:8000/notes', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        details,
        category
      })
    }).then(() => history.push('/'))
  }

  return (
    <Container>
      <Typography
        variant = 'h6'
        color = 'textSecondary'
        component = 'h2'
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form
        autoComplete = 'off'
        onSubmit = { handleSubmit }
        noValidate
      >
        <TextField
          className = { classes.field }
          label = 'Note Title'
          variant = 'outlined'
          color = 'secondary'
          onChange = { (e) => setTitle(e.target.value) }
          error = { titleError }
          fullWidth
          required
        />

        <TextField
          className = { classes.field }
          label = 'Details'
          variant = 'outlined'
          color = 'secondary'
          multiline
          minRows = { 4 }
          onChange = { (e) => setDetails(e.target.value) }
          error = { detailsError }
          fullWidth
          required
        />
        <FormControl className = { classes.field }>
          <FormLabel>Note Category</FormLabel>
          
          <RadioGroup
            value = { category }
            onChange = { (e) => setCategory(e.target.value) }
          >
            <FormControlLabel
              value = 'money'
              control = { <Radio /> }
              label = 'Money'
            />

            <FormControlLabel
              value = 'todos'
              control = { <Radio /> }
              label = 'Todos'
            />

            <FormControlLabel
              value = 'reminders'
              control = { <Radio /> }
              label = 'Reminders'
            />

            <FormControlLabel
              value = 'work'
              control = { <Radio /> }
              label = 'Work'
            />
          </RadioGroup>
        </FormControl>
        
        <Button
          type = 'submit'
          variant = 'contained'
          color = 'secondary'
          endIcon = { <KeyboardArrowRight /> }
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}
