import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';

import { getOneDestination } from '../../services';
import { ShowError } from '../../components';

export const OneDestinationView = (_props) => {
  const { id } = useParams();
  const { data: destination, isLoading, error } = useQuery(['one-destination'], () => getOneDestination(id));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isLoading && <CircularProgress size="4rem" />}
      <ShowError error={error} />

      {destination && (
        <Card>
          <CardMedia component="img" image={destination.src} alt={destination.location} />
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ mr: 5 }}>
              <Typography variant="h5">{destination.location}</Typography>
              <Typography variant="body2">{destination.description}</Typography>
            </Box>
            <Box>
              <Typography variant="h5">Seasons</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
