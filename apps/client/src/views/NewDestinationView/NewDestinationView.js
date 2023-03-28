import {
  Box,
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

export const NewDestinationView = (_props) => {
  // https://codesandbox.io/s/react-hook-form-with-ui-library-forked-fp5r3?file=/src/index.js
  const handleSubmit = () => console.log('submit');

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
        onSubmit={handleSubmit}
      >
        <TextField label="Location" />
        <TextField fullWidth label="Description" multiline rows={4} />
        <TextField fullWidth label="Media Url" />

        <FormControl sx={{ width: '25%' }}>
          <InputLabel>Media Url Type</InputLabel>
          <Select label="Media Url Type">
            <MenuItem value="Img">Image</MenuItem>
            <MenuItem value="Google Maps Embed">Google Maps Embed</MenuItem>
            <MenuItem value="Youtube Embed">Youtube Embed</MenuItem>
          </Select>
        </FormControl>

        <FormGroup sx={{ mt: 2 }}>
          <Typography variant="h5">Travel Seasons</Typography>
          <FormControlLabel defaultChecked control={<Checkbox />} label="Summer" />
          <FormControlLabel control={<Checkbox />} label="Winter" />
          <FormControlLabel control={<Checkbox />} label="Spring" />
          <FormControlLabel control={<Checkbox />} label="Fall" />
        </FormGroup>
      </Box>
    </Paper>
  );
};
