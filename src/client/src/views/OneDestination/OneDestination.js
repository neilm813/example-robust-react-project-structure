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

import { getOneDestination, testHttpStatus } from 'services';
import { ShowError } from 'components';

export const OneDestination = (_props) => {
  const { id } = useParams();
  const {
    data: destination,
    isLoading,
    isError,
    error,
  } = useQuery(
    ['one-destination'],
    () => getOneDestination(id) /* testHttpStatus(500, 1000) */
  );

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {isLoading && <CircularProgress size={'4rem'} />}
      <ShowError error={error} />

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
