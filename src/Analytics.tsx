// src/Analytics.tsx

import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-F5CNW5173V'; // Your Measurement ID

const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics on component mount
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    // Send a pageview event whenever the location changes
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null; // This component doesn't render anything
};

export default Analytics;