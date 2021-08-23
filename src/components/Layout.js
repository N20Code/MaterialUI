import React from 'react'

import { useHistory, useLocation } from 'react-router'

import {
  AppBar,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core'

import { SubjectOutlined, AddCircleOutlineOutlined } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core'

import { format } from 'date-fns'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: 'flex'
    },
    active: {
      backgroundColor: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2)
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1
    },
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})

export default function({ children }) {
  const history = useHistory()
  const location = useLocation()

  const classes = useStyles()

  const menuItem = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color = 'secondary' />,
      path: '/'
    },
    {
      text: 'Create A Note',
      icon: <AddCircleOutlineOutlined color = 'secondary' />,
      path: '/create'
    }
  ]

  return (
    <div className = { classes.root }>
      <AppBar
        className = { classes.appBar }
        elevation = { 0 }
      >
        <Toolbar>
          <Typography className = { classes.date }>
            Today is the { format(new Date(), 'do MMMM Y') }
          </Typography>

          <Typography>
            Mario
          </Typography>

          <Avatar
            src = '/mario-av.png'
            className = { classes.avatar }
          />
        </Toolbar>
      </AppBar>

      <Drawer
        className = { classes.drawer }
        variant = 'permanent'
        anchor = 'left'
        classes = { { paper: classes.drawerPaper } }
      >
        <div>
          <Typography
            variant = 'h5'
            className = { classes.title }
          >
            Test Notes
          </Typography>
        </div>

        <List>
          { menuItem.map(item => (
            <ListItem
              button
              className = { location.pathname == item.path ? classes.active : null }
              key = { item.text }
              onClick = { () =>  history.push(item.path)}
            >
              <ListItemIcon>{ item.icon }</ListItemIcon>
              <ListItemText primary = { item.text } />
            </ListItem>
          )) }
        </List>

      </Drawer>

      <div className = { classes.page }>
        <div className = { classes.toolbar }></div>
        { children }
      </div>
    </div>
  )
}
