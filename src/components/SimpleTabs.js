import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersistentDrawer from './PersistentDrawer';
import config from '../config.json';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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

    const handleChange = (event,newValue) => {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Tabs value={value} onChange={handleChange} aria-label="Simple tabs example" centered>
                    <Tab label={config.tabDefs[0].title} {...a11yProps(0)} />
                    <Tab label='Item Two' {...a11yProps(1)}/>
                    <Tab label = 'Item Three' {...a11yProps(2)}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PersistentDrawer 
                    title ={'Fire Fighting Dashboard'}
                    iframeSrc={'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik'}>
                    </PersistentDrawer>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PersistentDrawer 
                    title ={'Police Dashboard'}
                    iframeSrc={'https://www.tutorialrepublic.com'}>
                    </PersistentDrawer>
                </TabPanel>
            </AppBar>
        </div>
    )
}