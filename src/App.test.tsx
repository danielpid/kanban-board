import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Kanban Board", () => {
  it("renders columns", () => {
    render(<App />);
    expect(screen.getByText(/Kanban Board/)).toBeInTheDocument();
    expect(screen.getByText("Todo")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});