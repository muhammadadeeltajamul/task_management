import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import {
  Avatar, Box, Button, Card, CardContent, Container,
  Grid2, Typography,
  useMediaQuery, useTheme
} from '@mui/material';
import { setAppHeader } from './data/slice';
import { selectIsUserLoggedIn } from '../authentication/data/selectors';
import { ConfigContext } from '../config';
import { AppRoutes } from '../constant';

const Homepage = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  const theme = useTheme();
  const { APP_NAME } = useContext(ConfigContext);
  dispatch(setAppHeader(true));
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const gridWidth = isXs ? '100%' : isSm ? '84%' : isMdUp ? '48%' : '48%'
  return (
    <div>
      <Container maxWidth="lg" className="text-align-center pt-p5r mb-4r" sx={{ textAlign: 'center', pt: 8 }}>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to {APP_NAME}!
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Simplify your workflow, organize tasks, and collaborate effortlessly with our intuitive interface.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="mt-2r"
            component={Link}
            to={isUserLoggedIn ? AppRoutes.BOARDS: AppRoutes.LOGIN}
          >
            Get Started
          </Button>
        </Box>

        <Box mt={8}>
          <Grid2 container spacing={2} justifyContent="center">
            {
              [
                {title: 'Dashboard Overview', icon: DashboardIcon, description: 'Get a bird\'s-eye view of all tasks across different projects.'},
                {title: 'Task Management', icon: TaskAltIcon, description: 'Organize and prioritize your tasks with ease.'},
                {title: 'Track Progress', icon: TrackChangesIcon, description: 'Monitor the progress of tasks and projects easily.' },
                {title: 'Team Collaboration', icon: GroupIcon, description: 'Collaborate with team members, assign tasks, and track progress.'},
              ].map(feature => (
                <Grid2
                  item
                  sx={{
                    flexBasis: gridWidth,
                    maxWidth: gridWidth,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent>
                      <Avatar sx={{ mb: 2, bgcolor: 'primary.main' }}>
                        <feature.icon />
                      </Avatar>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography color="textSecondary" className="text-lines-1">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))
            }
          </Grid2>
        </Box>
      </Container>
    </div>
  )
}

export default React.memo(Homepage);
