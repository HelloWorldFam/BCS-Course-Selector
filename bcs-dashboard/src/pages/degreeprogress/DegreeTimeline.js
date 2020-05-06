import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// Vertical Timeline (Scrolling) component
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import Helmet from 'react-helmet';

import {
    CardContent,
    Grid,
    Link,
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    Divider as MuiDivider,
    Typography,
    Tooltip,
    Button
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const verticalTimelineProps = {
    className: "vertical-timeline-element",
    iconStyle: {
        background: 'rgb(33, 150, 243)', 
        color: '#fff',
        width: '30px', 
        height: '30px',
        marginLeft: '-15px',
        marginTop: '15px'
    },
};

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Timeline(props) {
    const classes = useStyles();
    return (
        <Card style={{ backgroundColor: "#e3e3e3" }} mb={6}>
            <CardContent>
                <Typography variant="h6" paragraph >
                    Timeline
                </Typography>
                <VerticalTimeline>
                    {props.courseResult.length === 0
                        ? (
                            <VerticalTimelineElement {...verticalTimelineProps} >
                                <h3>You have not added any courses!</h3>
                            </VerticalTimelineElement>
                        )
                        : props.courseResult.map((item, index, array) => (
                            <VerticalTimelineElement date={item.name} {...verticalTimelineProps} >
                                <h3 className="vertical-timeline-element-title">
                                    Courses:
                                </h3>
                                {item.courses.map((course) => (
                                    <>
                                        <Tooltip title={tooltipText(course)} arrow>
                                            <Button className="vertical-timeline-element-subtitle"
                                                variant="outlined" size="medium" className={classes.margin}>
                                                {course.code}
                                            </Button>
                                        </Tooltip>
                                    </>
                                ))}
                            </VerticalTimelineElement>
                        ))}
                </VerticalTimeline>
            </CardContent>
        </Card>
    );
}

function DegreeTimeline() {
    const [courseResult, setCourseResult] = React.useState([]);

    useEffect(() => {
        fetch((window.location.host === "ubcexplorer.io" ? "" : "http://localhost:3000") + "/getcourses")
            .then(response => response.json())
            .then(json => {
                setCourseResult(json); // access json.body here
            });
    }, []);

    return (
        <React.Fragment>
            <Helmet title="Degree Progress" />
            <Typography variant="h3" gutterBottom display="inline">
                Degree Progress
            </Typography>

            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                <Link component={NavLink} exact to="/bcs/dashboard">
                    Dashboard
                </Link>
                <Typography>
                    Degree Timeline
                </Typography>
            </Breadcrumbs>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Timeline courseResult={courseResult} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default DegreeTimeline;

function tooltipText(course) {
    // const updatePrer = (course) => {
    //     axios.get("/getCourseInfo/" + course.code)
    //         .then((res) => {
    //             console.log(res);
    //             return res.data.prer;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    // const updateCrer = (course) => {
    //     axios.get("/getCourseInfo/" + course.code)
    //         .then((res) => {
    //             return res.data.crer;
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    return (
        <>
            <h3>Name: {course.name}</h3>
            <h3>Credits: {course.cred}</h3>
            <h3>Pre-reqs: {course.prer}</h3>
            <h3>Co-reqs: {course.crer}</h3>
        </>
    );
}