// ONLY UI STYLING IMPROVEMENT..............

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log("Failed to load product", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold text-gray-600">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="flex items-center justify-center bg-gray-100 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description ||
                "No description available for this product."}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-extrabold text-green-600">
                ₹{product.price}
              </span>

              {product.stock > 0 ? (
                <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex gap-4">
            <button
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg
                         hover:bg-blue-700 active:scale-95 transition"
            >
              🛒 Add to Cart
            </button>

            {/* <button
              className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold text-lg
                         hover:bg-gray-100 active:scale-95 transition"
            >
              ❤️ Wishlist
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// ..........................................

// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useParams } from "react-router";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   const loadProduct = async () => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       setProduct(res.data.product); // ✅ correct
//     } catch (error) {
//       console.log("Failed to load product", error);
//     }
//   };

//   useEffect(() => {
//     loadProduct();
//   }, [id]);

//   if (!product) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="w-full h-40 object-contain rounded"
//       />
//       <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
//       <p className="text-gray-700 mt-2">{product.description}</p>
//       <p className="text-xl font-semibold mt-4">₹{product.price}</p>

//       <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
//         Add to Cart
//       </button>
//     </div>
//   );
// }
