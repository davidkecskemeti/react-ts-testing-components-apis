import { Box, Button, TextareaAutosize, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getARandomJoke } from "../services/JokeService";

export interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [joke, setJoke] = useState<JokeApiType>();
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    const joke = await getARandomJoke();
    setJoke(joke);
  };

  const getARandom = async () => {
    setLoading(true);
    const data = await getARandomJoke();
    setLoading(false);
    return data;
  };

  useEffect(() => {
    getARandom().then((response) => setJoke(response));
  }, []);

  if (loading) {
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fff4da"
      data-testid="jokeContainer"
    >
      Loading
    </Box>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#33FF63"
      data-testid="jokeContainer"
    >
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="#fff4da"
        >
          Loading
        </Box>
      )}

      <Box padding="1.2rem" display="flex">
        <TextareaAutosize value={joke?.value} data-testid="jokeText" />
      </Box>

      <Button
        disabled={loading}
        onClick={() => handleRefresh()}
        color="default"
        variant="outlined"
      >
        Refresh
      </Button>
    </Box>
  );
};

export default Home;
