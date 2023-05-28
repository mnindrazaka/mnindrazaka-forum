import { Hello } from "./Hello";
import { render, screen } from "@testing-library/react";

test("loads and displays greeting", async () => {
  render(<Hello />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
