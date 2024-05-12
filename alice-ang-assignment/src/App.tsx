import { useProducts } from "./lib/queries";

function App() {
  const products = useProducts();

  console.log(products.data.data);

  return <main className="min-h-screen"></main>;
}

export default App;
