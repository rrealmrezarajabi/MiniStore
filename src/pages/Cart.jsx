import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, decreaseQty, increaseQty } =
    useCart();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="text-center text-gray-300 text-2xl mt-20">
        Your cart is empty 🛒
      </div>
    );

  return (
    <div className="p-10">
      <h1 className="text-3xl text-blue-400 font-bold mb-10">Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex items-center gap-4 w-2/3">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-contain rounded-md bg-gray-900"
              />
              <h2 className="text-lg font-semibold text-white leading-tight max-w-[300px]">
                {item.title}
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-gray-100 font-bold whitespace-nowrap">
                Price : ${item.price}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-2 rounded"
                >
                  -
                </button>

                <span className="text-white font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-2 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right flex justify-center gap-4">
        <button
          onClick={() => clearCart()}
          className="bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1 cursor-pointer"
        >
          Clear
        </button>
        <h2 className="text-2xl font-bold text-green-400">
          Total: ${totalPrice.toFixed(2)}
        </h2>
      </div>
    </div>
  );
}
