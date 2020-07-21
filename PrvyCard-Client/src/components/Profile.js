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
import ImageUploader from 'react-images-upload';
import CardActionArea from '@material-ui/core/CardActionArea';
import ButtonBase from '@material-ui/core/ButtonBase';
import Select from '@material-ui/core/Select';
import ClearIcon from '@material-ui/icons/Clear';
import usePlacesAutocomplete from "use-places-autocomplete";
import Address from "./Address";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import FileUpload from './FileUpload';



const faces = [
    "http://i.pravatar.cc/300?img=1"
  ];
  
const history = createBrowserHistory({ forceRefresh: true });
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
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
      height:'50%'
  },
  card: {
    maxWidth: 500,
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
  },
  container:{
      width:'500px',
      height:'600px'
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
                  edge="start"
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
                  <MenuItem onClick={()=>history.push("/DisplayProfile")}>Profile</MenuItem>
                  <MenuItem onClick={()=>history.push("/login")}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  const PlacesAutocomplete = () => {
    const { value, setValue } = usePlacesAutocomplete();
  
    const handleInput = (e) => {
      // Place a "string" to update the value of the input element
      setValue(e.target.value);
    };
  
    return (
      <div>
        <input value={value} onChange={handleInput} />
        {/* Render dropdown */}
      </div>
    );
  };

export default function SignUp() {
  const classes = useStyles();
  const [FullName,SetFullName] = useState('');
  const [Bio,SetBio] = useState('');
  const [Phone,SetPhone] = useState('');
  const[Image,SetImage] = useState('');
  const [image, setImage] = useState({ preview: "", raw: "" });

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
  const [socialmedia, setSocialMedia] = React.useState('');
  const [contact,setContact] = React.useState('');
  const [showLinkedIn,setShowLinkedIn] = React.useState(false);
  const [showInstagram,setShowInstagram] = React.useState(false);
  const [showFacebook,setShowFacebook] = React.useState(false);
  const [showYoutube,setShowYoutube] = React.useState(false);
  const [showPinterest,setShowPinterest] = React.useState(false);
  const [showReddit,setShowReddit] = React.useState(false);
  const [showTwitter,setShowTwitter] = React.useState(false);
  
  const[CellPhone,setCellPhone] = React.useState('');
  const[HomePhone,setHomePhone] = React.useState('');


  const[showCellPhone,setShowCellPhone] = React.useState('');
  const[showHomePhone,setShowHomePhone] = React.useState('');
  const[Faxx,setShowFax] = useMergeState({
      showFax: false,
  faxValue: ''});

  const[Emaill,setShowEmail] = useMergeState({
    showEmail: false,
emailValue: ''});

const[Country,setCountry] = React.useState('');
const[Region,setRegion] = React.useState('');
const[Address,setAddress]=React.useState('');

  const handleSocialMediaChange = (event) => {
    setSocialMedia(event.target.value);
    console.log(event.target.value)
    if(event.target.value == 10){
      setShowLinkedIn(true);
    }
    if(event.target.value == 20){
        setShowInstagram(true);
      }
      if(event.target.value == 30){
        setShowFacebook(true);
      }
      if(event.target.value == 40){
        setShowYoutube(true);
      }
      if(event.target.value == 50){
        setShowPinterest(true);
      }
      if(event.target.value == 60){
        setShowReddit(true);
      }
      if(event.target.value == 70){
        setShowTwitter(true);
      }
  };

  const handleContactChange = (event) => {
      console.log(event)
    setContact(event.target.value);
    if(event.target.value == 10){
        setShowCellPhone(true);
      }
      if(event.target.value == 20){
        setShowHomePhone(true);
      }
      if(event.target.value == 30){
        setShowEmail({showEmail:true,emailValue:''});
      }
      if(event.target.value == 40){
        setShowFax({showFax:true,faxValue:''});
      }
  };


  useEffect(() => {
    //similar to componentdidmount and componentdidupdate
   //get existing profile info from backend and fill the fields
  });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

  return (
<div>
    <MenuAppBar/>
    <CssBaseline />
    <div className={classes.paper}>
      </div>
      <Grid container={true} spacing={24}>
      <Grid item={true} xs={12} sm={6}>
    <Container component="main" maxWidth="xs" >
    <Typography component="h1" variant="h5">
        Create Profile
      </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                name="fullName"
                variant="outlined"
                required
                style = {{width:400}}
                id="fullName"
                label="Full Name"
                autoFocus
                defaultValue={FullName}
                onChange={(e)=>SetFullName(e.target.value)}
              />
              <br/>
              <br/>
              <Grid item>
        

          <FileUpload username={'srikar'}/>




      <br/> 
      </Grid>
            </Grid>
            
            <Grid item >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bio"
                label="Bio"
                name="bio"
                autoComplete="bio"
                onChange={(e)=>SetBio(e.target.value)}
                multiline
                rows={8}
                style = {{width:400}}
              />
            </Grid>



           <br/>
            <Grid item>
            <TextField variant="outlined"
                required
                fullWidth style = {{width:400}} className={classes.textField} id="input-with-icon-grid" label="Address" 
                onChange={(e)=>setAddress(e.target.value)}/>
            </Grid>
     <br/>
     <Grid item>
        <CountryDropdown
          style = {{width:400},{height:45}}
          value={Country}
          onChange={(val) => setCountry(val)} />
          </Grid>
          <Grid item>
        <RegionDropdown
        style = {{width:400},{height:45}}
          country={Country}
          value={Region}
          onChange={(val) => setRegion(val)} />
     </Grid>



            <Grid item >
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth: 400}}>
        <InputLabel id="demo-simple-select-outlined-label">Contact Details</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={contact}
          onChange={handleContactChange}
          label="Social Media Channels"
        >
          <MenuItem >None</MenuItem>
          <MenuItem value={10}>Cell Phone</MenuItem>
          <MenuItem value={20}>Home Phone</MenuItem>
          <MenuItem value={30}>Email</MenuItem>
          <MenuItem value={40}>Fax</MenuItem>
        </Select>
      </FormControl>
      </Grid>

      {showCellPhone?
      <Grid container spacing={2} alignItems="flex-end" item >
      <Grid item >
                <PhoneInput placeholder="Enter Cell Number" country={'us'} value={CellPhone} onChange={(e)=>setCellPhone(e)} inputStyle={{color:'blue', width:'350px'}}/>
                
                </Grid>
                <Grid item >
                <ClearIcon onClick={()=>setShowCellPhone(false)} />
                </Grid>
                </Grid>:null}
      
      {showHomePhone? 
      <Grid container spacing={2} alignItems="flex-end" item >
      <Grid item >
                <PhoneInput placeholder="Enter Home Phone Number" country={'us'} value={HomePhone} onChange={(e)=>setHomePhone(e)} inputStyle={{color:'blue', width:'350px'}}/>
                </Grid>
                <Grid item>
                <ClearIcon onClick={()=>setShowHomePhone(false)}/>
                </Grid>
                </Grid>:null}
    
                {Faxx.showFax? 
                <Grid container spacing={2} alignItems="flex-end" item >
                <Grid item>
                <TextField style = {{width:350}} className={classes.textField} id="input-with-icon-grid" label="Fax Number" onChange={(e)=>{setShowFax({
          showFax: true,
          faxValue: e.target.value ,
        });}}/>
                </Grid>
                <Grid item>
            <ClearIcon onClick={()=>{setShowFax({
          showFax: false,
          faxValue: "" ,
        });}}/>
              </Grid>
              </Grid>
              :null}

{Emaill.showEmail? 
                <Grid container spacing={2} alignItems="flex-end" item >
                <Grid item>
                <TextField style = {{width:350}} className={classes.textField} id="input-with-icon-grid" label="Email address" onChange={(e)=>{setShowEmail({
          showEmail: true,
          emailValue: e.target.value ,
        });}}/>
                </Grid>
                <Grid item>
            <ClearIcon onClick={()=>{setShowEmail({
          showEmail: false,
          emailValue: "" ,
        });}}/>
              </Grid>
              </Grid>
              :null}


            <Grid item >
            <FormControl variant="outlined" className={classes.formControl} style={{minWidth: 400}}>
        <InputLabel id="demo-simple-select-outlined-label">Social Media Channels</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={socialmedia}
          onChange={handleSocialMediaChange}
          label="Social Media Channels"
        >
          <MenuItem >None</MenuItem>
          <MenuItem value={10}>LinkedIn</MenuItem>
          <MenuItem value={20}>Instagram</MenuItem>
          <MenuItem value={30}>Facebook</MenuItem>
          <MenuItem value={40}>Youtube</MenuItem>
          <MenuItem value={50}>Pinterest</MenuItem>
          <MenuItem value={60}>Reddit</MenuItem>
          <MenuItem value={70}>Twitter</MenuItem>
        </Select>
      </FormControl>
      </Grid>

            
            
          
          {showLinkedIn? 
          <Grid container spacing={2} alignItems="flex-end" item >
          <Grid item>
          <LinkedInIcon color="primary" />
          </Grid>
          <Grid item > 
            <TextField style = {{width:330}} className={classes.textField} id="input-with-icon-grid" label="LinkedIn UserName" onChange={(e)=>{SetLinkedInUName({
          LinkedInUname: e.target.value,
          LinkedInDisable: !e.target.value ,
        });}}/>
        <ClearIcon onClick={()=>setShowLinkedIn(false)}/>
          </Grid> 
        
          </Grid>
          : null}
          </Grid>


          {showInstagram ? <Grid container spacing={2} alignItems="flex-end" item >
            <Grid item>
            <InstagramIcon color="primary" />
          </Grid>
          <Grid item>
            <TextField style = {{width:330}} className={classes.textField} id="input-with-icon-grid" label="Instagram UserName" onChange={(e)=>{SetInstagramUName({
          InstagramUname: e.target.value,
          InstagramDisable: !e.target.value ,
        });}}/>
        <ClearIcon onClick={()=>setShowInstagram(false)}/>
          </Grid>
          </Grid> :
          null}


          {showFacebook ?<Grid container spacing={2} alignItems="flex-end" item > 
            <Grid item>
            <FacebookIcon color="primary" />
          </Grid>
          <Grid item>
            <TextField style = {{width:330}} className={classes.textField} id="input-with-icon-grid" label="FaceBook UserName" onChange={(e)=>{SetFacebookUName({
          FacebookUname: e.target.value,
          FacebookDisable: !e.target.value ,
        });}}/>
        <ClearIcon onClick={()=>setShowFacebook(false)}/>
          </Grid>
          </Grid>:
          null}



          {showYoutube?<Grid container spacing={2} alignItems="flex-end" item > 
            <Grid item>
            <YouTubeIcon color="primary" />
          </Grid>
          <Grid item>
            <TextField style = {{width:330}} className={classes.textField} id="input-with-icon-grid" label="Youtube UserName" onChange={(e)=>{SetYoutubeUName({
          YoutubeUname: e.target.value,
          YoutubeDisable: !e.target.value ,
        });}}/>
        <ClearIcon onClick={()=>setShowYoutube(false)}/>
          </Grid>
          </Grid>:null}


          {showPinterest?<Grid container spacing={2} alignItems="flex-end" item > 
            <Grid item>
            <PinterestIcon color="primary" />
          </Grid>
          <Grid item>
            <TextField style = {{width:330}} className={classes.textField} id="input-with-icon-grid" label="Pinterest UserName" onChange={(e)=>{SetPinterestUName({
          PinterestUname: e.target.value,
          PinterestDisable: !e.target.value ,
        });}}/>
        <ClearIcon onClick={()=>setShowPinterest(false)}/>
          </Grid>
          </Grid>:null}


          {showReddit ?
          <Grid container spacing={2} alignItems="flex-end" item > 
            <Grid item>
            <RedditIcon color="primary" />
          </Grid>
          <Grid item>
            <TextField style = {{width:330}} className={classes.textField} id="input-with-icon-grid" label="Reddit UserName" onChange={(e)=>{SetRedditUName({
          RedditUname: e.target.value,
          RedditDisable: !e.target.value ,
        });}}/>
        <ClearIcon onClick={()=>setShowReddit(false)}/>
          </Grid>
          </Grid>:null}


          {showTwitter?
          <Grid container spacing={2} alignItems="flex-end" item > 
            <Grid item>
            <TwitterIcon color="primary" />
          </Grid>
          <Grid item>
            <TextField style = {{width:330}} className={classes.textField} id="input-with-icon-grid" label="Twitter UserName" onChange={(e)=>{SetTwitterUName({
          TwitterUname: e.target.value,
          TwitterDisable: !e.target.value ,
        });}}/>
        <ClearIcon onClick={()=>setShowTwitter(false)}/>
          </Grid>
          </Grid>:null}


         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Update Profile
          </Button>
        </form>
      <Box mt={5}>
      </Box>
    </Container>
    </Grid>
    <Grid item={true} xs={12} sm={6} >
    <div className={classes.App}>
      <Card className={classes.card}>
      <CardActionArea>
      <Avatar className={classes.avatar} key={faces} src={image.preview} />
        <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
            {FullName}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"body2"}>
            {Bio}
          </Typography>
          <br/>
          <br/>
          {Address?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Address: {Address}
          </Typography>: null}
          <br/>
          {Country?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Country: {Country}
          </Typography>: null}
          <br/>
          {Region?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Region: {Region}
          </Typography>: null}
          <br/>
          <br/>
          {showCellPhone?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Cell Phone: {CellPhone}
          </Typography>: null}
          <br/>
          {showHomePhone?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Home Phone: {HomePhone}
          </Typography>: null}
          <br/>
          {Faxx.showFax?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Fax: {Faxx.faxValue}
          </Typography>: null}
          <br/>
          {Emaill.showEmail?<Typography
            className={"MuiTypography--subheading"}
            variant={"overline"}>
            Email: {Emaill.emailValue}
          </Typography>: null}
          <br/>
          <br/>
          <IconButton aria-label="linkedIn" disabled={!showLinkedIn}>
             <LinkedInIcon /> 
           </IconButton>
           <IconButton aria-label="Instagram" disabled={!showInstagram}>
             <InstagramIcon /> 
           </IconButton>
           <IconButton aria-label="Facebook" disabled={!showFacebook}>
             <FacebookIcon /> 
           </IconButton>
           <IconButton aria-label="YouTube" disabled={!showYoutube}>
             <YouTubeIcon /> 
           </IconButton>
           <IconButton aria-label="Pinterest" disabled={!showPinterest}>
             <PinterestIcon /> 
           </IconButton>
           <IconButton aria-label="Reddit" disabled={!showReddit}>
             <RedditIcon /> 
           </IconButton>
           <IconButton aria-label="Twitter" disabled={!showTwitter}>
             <TwitterIcon /> 
           </IconButton>
          <Divider className={classes.divider} light />
          <Typography variant="overline" display="block" gutterBottom align='center'>
        PRVY CARD
      </Typography>
      <Typography variant="caption" display="block" gutterBottom align='center'>
        powered by PRVY CARD
      </Typography>
        </CardContent>
        </CardActionArea>
      </Card>
    </div>
        </Grid>  
</Grid>
    </div>
  );
}