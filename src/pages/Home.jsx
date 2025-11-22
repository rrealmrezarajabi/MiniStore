import Hero from "../components/Hero";
import { useQuery } from "@tanstack/react-query";
import { featuredProducts } from "../api/products";
import { Link } from "react-router-dom";
const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: featuredProducts,
    queryKey: ["featuredProducts"],
  });
  return (
    <div>
      <Hero />
      <section className="p-10">
        <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
          Featured Products
        </h2>
        {isError && <p className="text-center text-red-500">Error loading products.</p>}
        {isLoading ? (
          <p className="text-center text-blue-300">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((product) => (
              <div
                key={product.id}
                className="
                  bg-gray-800 
                  p-4 
                  rounded-xl 
                  shadow-lg 
                  flex flex-col items-center 
                  hover:scale-105 
                  transition 
                  h-[360px] 
                  justify-between
                "
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain"
                />

                <h3 className="font-semibold text-center line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-green-400 font-bold">${product.price}</p>

                <Link
                  to={`/products/${product.id}`}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
