import { describe, expect, it, vi } from "vitest";
import { render } from "./testConfig";
import { screen, waitFor } from "@testing-library/react";
import Dashboard from "../src/pages/Dashboard";
import useServerApi from "../src/hooks/useServerApi";

// Mock pour useServerApi
vi.mock("../src/hooks/useServerApi", () => ({
  default: vi.fn(),
}));

describe("Dashboard Component", () => {
  it("renders the dashboard with a welcome message", () => {
    useServerApi.mockReturnValue([{ loading: false, error: null }, vi.fn()]);
    render(<Dashboard />);
    // Vérifie que le titre s'affiche avec le nom de l'utilisateur
    expect(
      screen.getByText(/Bienvenue sur la Dashboard, John/i)
    ).toBeInTheDocument();
  });

  it("displays a loading state", () => {
    useServerApi.mockReturnValue([{ loading: true, error: null }, vi.fn()]);
    render(<Dashboard />);
    // Vérifie que l'état de chargement est affiché
    expect(screen.getByText(/Chargement.../i)).toBeInTheDocument();
  });

  it("displays an error message when the API call fails", () => {
    useServerApi.mockReturnValue([
      { loading: false, error: { message: "Erreur serveur" } },
      vi.fn(),
    ]);
    render(<Dashboard />);
    // Vérifie que le message d'erreur est affiché
    expect(screen.getByText(/Erreur: Erreur serveur/i)).toBeInTheDocument();
  });

  it("displays stats correctly when data is available", async () => {
    const mockStats = [
      { title: "Statistique 1", value: "100" },
      { title: "Statistique 2", value: "200" },
    ];
    useServerApi.mockReturnValue([
      { loading: false, error: null },
      vi.fn().mockResolvedValue({ data: mockStats }),
    ]);
    render(<Dashboard />);
    // Attendre que les statistiques soient rendues
    await waitFor(() => {
      expect(screen.getByText(/Statistique 1/i)).toBeInTheDocument();
      expect(screen.getByText(/100/i)).toBeInTheDocument();
      expect(screen.getByText(/Statistique 2/i)).toBeInTheDocument();
      expect(screen.getByText(/200/i)).toBeInTheDocument();
    });
  });
});
