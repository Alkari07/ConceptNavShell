import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersistentDrawer from './PersistentDrawer';
import config from '../config.json';
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div role='tabpanel'
        hidden={value !==index}
        id={`simple-tabpanel`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value===index && (
                <Box p={0}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps (index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [contentIndex=0, setContentIndex] = React.useState(0);

    const handleChange = (event,newValue) => {
        setValue(newValue);
    }

    const handleContentChange = (newIndex) => {
        setContentIndex(newIndex);
    }

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Grid container spacing={0}>
                    <Grid item xs={1}>
                        <IconButton onClick={()=> window.open('https://www.esri.com')}>
                            <HomeIcon color='action' fontSize='large'/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={11}>
                        <Tabs value={value} onChange={handleChange} aria-label="Simple tabs example" centered>
                            {config.tabDefs.map((tab, index)=> {
                                return <Tab label={tab.title} key={index} {...a11yProps(index)} />
                            })}

                        </Tabs>
                        {config.tabDefs.map((tab, index)=> {
                            return <TabPanel value={value} key={index} index={index}>
                                <PersistentDrawer 
                                    handleContentChange = {handleContentChange}
                                    title ={config.tabDefs[value].content[contentIndex] ? 
                                        config.tabDefs[value].content[contentIndex].label : config.tabDefs[value].content[0].label}
                                    iframeSrc={config.tabDefs[value].content[contentIndex] ? 
                                        config.tabDefs[value].content[contentIndex].url : config.tabDefs[value].content[0].url}
                                    content={config.tabDefs[value].content}
                                    >
                                    
                                </PersistentDrawer>
                            </TabPanel>
                        })}
                    </Grid>
                </Grid>
                
            </AppBar>
        </div>
    )
}