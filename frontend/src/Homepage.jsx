import FoodList from '@/components/app/FoodList';
import Header from '@/components/app/Header';

function Homepage() {
  return (
    <>
      <Header />
      <main className="container flex h-screen justify-center items-center">
        <FoodList />
      </main>
    </>
  );
}

export default Homepage;
