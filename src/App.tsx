import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { TasksProvider } from "./contexts/TasksContext";
import UpdatePrompt from "./components/shared/UpdatePrompt";

function App() {
  return (
    <ThemeProvider>
      <CategoriesProvider>
        <TasksProvider>
          <RouterProvider router={router} />
          <UpdatePrompt />
        </TasksProvider>
      </CategoriesProvider>
    </ThemeProvider>
  );
}

export default App;
