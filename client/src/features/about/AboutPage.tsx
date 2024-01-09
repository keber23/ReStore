import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error().catch(console.log)}
        >
          TEST 400 ERROR
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error().catch(console.log)}
        >
          TEST 401 ERROR
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error().catch(console.log)}
        >
          TEST 404 ERROR
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error().catch(console.log)}
        >
          TEST 500 ERROR
        </Button>
        <Button variant="contained" onClick={() => getValidationError()}>
          TEST VALIDATION ERROR
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
