import axios from "axios";

export const getARandomJoke = async () => {
  const { data } = await axios.get<JokeApiType>(
    "https://api.chucknorris.io/jokes/random"
  );
  return data;
};
