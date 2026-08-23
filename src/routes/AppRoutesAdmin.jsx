import { Routes, Route, Navigate } from "react-router-dom";

import Admin, { Dashboard } from "../pages/admin/Admin";
import Users from "../pages/admin/Users";
import Classess from "../pages/admin/Classess";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route path="" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="classes" element={<Classess/>} />
      </Route>
    </Routes>
  );
};
