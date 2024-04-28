import FoodList from '@/components/app/FoodList';
import Header from '@/components/app/Header';

function Homepage() {
  return (
    <>
      <Header />
      <main className="flex h-screen justify-center items-center w-screen m-0 p-0">
        <FoodList />
      </main>
    </>
  );
}

export default Homepage;
