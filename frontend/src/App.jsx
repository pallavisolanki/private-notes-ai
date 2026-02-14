//frontend\src\App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import ViewNote from "./pages/ViewNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/note/:id" element={<ViewNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;