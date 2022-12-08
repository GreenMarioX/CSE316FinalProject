import { Typography, Box, Button } from '@mui/material';
import AuthContext from '../auth';
import { useContext, useState } from 'react';
export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const handleGuestLogIn = () => {
        auth.loginGuest();
    }

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/login'
    }
    const handleRegister = () => {        
        window.location.href = 'http://localhost:3000/register'
    }

    return (
        <div id="splash-screen" >
          
            <Typography style={{ color:'red', fontFamily: 'Tangerine', fontSize: 100 }}>
                Playlister
            </Typography>
            <Typography paragraph={true} align="center">
                Created by: Steven Tung
            </Typography>
            <Typography style={{fontSize: 100}} align="center">
                WELCOME!
            </Typography>
            <Typography paragraph={true} align="center">
                Create playlists and share your favorite songs
                with others.
            </Typography>
           
       
       
            <Button onClick={handleLogin} variant="outlined" sx={{bottom:20, right:40,}}>Login</Button>
            <Button onClick={handleRegister} variant="outlined" sx={{bottom:20, }}>Create Account</Button>
            <Button onClick={handleGuestLogIn} variant="outlined" sx={{bottom:20, left:40}}>Continue as Guest</Button>
    
            
        </div>
        
    )  
}