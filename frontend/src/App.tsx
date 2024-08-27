import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TodoItemsPage from "./pages/TodoItemsPage/TodoItemsPage";
import CreateTodoItemsPage from "./pages/CreateTodoItemsPage/CreateTodoItemsPage";
import EditTodoItemsPage from "./pages/EditTodoItemsPage/EditTodoItemsPage";
import NavBar from "./components/NavBar/NavBar";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-[#f3f4f6] h-screen w-screen">
          <NavBar></NavBar>
          <div className="pt-12 m-2">
            <Routes>
              <Route path="/" element={<TodoItemsPage />} />
              <Route path="/todos/new" element={<CreateTodoItemsPage />} />
              <Route path="/todos/:id/edit" element={<EditTodoItemsPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
