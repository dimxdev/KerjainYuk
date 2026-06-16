import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { TasksProvider } from "./contexts/TasksContext";

function App() {
  return (
    <ThemeProvider>
      <CategoriesProvider>
        <TasksProvider>
          <RouterProvider router={router} />
        </TasksProvider>
      </CategoriesProvider>
    </ThemeProvider>
  );
}

export default App;
