import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import { Button, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let content = <Typography> </Typography>;
    
    function handleCreateNewList() {
        store.createNewList("", []);
    }

    if(store.searchMode === "h" && !store.currentList && auth.loggedIn) {
        content = 
        <Button 
            aria-label="add"
            id="add-button"
            style={{ color: "#000000" }}
            onClick={handleCreateNewList}
        >
            <AddIcon style={{ fontSize: 50 }}/>
            <Typography variant="h4" style={{ fontSize: 20 }}> &#40;Home&#41; </Typography>
        </Button>
    }
    if(store.searchMode === "n" && !store.currentList) {
    content = 
            <Button aria-label="add" id="add-button" style={{ color: "#000000" }} onClick={handleCreateNewList}>
                <AddIcon style={{ fontSize: 50 }}/>
                <Typography variant="h4" style={{ fontSize: 20 }}> {store.currentCri}&#32;Playlists&#40;Name&#41; </Typography>
            </Button>
    }
    if(store.searchMode === "u" && !store.currentList) {
        content = 
            <Button aria-label="add" id="add-button" style={{ color: "#000000" }} onClick={handleCreateNewList}>
                <AddIcon style={{ fontSize: 50 }}/>
                <Typography variant="h4" style={{ fontSize: 20 }}> {store.currentCri}&#32;Lists&#40;User&#41; </Typography>
            </Button>
    }
    if(store.currentList && store.searchMode === "h") {
        content = 
        <Button 
            aria-label="add"
            id="add-button"
            style={{ color: "#000000" }}
            onClick={handleCreateNewList}
        >
            <AddIcon style={{ fontSize: 50 }}/>
            <Typography variant="h4" style={{ fontSize: 20 }}> {store.currentList.name}&#40;Home&#41; </Typography>
        </Button>
    }
    if(store.currentList && store.searchMode === "n") {
        content = 
        <Button 
            aria-label="add"
            id="add-button"
            style={{ color: "#000000" }}
            onClick={handleCreateNewList}
        >
            <AddIcon style={{ fontSize: 50 }}/>
            <Typography variant="h4" style={{ fontSize: 20 }}> {store.currentList.name}&#32;Playlists</Typography>
        </Button>
    }
    if(store.currentList && store.searchMode === "u") {
        content = 
        <Button 
            aria-label="add"
            id="add-button"
            style={{ color: "#000000" }}
            onClick={handleCreateNewList}
        >
            <AddIcon style={{ fontSize: 50 }}/>
            <Typography variant="h4" style={{ fontSize: 20 }}> {store.currentList.name}&#32;Lists</Typography>
        </Button>
    }
    if(auth.guest) {
        content="";
    }

    return (
        <Box id="playlister-statusbar">
            {content}
        </Box>
    );
}

export default Statusbar;