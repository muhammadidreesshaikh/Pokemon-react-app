import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore, store } from "../store/store";
import { setupServer } from "msw/node";
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from "react-router-dom";
import PokemonList from "../components/PokemonList";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";

const server = setupServer(
    http.get(`${import.meta.env.VITE_BASE_API_URL}pokemon`, () => {
        return HttpResponse.json({ results: [{ name: "pikachu" }, { name: "bulbasaur" }] });
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PokemonList Component", () => {
    it("shows loading state initially", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PokemonList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders fetched Pokémon list", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PokemonList />
                </MemoryRouter>
            </Provider>
        );

        expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
        expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    });
});