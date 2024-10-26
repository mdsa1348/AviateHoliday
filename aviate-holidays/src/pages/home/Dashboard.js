import React from 'react';
import { Box, Grid, Paper, Typography, IconButton, Divider } from '@mui/material';
import { People, CheckCircle, Mail, MobileFriendly, MonetizationOn, HourglassEmpty, Block, Percent, Public, ListAlt, Event, DateRange } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <Box sx={{ padding: '70px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: '#5b21b6', borderWidth: 1, borderStyle: 'solid' }}>
            <Box display="flex" alignItems="center">
              <People sx={{ fontSize: 40, color: '#5b21b6' }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">Total Users</Typography>
                <Typography variant="h5">372</Typography>
              </Box>
            </Box>
            <IconButton>
              <People />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center',justifyContent: 'space-between', borderColor: '#16a34a', borderWidth: 1, borderStyle: 'solid' }}>
          <Box display="flex" alignItems="center">
            <CheckCircle sx={{ fontSize: 40, color: '#16a34a' }} />
                <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">Active Users</Typography>
                <Typography variant="h5">368</Typography>
                </Box>
          </Box>
            <IconButton>
              <CheckCircle />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderColor: '#dc2626', borderWidth: 1, borderStyle: 'solid' }}>
            <Mail sx={{ fontSize: 40, color: '#dc2626' }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2">Email Unverified Users</Typography>
              <Typography variant="h5">3</Typography>
            </Box>
            <IconButton>
              <Mail />
            </IconButton>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', borderColor: '#d97706', borderWidth: 1, borderStyle: 'solid' }}>
            <MobileFriendly sx={{ fontSize: 40, color: '#d97706' }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2">Mobile Unverified Users</Typography>
              <Typography variant="h5">1</Typography>
            </Box>
            <IconButton>
              <MobileFriendly />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Payment Data
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <MonetizationOn sx={{ fontSize: 30, color: '#10b981' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Total Payment</Typography>
                      <Typography variant="h6">$69,920.00 USD</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <HourglassEmpty sx={{ fontSize: 30, color: '#fbbf24' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Pending Payments</Typography>
                      <Typography variant="h6">45</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Block sx={{ fontSize: 30, color: '#ef4444' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Rejected Payments</Typography>
                      <Typography variant="h6">1</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Percent sx={{ fontSize: 30, color: '#8b5cf6' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Payment Charge</Typography>
                      <Typography variant="h6">$737.20 USD</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Travel Data
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Public sx={{ fontSize: 30, color: '#10b981' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Total Tour Plans</Typography>
                      <Typography variant="h6">19</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <ListAlt sx={{ fontSize: 30, color: '#60a5fa' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Total Booked Tours</Typography>
                      <Typography variant="h6">36</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Event sx={{ fontSize: 30, color: '#8b5cf6' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Total Seminars</Typography>
                      <Typography variant="h6">6</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <ListAlt sx={{ fontSize: 30, color: '#60a5fa' }} />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle2">Total Booked Seminars</Typography>
                      <Typography variant="h6">20</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Payment Report
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2">2.0</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DateRange sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2">July 14, 2024 - July 28, 2024</Typography>
            </Box>
            <IconButton>
              <ListAlt />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
