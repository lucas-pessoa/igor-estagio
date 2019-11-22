import React from "react";
import {
    Typography,
    Box
  } from '@material-ui/core';

class TabPanel extends React.Component {
    constructor(props){
        super(props);
    }

    onChange(stateName, value) {
        this.setState({
            [stateName]: value
        });
    }

    render() {
        const { children, value, index } = this.props;
        //console.log('child',children,'val',value,'ind',index);
        return (
            <div
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
            >
                <Box p={3}>{children}</Box>
            </div>
        );
    }

}

export default TabPanel;