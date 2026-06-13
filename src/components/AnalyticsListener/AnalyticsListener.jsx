import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId || isInitialized) return;

    ReactGA.initialize(measurementId);
    isInitialized = true;
  }, []);

  useEffect(() => {
    if (!measurementId || !isInitialized) return;

    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

export default AnalyticsListener;
