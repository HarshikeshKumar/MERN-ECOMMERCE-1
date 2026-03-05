// ........................
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}`,
      );

      setProducts(Array.isArray(res.data.product) ? res.data.product : []);
    } catch (error) {
      console.log("Error loading products", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first");
        return;
      }

      const res = await api.post(`/cart/add`, { userId, productId });

      // simple cart count
      localStorage.setItem("cartCount", res.data.cart.items.length);

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Item added to cart");
    } catch (error) {
      console.log("Add to cart error", error);
    }
  };

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-4 flex gap-3">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Phone">Phone</option>
          <option value="Tablet">Tablet</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-3 rounded shadow hover:shadow-lg transition"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain rounded bg-white"
              />

              <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
              <p className="text-green-600">₹{product.price}</p>
            </Link>

            <button
              onClick={() => addToCart(product._id)}
              className="w-full mt-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ...................................

// import { use, useEffect, useState } from "react";

// import api from "../api/axios";
// import { Link } from "react-router";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");

//   // const loadProducts = async () => {
//   //   const res = await api.get(
//   //     `/products?search=${search}&category=${category}`,
//   //   );
//   //   setProducts(res.data);
//   // };

//   const loadProducts = async () => {
//     try {
//       const res = await api.get(
//         `/products?search=${search}&category=${category}`,
//       );

//       // SAFETY CHECK
//       setProducts(Array.isArray(res.data.product) ? res.data.product : []);
//     } catch (error) {
//       console.log("Error loading products", error);
//       setProducts([]); // fallback
//     }
//   };

//   useEffect(() => {
//     loadProducts();
//   }, [search, category]);

//   const addToCart = async (productId) => {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       alert("Please Login to add items to your cart.");
//       return;
//     }

//     const res = await api.post(`/cart/add`, { userId, productId });

//     const total = res.data.cart.items.reduce(
//       (sum, item) => sum + item.productId.price * item.quantity,
//       0,
//     );

//     localStorage.setItem("cartCount", total);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   return (
//     <div className="p-6">
//       {/* Search */}
//       <div className="mb-4 flex gap-3">
//         <input
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-3 py-2 rounded w-1/2"
//         />

//         {/* Category filter */}
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border px-3 py-2 rounded"
//         >
//           <option value="">All Categories</option>
//           <option value="Laptop">Laptop</option>
//           <option value="Phone">Phone</option>
//           <option value="Tablet">Tablet</option>
//         </select>
//       </div>

//       {/* Products grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//         {products.map((product) => (
//           <Link
//             key={product._id}
//             to={`/product/${product._id}`}
//             className="border p-3 rounded shadow hover:shadow-lg transition"
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-40 object-contain rounded bg-white"
//             />
//             <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
//             <p className="text-green-600">₹{product.price}</p>

//             <button
//               onClick={() => addToCart(product._id)}
//               className="w-full mt-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
//             >
//               Add to Cart
//             </button>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
