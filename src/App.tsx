import React, { useEffect, useState } from "react";
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Dashboard from "./AdminPages/admin/Dashboard";
import AddProduct from "./AdminPages/AddProduct/AddProduct";
import EditProduct from "./AdminPages/EditProduct/EditProduct";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import {
  AdminPrivateRouter,
  ClientPrivateRouter,
} from "./components/PrivateRouter/PrivateRouter";
import LayoutClient from "./components/LayoutClient/LayoutClient";
import LayoutAdmin from "./components/LayoutAdmin/LayoutAdmin";

const App: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Client Routes */}
        <Route element={<LayoutClient />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminPrivateRouter />}>
          <Route index element={<LayoutAdmin />} />
          <Route path="product" element={<Dashboard />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>

        {/* Client Private Routes */}
        <Route path="/client/*" element={<ClientPrivateRouter />}>
          <Route element={<LayoutClient />} />
          {/* Define client-specific routes here if needed */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
