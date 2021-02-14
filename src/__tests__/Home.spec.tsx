import { cleanup, render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/dist/utils/testing";
import { getARandomJoke } from "../services/JokeService";
import { act } from "react-dom/test-utils";
import Home from "../components/Home";
import { emptyMockJoke, filledMockJoke } from "../mocks/JokeMocks";

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock("../services/JokeService");
const mockedAxios = mocked(getARandomJoke);

test("Renders home correctly", async () => {
  await act(async () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("jokeContainer")).toBeInTheDocument();
  });
});

test("Renders empty joke correctly", async () => {
  mockedAxios.mockImplementationOnce(() => Promise.resolve(emptyMockJoke));

  await act(async () => {
    render(<Home />);
    await waitFor(() => [
      expect(screen.getByTestId("jokeText")).toHaveTextContent(""),
    ]);
  });
});

test("Renders a joke correctly", async () => {
  mockedAxios.mockImplementationOnce(() => Promise.resolve(filledMockJoke));

  await act(async () => {
    const { getByText } = render(<Home />);
    await waitFor(() => [expect(getByText("Chuck")).toBeTruthy()]);
  });
});
