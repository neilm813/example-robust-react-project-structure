import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Fade,
  Paper,
  Typography,
} from '@mui/material';

import { getOneDestination } from 'services';

export const OneDestination = (_props) => {
  const { id } = useParams();
  const {
    data: destination,
    isLoading,
    isError,
    error,
  } = useQuery(['one-destination'], () => getOneDestination(id));

  if (error) {
    return 'error';
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {isLoading && <CircularProgress />}
      {destination && (
        <Card>
          <CardMedia
            component="img"
            image={destination.src}
            alt={destination.location}
          />
          <CardContent>
            <Typography variant="h4">{destination.location}</Typography>
            <Typography variant="body2">{destination.description}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
