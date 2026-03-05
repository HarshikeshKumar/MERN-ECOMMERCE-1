// .............................
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Cart() {
  const userId = localStorage.getItem("userId");

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load Cart Data
  const loadCart = async () => {
    if (!userId) return;

    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.log("Error loading cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  // Remove Item
  const removeItem = async (productId) => {
    try {
      await api.post(`/cart/remove`, { userId, productId });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log("Error removing item", error);
    }
  };

  // Update Quantity
  const updateQty = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    try {
      await api.post(`/cart/update`, { userId, productId, quantity });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log("Error updating quantity", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Cart...
      </div>
    );
  }

  if (!cart || !cart.items) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Cart not found
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          Your Cart is Empty
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex flex-col md:flex-row md:items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-20 h-20 object-contain bg-white rounded"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.productId.title}
                    </h2>

                    <p className="text-green-600 font-medium">
                      ₹{item.productId.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-semibold text-lg">{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty(item.productId._id, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <div className="mt-4 md:mt-0 text-lg font-semibold">
                  ₹{(item.productId.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="mt-4 md:mt-0 text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-8 border-t pt-6 flex justify-end  items-center">
            <h2 className="text-2xl font-bold">
              Total:
              <span className="text-green-600 ml-2">₹{total.toFixed(2)}</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

// ....................................

// import { useState, useEffect } from "react";
// import api from "../api/axios";

// export default function Cart() {
//   const userId = localStorage.getItem("userId");

//   const [cart, setCart] = useState(null);

//   // Load Cart Data
//   const loadCart = async () => {
//     if (!userId) return;
//     const res = await api.get(`/cart/${userId}`);
//     setCart(res.data);
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const removeItem = async (productId) => {
//     await api.post(`/cart/remove`, { userId, productId });
//     loadCart();
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   // Update Item quantity
//   const updateQty = async (productId, quantity) => {
//     if (quantity === 0) {
//       await removeItem(productId);
//       return;
//     }

//     await api.post(`/cart/update`, { userId, productId, quantity });
//     loadCart();
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   if (!cart) {
//     return <div>Loading...</div>;
//   }

//   const total = cart.items.reduce(
//     (sum, item) => sum + item.productId.price * item.quantity,
//     0,
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.items.length === 0 ? (
//         <div>Your Cart is empty.</div>
//       ) : (
//         <div className="space-y-4">
//           {cart.items.map((item) => (
//             <div
//               key={item.productId._id}
//               className="flex items-center justify-between p-4 border rounded"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.productId.image}
//                   alt={item.productId.title}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <h1 className="text-lg font-semibold">
//                     {item.productId.title}
//                   </h1>
//                   <p className="text-gray-600">
//                     ₹{item.productId.price.toFixed(2)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() =>
//                     updateQty(item.productId._id, item.quantity - 1)
//                   }
//                   className="px-2 py-1 bg-gray-200 rounded"
//                 >
//                   -
//                 </button>

//                 <span>{item.quantity}</span>

//                 <button
//                   onClick={() =>
//                     updateQty(item.productId._id, item.quantity + 1)
//                   }
//                   className="px-2 py-1 bg-gray-200 rounded"
//                 >
//                   +
//                 </button>
//               </div>

//               <div>
//                 <p className="font-semibold">
//                   ₹{(item.productId.price * item.quantity).toFixed(2)}
//                 </p>
//               </div>

//               <button
//                 onClick={() => removeItem(item.productId._id)}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <div className="text-right mt-4">
//             <h2 className="text-xl font-bold">
//               Total:{" "}
//               <span className="text-green-600 font-bold">
//                 ₹{total.toFixed(2)}
//               </span>
//             </h2>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
