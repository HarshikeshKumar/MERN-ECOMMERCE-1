import { use, useEffect, useState } from "react";

import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // const loadProducts = async () => {
  //   const res = await api.get(
  //     `/products?search=${search}&category=${category}`,
  //   );
  //   setProducts(res.data);
  // };

  const loadProducts = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}`,
      );

      // SAFETY CHECK
      setProducts(Array.isArray(res.data.product) ? res.data.product : []);
    } catch (error) {
      console.log("Error loading products", error);
      setProducts([]); // fallback
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

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

        {/* Category filter */}
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

      {/* Products grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border p-3 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain rounded bg-white"
            />
            <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
            <p className="text-green-600">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
