import { Routes, Route, Navigate } from "react-router-dom";

import Admin, { Dashboard } from "../pages/admin/Admin";
import Users from "../pages/admin/Users";
import Classess from "../pages/admin/Classess";
import Trainer from "../pages/admin/Trainer";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route path="" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="classes" element={<Classess/>} />
        <Route path="trainers" element={<Trainer/>}/>
      </Route>
    </Routes>
  );
};
