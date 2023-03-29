import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const NewDestinationView = (_props) => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      location: '',
      description: '',
      src: '',
      srcType: 'Img',
      summer: true,
      winter: false,
      spring: false,
      fall: false,
    },
  });

  useEffect(() => {
    // Trigger initial validation before any changes have been made.
    trigger();
  }, [trigger]);

  const formValues = watch();

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography textAlign="center" variant="h3">
        Plan A Trip
      </Typography>
      <Divider light sx={{ marginBottom: 3 }} />

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 2 },
        }}
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
        })}
      >
        <Controller
          control={control}
          name="location"
          rules={{ required: 'Required field', minLength: { value: 2, message: 'Minimum length is 2' } }}
          render={({ field }) => (
            <TextField label="Location" error={!!errors?.location} helperText={errors?.location?.message} {...field} />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Required field', minLength: { value: 5, message: 'Minimum length is 5' } }}
          render={({ field }) => (
            <TextField
              label="Description"
              multiline
              fullWidth
              rows={4}
              error={!!errors?.description}
              helperText={errors?.description?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="src"
          rules={{ required: 'Required field', minLength: { value: 2, message: 'Minimum length is 2' } }}
          render={({ field }) => (
            <TextField fullWidth label="Media Url" error={!!errors?.src} helperText={errors?.src?.message} {...field} />
          )}
        />

        <FormControl sx={{ width: '25%' }}>
          <InputLabel>Media Url Type</InputLabel>
          <Controller
            control={control}
            name="srcType"
            rules={{ required: 'Required field' }}
            render={({ field }) => (
              <Select label="Media Url Type" value={formValues.srcType} error={!!errors?.srcType} {...field}>
                <MenuItem value="Img">Image</MenuItem>
                <MenuItem value="Google Maps Embed">Google Maps Embed</MenuItem>
                <MenuItem value="Youtube Embed">Youtube Embed</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <FormGroup sx={{ my: 2 }}>
          <Typography variant="h5">Travel Seasons</Typography>
          <Controller
            name="summer"
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox />} label="Summer" checked={formValues.summer} {...field} />
            )}
          />
          <Controller
            name="winter"
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox />} label="Winter" checked={formValues.winter} {...field} />
            )}
          />
          <Controller
            name="spring"
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox />} label="Spring" checked={formValues.spring} {...field} />
            )}
          />
          <Controller
            name="fall"
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox />} label="Fall" checked={formValues.fall} {...field} />
            )}
          />
        </FormGroup>

        <Button variant="outlined" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};
