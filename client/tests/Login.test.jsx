import { describe, expect, it, vi } from "vitest";
import Login from "../src/pages/Login";
import { render } from "./testConfig";
import { screen, waitFor, fireEvent } from "@testing-library/react";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Mock de useNavigate
  };
});
// Mock pour useServerApi
vi.mock("../src/hooks/useServerApi.js", () => ({
  default: vi.fn(() => [
    { loading: false, error: null },
    vi.fn().mockImplementation((params) => {
      console.log(params);
      if (params.data.password === "correctpassword") {
        return Promise.resolve({
          data: { user: { id: 1, name: "Test User" } },
        });
      } else {
        return Promise.reject({
          response: { data: { message: "Identifiants incorrects" } },
        });
      }
    }),
  ]),
}));

describe("Login Component", () => {
  it("renders the login form correctly", () => {
    const { container } = render(<Login />);
    // Vérifie les champs du formulaire
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();

    // Vérifie le bouton de soumission
    expect(
      screen.getByRole("button", { name: /Se connecter/i })
    ).toBeInTheDocument();
  });

  it("should not redirect to dashboard after login failed", async () => {
    const { container } = render(<Login />);
    // Remplit les champs du formulaire avec des identifiants invalides
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "wrongpassword" },
    });
    // Soumet le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/i }));

    // Vérifie que useNavigate n'est pas appelé avec "/auth/dashboard"
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalledWith("/auth/dashboard");
      // expect(screen.getByText(/Identifiants incorrects/i)).toBeInTheDocument();
    });
  });

  it("redirects to dashboard upon successful login", async () => {
    render(<Login />);
    // Remplit les champs du formulaire
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "correctpassword" },
    });
    // Soumet le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Se connecter/i }));
    // Vérifie que useNavigate est appelé avec "/auth/dashboard"
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/auth/dashboard");
    });
  });
});
