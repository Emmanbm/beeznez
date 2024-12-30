import { describe } from "vitest";
import DashboardCard from "../src/components/Dashboard/DashboardCard";
import { render } from "./testConfig";
import { screen } from "@testing-library/react";

describe("DashboardCard Component", () => {
  it("renders DashboardCard correctly with given props", () => {
    const mockCard = { title: "Test Card", value: "123" };

    render(<DashboardCard card={mockCard} />);

    // Vérifie le titre et la valeur
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
  });
});
