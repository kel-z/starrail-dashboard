import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import { HsrDataProvider } from "./stores/database-store";
import routes from "./routes";

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
