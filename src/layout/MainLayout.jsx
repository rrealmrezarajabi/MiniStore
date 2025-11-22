import NavBar from "../components/NavBar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="p-6">{children}</main>
    </div>
  );
}

export default MainLayout
