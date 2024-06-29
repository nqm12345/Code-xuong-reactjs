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
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";

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
        <Route path="/" element={<LayoutClient />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="/admin/product" element={<Dashboard />} />
            <Route path="/admin/add" element={<AddProduct />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
