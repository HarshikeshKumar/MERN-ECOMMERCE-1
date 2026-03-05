import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },

      { path: "/cart", element: <Cart /> },

      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/update/:id", element: <EditProduct /> },
      { path: "/admin/products/add", element: <AddProduct /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// ........................................

// import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// import AddProduct from "./admin/AddProduct";
// import EditProduct from "./admin/EditProduct";
// import ProductList from "./admin/ProductList";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import ProductDetails from "./pages/ProductDetails";
// import Signup from "./pages/Signup";
// import Nabvar from "./components/Navbar";
// import Cart from "./pages/Cart";

// function Layout() {
//   return (
//     <>
//       <Nabvar />
//       <Outlet />
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },
//       { path: "/product/:id", element: <ProductDetails /> },

//       { path: "/admin/products", element: <ProductList /> },
//       { path: "/admin/products/update/:id", element: <EditProduct /> },
//       { path: "/admin/products/add", element: <AddProduct /> },
//     ],
//   },
// ]);

// export default function App() {
//   return <RouterProvider router={router} />;
// }
