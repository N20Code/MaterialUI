import React from 'react'

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from '@material-ui/core'

import { DeleteOutline } from '@material-ui/icons'

import { blue, green, pink, yellow } from '@material-ui/core/colors'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      switch(note.category) {
        case 'work':
          return yellow[700]
        case 'money':
          return green[500]
        case 'todos':
          return pink[500]
        default:
          return blue[500]
      }
    }
  }
})

export default function({ note, handleDelete }) {
  const classes = useStyles(note)

  return (
    <div>
      <Card elevation = { 1 } className = { classes.test }>
        <CardHeader
          avatar = {
            <Avatar className = { classes.avatar }>
              { note.category[0].toUpperCase() }
            </Avatar>
          }
          title = { note.title }
          subheader = { note.category }
          action = {
            <IconButton onClick = { () => handleDelete(note.id) }>
              <DeleteOutline />
            </IconButton>
          }
        />

        <CardContent>
          <Typography variant = 'body2' color = 'textSecondary'>
            { note.details }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
