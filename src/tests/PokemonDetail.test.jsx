import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from "../store/store";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import PokemonDetail from "../components/PokemonDetail";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";

const mockPokemonDetails = {
  name: "pikachu",
  height: 4,
  weight: 60,
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
};

const server = setupServer(
  http.get(`${import.meta.env.VITE_BASE_API_URL}pokemon`, ({ params }) => {
    const { id } = params;
    if (id === "25") {
      return HttpResponse.json(mockPokemonDetails);
    }
    return new HttpResponse(null, { status: 500 });
  })
);

// Setup mock API handlers
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PokemonDetail Component", () => {
  it("shows loading state initially", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/25"]}>
          <Routes>
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders Pokémon details on successful API response", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/25"]}>
          <Routes>
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByRole("name")).toBeInTheDocument();
    expect(await screen.findByRole("height")).toBeInTheDocument();
    expect(await screen.findByRole("weight")).toBeInTheDocument();
    expect(await screen.findByRole("img")).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    );
  });
});