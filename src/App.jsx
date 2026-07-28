import { Routes, Route, Navigate } from "react-router-dom";

import ThemeContext from "./context/ThemeContext";
import { AdminRoute } from "./routes/AppRoutesAdmin";
import UserRouter from "./routes/AppRoutesUser";


function App() {

  return (
   
      <Routes>
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/*" element={<UserRouter />} />
      </Routes>
 
  );
}

export default App;