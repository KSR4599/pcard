import React, {useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createBrowserHistory } from "history";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PinterestIcon from '@material-ui/icons/Pinterest';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';
import "../styles.css";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SaveIcon from '@material-ui/icons/Save';
import VCard from 'vcard-creator'



const history = createBrowserHistory({ forceRefresh: true });

const faces = [
    "http://i.pravatar.cc/300?img=1"
  ];

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      alignItems:'left'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    gg:{
        width:'100%'
    },
    App:{
        height:'100%',
    },
    card: {
      maxWidth: 700,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    media: {
      paddingTop: "56.25%"
    },
    content: {
      textAlign: "left",
      padding: 10
    },
    heading: {
      fontWeight: "bold"
    },
    subheading: {
      lineHeight: 1.8
    },
    avatar: {
      display: "inline-block",
      border: "10px solid white",
      "&:not(:first-of-type)": {
        marginLeft: -12
      },
      width:'100px',
      height:'100px'
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }));

  function useMergeState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState => 
      setState(prevState => Object.assign({}, prevState, newState)
    );
    return [state, setMergedState];
  }

  export function MenuAppBar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className={classes.root}>
       
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              PRVYCARD
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                 
                  <MenuItem onClick={()=>history.push("/login")}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
                }

export default function SignUp() {
    const classes = useStyles();
    const [FullName,SetFullName] = useState('');
    const [Bio,SetBio] = useState('');
    const [Phone,SetPhone] = useState('');
    const [LinkedInState,SetLinkedInUName] = useMergeState({
      LinkedInUname: '',
      LinkedInDisable: true,
    });
    const [InstagramState,SetInstagramUName] = useMergeState({
      InstagramUName: '',
      InstagramDisable: true,
    });
    const [FacebookState,SetFacebookUName] = useMergeState({
      FacebookUName: '',
      FacebookDisable: true,
    });
    const [YoutubeState,SetYoutubeUName] = useMergeState({
      YoutubeUName: '',
      YoutubeDisable: true,
    });
    const [PinterestState,SetPinterestUName] = useMergeState({
      PinterestUName: '',
      PinterestDisable: true,
    });
    const [RedditState,SetRedditUName] = useMergeState({
      RedditUName: '',
      RedditDisable: true,
    });
    const [TwitterState,SetTwitterUName] = useMergeState({
      TwitterUName: '',
      TwitterDisable: true,
    });
  
    useEffect(() => {
      //similar to componentdidmount and componentdidupdate
     //get existing profile info from backend and fill the fields
      
    });
  
    function downloadVcardFile(){
        const myVCard = new VCard();
        var lastname = 'Desloovere'
var firstname = 'Jeroen'
var additional = ''
var prefix = ''
var suffix = ''
 
// add personal data
myVCard.addName(lastname, firstname, additional, prefix, suffix)
        myVCard.addCompany('Siesqo')
        myVCard.addJobtitle('Web Developer')
        myVCard.addRole('Data Protection Officer')
        myVCard.addEmail('info@jeroendesloovere.be')
        myVCard.addPhoneNumber(1234121212, 'PREF;WORK')
        myVCard.addPhoneNumber(123456789, 'WORK')
        myVCard.addAddress(null, null, 'street', 'worktown', null, 'workpostcode', 'Belgium')
        myVCard.addURL('http://www.jeroendesloovere.be')
         
        console.log(myVCard.toString())

        const FileSaver = require('file-saver');
const blob = new Blob([ myVCard.toString() ], {type: "text/vcard;charset=utf-8"});
FileSaver.saveAs(blob, "blob.vcf");
    };

    return (

        <div>
            <MenuAppBar/>
            <Container component="main" maxWidth="sm" >
      <CssBaseline />
      <br/>
      <br/>
      
        <Grid container={true} justify="center" style = {{width:600}}>
      <Grid item={true} >
      <div className={classes.App}>
        <Card className={classes.card}>
        <Avatar className={classes.avatar} key={faces} src={faces} />
          <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
              Sophia Kim
            </Typography>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"body2"}>
              I am currently a third-year finance major at NYU who hopes to attend the NYU Stern School of Business next year. After interning at JetBlue Airways Corporation over the past two summers, I have shifted my educational focus to financial analysis and real-world business solutions. I excel when working in collaborative groups to solve financial problems.

New York is my favorite place in the world. I am originally from Albany and always loved taking trips down to NYC. I always knew I'd study finance at NYU, the best place to study finance in the country. My five-year plan includes becoming a financial advisor for high-profile clients on Wall Street. My education at NYU has prepared me for a long career helping people manage their money successfully.
👉NYC
👉MONEY
👉FINANCE
👉NYU
👉ALBANY
            </Typography>
            <br/>
            <br/>
            <Typography
              className={"MuiTypography--subheading"}
              variant={"]h6"}>
              Contact: 5647884335
            </Typography>
            <br/>
            <br/>
          {<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Address: SBH Colony
          </Typography>}
          <br/>
          {<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Country: India
          </Typography>}
          <br/>
          {<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Region: Telangana
          </Typography>}
          <br/>
          <br/>
          {<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Cell Phone: +16779983456
          </Typography>}
          <br/>
          {<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Home Phone: +9896675456
          </Typography>}
          <br/>
          {<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Fax: HGJH78788
          </Typography>}
          <br/>
          {<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Email: sophia@gmail.com
          </Typography>}
          <br/>
            <IconButton aria-label="linkedIn" disabled={LinkedInState.LinkedInDisable}>
               <LinkedInIcon /> 
             </IconButton>
             <IconButton aria-label="Instagram" disabled={InstagramState.InstagramDisable}>
               <InstagramIcon /> 
             </IconButton>
             <IconButton aria-label="Facebook" disabled={FacebookState.FacebookDisable}>
               <FacebookIcon /> 
             </IconButton>
             <IconButton aria-label="YouTube" disabled={YoutubeState.YoutubeDisable}>
               <YouTubeIcon /> 
             </IconButton>
             <IconButton aria-label="Pinterest" disabled={PinterestState.PinterestDisable}>
               <PinterestIcon /> 
             </IconButton>
             <IconButton aria-label="Reddit" disabled={RedditState.RedditDisable}>
               <RedditIcon /> 
             </IconButton>
             <IconButton aria-label="Twitter" disabled={TwitterState.TwitterDisable}>
               <TwitterIcon /> 
             </IconButton>
            <Divider className={classes.divider} light />
          </CardContent>
        </Card>
      </div>
      
          </Grid> 
         
          <Grid >
              <br/>
          <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={()=>downloadVcardFile()}
      >
        Download Details
      </Button>
      </Grid> 
  </Grid>
  </Container>
  </div>
    );
  }