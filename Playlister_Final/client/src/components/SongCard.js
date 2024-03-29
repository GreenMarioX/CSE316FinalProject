import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Delete from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        event.stopPropagation();
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div key={index} id={'song-' + index + '-card'} className={cardClass} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} draggable="true" onClick={handleClick}>
            {index + 1}. {song.title} by {song.artist}
            <IconButton id={"remove-song-" + index} sx={{float: 'right', padding: 0}} size='large' onClick={handleRemoveSong}>
                <Delete fontSize='large' />
            </IconButton>
        </div>
    );
}

export default SongCard;