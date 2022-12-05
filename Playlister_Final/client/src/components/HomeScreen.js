import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'

import { Button, TextField, List, Tab, Tabs, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import YoutubePlayer from './YoutubePlayer';
import CommentListCard from './CommentListCard';
import AuthContext from '../auth';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const [value, setValue] = useState(0);

    useEffect(() => {
        store.loadIdNamePairs();
    }, [])

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ left: '1%', bottom: '1%', height: '100%', width: '100%', bgcolor: '#eeeeedd' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    
    
        
    const menu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id='primary-search-account-menu'
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Name &#40;A - Z&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date &#40;Newest&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens &#40;High - Low&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes &#40;High - Low&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes &#40;High - Low&#41;</MenuItem>
        </Menu>
    );

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let playerCommentTab =
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Player" sx={{fontWeight: 'bold', color: 'black'}} {...a11yProps(0)} />
            <Tab label="Comments" sx={{fontWeight: 'bold', color: 'black'}} {...a11yProps(1)} />
            </Tabs>
            </Box> 
            <TabPanel value={value} index={0}>
                <YoutubePlayer/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CommentListCard/>
            </TabPanel>
        </Box>;

    return (
        <div id="homescreen">
            <div id="homescreen-heading">
                <Button 
                    aria-label="home"
                    id="home-button"
                    style={{ color: "#000000" }}
                >
                    <HomeOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <Button 
                    aria-label="all-list"
                    id="all-list-button"
                    style={{ color: "#000000" }}
                >
                    <GroupsOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <Button 
                    aria-label="users"
                    id="users-button"
                    style={{ color: "#000000" }}
                >
                    <PersonOutlineOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <TextField 
                    id="outlined-basic" 
                    label="Search" 
                    variant="outlined" 
                    sx={{ ml: 10, height: '95%', width: 700}}
                />  
                <Button
                    size="large"
                    edge="end"
                    aria-label="sort by"
                    aria-controls='primary-search-account-menu'
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                    endIcon={<SortIcon/>}
                    sx={{ ml: 40, fontSize: 20}}
                > 
                    Sort By
                </Button>
                {menu}
            </div>
            <div id="homescreen-sections">
                <div id="playlist-selector-list">
                    {listCard}
                </div>
                <div id="player-comment-tab">
                    {playerCommentTab}
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;
