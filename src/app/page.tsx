import Carousel from "./components/Carousel";
import Categories from "./components/Categories";
import ProductItem from "./components/ProductItem";


export default function Home() {
  return (
<div className="mt-16 bg-pink-100">
 <Categories/>
  <Carousel/>
  <ProductItem/>
</div>
  );
}
