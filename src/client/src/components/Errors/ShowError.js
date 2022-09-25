import { Card, CardActions, CardContent, Typography } from '@mui/material';

export const ShowError = (props) => {
  const { actions = null, additionalContent = [], error } = props;

  if (!error) {
    return null;
  }

  const { code, message } = error;
  let displayMessage = message;

  const errorCodeMessages = {
    ETIMEDOUT: 'The server took too long to respond.',
  };

  if (code in errorCodeMessages) {
    displayMessage = errorCodeMessages[code];
  }

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'inline-block',
        borderColor: 'error.main',
        borderRadius: 1,
        p: 1,
      }}
    >
      <CardContent>
        <Typography color="error.main">{displayMessage}</Typography>
        {additionalContent}
      </CardContent>
      {/* Buttons & links, like try again can be passed in. */}
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};
