import axios from "axios";
import { emptyMockJoke, filledMockJoke } from "../mocks/JokeMocks";
import { getARandomJoke } from "../services/JokeService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("JokeService API", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  describe("getStory functionality", () => {
    it("requests and gets a joke from the chuckNorris Api", async () => {
      mockedAxios.get.mockImplementation(() =>
        Promise.resolve({ data: filledMockJoke })
      );

      const entity = await getARandomJoke();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(entity).toEqual(filledMockJoke);
    });

    it("does not retrieve a joke from the Api", async () => {
      mockedAxios.get.mockImplementation(() =>
        Promise.resolve({ data: emptyMockJoke })
      );

      const entity = await getARandomJoke();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(entity).toEqual(emptyMockJoke);
    });
  });
});
