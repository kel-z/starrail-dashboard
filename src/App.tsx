import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import { routes } from "./routes";
import { HsrDataProvider } from "./providers/hsr-data-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HsrDataProvider>
        <RouterProvider router={routes} />
      </HsrDataProvider>
    </ThemeProvider>
  );
}

export default App;
