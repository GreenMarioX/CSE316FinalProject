import { Paper, Box, Typography, Link } from '@mui/material';
import AuthContext from '../auth';
import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function CommentCard(props) {
    const { comment } = props;
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    
    function handleLoadUser(event) {
        console.log("loaduser")
        store.loadUser(auth.user.email, comment.by);
    }

    return (
        <Paper sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', my: 1, width: '100%', height: 'auto', bgcolor: '#FFA500'}} variant="outlined" >
            <Box sx={{ pt: 1, pl: 2, fontSize: 20, color: "darkblue"}}>{<Link component='button' onClick={handleLoadUser} sx={{ fontSize: 20 }}>
                {comment.by}</Link>}
            </Box>
            <Typography sx={{ pt: 1, pl:3, pr:3, fontSize: 12 }}>{comment.comment}</Typography> 
        </Paper>
    );
}

export default CommentCard;