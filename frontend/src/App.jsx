import { createBrowserRouter, RouterProvider } from "react-router";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/product/:id", element: <ProductDetails /> },

  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/update/:id", element: <EditProduct /> },
  { path: "/admin/products/add", element: <AddProduct /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
