import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Accordion, AccordionDetails, AccordionSummary, Button, Paper } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SongListCard from './SongListCard';
import EditToolbar from './EditToolbar';
import PublishIcon from '@mui/icons-material/Publish';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MUIDeleteModal from './MUIDeleteModal'

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const { idNamePair } = props;
    const [text, setText] = useState(idNamePair.name);

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let cardElement =
    <Paper id={idNamePair._id} sx={{ margin: '10px', width: '95%', borderRadius: '5px' }}> 
        <ListItem id={idNamePair._id} key={idNamePair._id} sx={{ height: 85, p: 1, flexWrap: 'wrap', bgcolor: '#ADD8E6', "&:hover":{ bgcolor: '#ADD8E6' }, borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} button onDoubleClick={handleToggleEdit}>
            <Box sx={{ pr: 10, pl: 1, fontWeight: 'bold', fontSize: 30 }}>{idNamePair.name}</Box>
            <Button aria-label="like"id="like-button"sx={{ color: "#000000", ml: 40, mr: 5}}startIcon={<ThumbUpAltOutlinedIcon style={{fontSize:'24pt'}} />}>
                0
            </Button>
            <Button aria-label="dislike" id="dislike-button" sx={{ color: "#000000", mr: 5 }} startIcon={<ThumbDownAltOutlinedIcon style={{fontSize:'24pt'}}/>}>
                0
            </Button>
            <Box sx={{ pr: 1, pl: 1, fontSize: 20, mr: 40}}>By: </Box>
            <Box sx={{ pr: 1, pl: 1, fontSize: 20, mx: 2.5}}>Published: </Box>
            <Box sx={{ pr: 1, pl: 1, fontSize: 20, mr: 20}}>Listens:  </Box>
        </ListItem>
        <Accordion id={idNamePair._id} sx={{ bgcolor: '#ADD8E6', '&:before': {display: 'none'} }} elevation={0} disableGutters>
            <AccordionSummary 
                expandIcon={ 
                    <KeyboardDoubleArrowDownIcon style={{ fontSize: 30, color: 'black' }} onClick={(event) => {handleLoadList(event, idNamePair._id)}}/> 
                }/>
            <AccordionDetails sx={{ maxHeight: 400, overflowY: 'auto' }}>
                <SongListCard/>
                <EditToolbar/>
                <MUIDeleteModal/>
                <IconButton 
                    onClick={(event) => {handleDeleteList(event, idNamePair._id)}} 
                    aria-label='delete'>
                    <DeleteIcon style={{fontSize:'32pt'}} />
                </IconButton>
                <IconButton 
                    //onClick={} 
                    aria-label='publish'>
                    <PublishIcon style={{fontSize:'32pt'}} />
                </IconButton>
                <IconButton 
                    //onClick={} 
                    aria-label='duplicate'>
                    <FileCopyIcon style={{fontSize:'32pt'}} />
                </IconButton>
            </AccordionDetails>
        </Accordion>
    </Paper>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                width= '100%'
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;