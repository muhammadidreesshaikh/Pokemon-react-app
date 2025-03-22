import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";

test("renders Navbar with home link", () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    expect(screen.getByText(/react pokemon app/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
});