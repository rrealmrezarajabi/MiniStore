import { useQuery } from "@tanstack/react-query"
import {allProducts} from "../api/products"
import { Link } from "react-router-dom";
const Products = () => {

  const { data, isLoading, isError } = useQuery({
    queryFn: allProducts,
    queryKey: ["allProducts"],
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {data.map((p) => (
        <div
          key={p.id}
          className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          <img
            src={p.image}
            alt={p.title}
            className="h-48 object-contain mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold text-white mb-2 truncate">
            {p.title}
          </h2>
          <div className="flex flex-col justify-center items-center">
            <p className="text-green-400 mb-3">${p.price}</p>

            <Link
              to={`/products/${p.id}`}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products
