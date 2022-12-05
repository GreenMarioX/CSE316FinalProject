import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store/index.js'
import { List, TextField, Box } from '@mui/material';
import SongCard from './SongCard.js';

function CommentListCard() {
    const { store } = useContext(GlobalStoreContext);
    const [x, setX] = useState(1);
    let page;

    function handleEnter (event) {
        if(event.key === 'Enter') {
            setX(2);
        }
    }

    if(store.currentList) {
        page = 
            <Box sx={{ height: 350}}>
                <List id="playlist-cards" sx={{ pd: 5, left: '2.5%', height: '100%', width: '95%', bgcolor: '#eeeeedd', overflowY: 'auto' }}>
                    {x}
                </List>
                <TextField id="outlined-basic" label="Add Comment" variant="outlined" sx={{ width: '100%', backgroundColor: 'white', mt: 1}}onKeyPress={handleEnter}/>
            </Box>
    } 
    else {
        page =
        <Box sx={{ height: 350}}>
        <List id="playlist-cards" sx={{ pd: 5, left: '2.5%', height: '100%', width: '95%', bgcolor: '#eeeeedd', overflowY: 'auto' }}>
        </List>
        <TextField id="outlined-basic" label="Add Comment" variant="outlined" sx={{ width: '100%', backgroundColor: 'white', mt: 1}} onKeyPress={handleEnter}/> 
        </Box>
    }

    return (
        page
    )
}

export default CommentListCard;