import React, {useState, useEffect} from 'react';
import axios from "axios";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolBar: {
    backgroundColor: `#F2F2F2`,
    color: `black`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function SearchAppBar() {
  const classes = useStyles();
  const [follower, setFollower] = useState([]);
  const [query, setQuery] = useState('');

useEffect(()=>{
    axios
        .get(`https://api.github.com/users/seanaleid/followers`)
        .then(res=>{
            console.log(`SearchBar axios result`, res);
            const followerUsername = res.data;
            console.log(`followerUsername console.log`, followerUsername);

            const login = followerUsername.filter(follower =>
                follower.login.toLowerCase().includes(query.toLowerCase())
            );
             console.log(`Console.log login`, login);
             console.log(`Console.log follower state`, follower);
             setFollower(login);
        })
        .catch(err=>{
            console.log(`error`)
        })
}, [query]);

const handleInputChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };

const submitSearch = event => {
    console.log(`submit search console.log`, event.target);
    event.preventDefault();
    event.target.setFollower(event);
    setFollower('');
}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Zacks Github
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
              onSubmit={submitSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default SearchAppBar;