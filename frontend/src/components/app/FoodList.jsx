import FoodListItem from '@/components/app/FoodListItem';
import AddFoodModal from '@/components/app/AddFoodModal';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function FoodList() {
  const [food, setFood] = useState([]);
  // const [orderByDate, setOrderByDate] = useState(false);

  // const items = [
  //   {
  //     id: '1',
  //     name: 'Maple syrup',
  //     expiry: '2025-04-01',
  //     image: '',
  //     createdAt: '2024-03-01',
  //   },
  //   {
  //     id: '2',
  //     name: 'Strawberries',
  //     expiry: '2024-04-30',
  //     image: '',
  //     createdAt: '2024-04-25',
  //   },
  //   {
  //     id: '3',
  //     name: 'Mushrooms',
  //     expiry: '2024-05-05',
  //     image: '',
  //     createdAt: '2024-04-26',
  //   },
  //   {
  //     id: '4',
  //     name: 'Milk',
  //     expiry: '2024-04-01',
  //     image: '',
  //     createdAt: '2024-03-23',
  //   },
  // ];

  const createFoods = () => {
    let foods = food;
    // console.log(foods);
    // if (orderByDate) {
    //   foods = [...food].sort((a, b) => {
    //     console.log({ a, b });
    //     return new Date(a.createdAt) - new Date(b.createdAt);
    //   });
    // }
    // console.log({
    //   original: food.map((el) => el.name),
    //   sorted: foods.map((el) => el.name),
    // });

    let foodsList = foods.map(({ id, name, expirationDate, content }) => (
      <FoodListItem
        key={id}
        id={id}
        name={name}
        expirationDate={expirationDate}
        image={content}
      />
    ));

    return foodsList;
  };

  useEffect(() => {
    fetch('/api/user/1/food')
      .then((resp) => resp.json())
      .then((data) => setFood(data));
  }, []);

  return (
    <section className="flex flex-col w-8/12 h-screen pb-10 gap-4 max-w-[1080px]">
      <div className="pt-2" />
      <div>
        {/* <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger
              value="expiration"
              onClick={() => setOrderByDate(false)}
            >
              Expiration Date
            </TabsTrigger>
            <TabsTrigger value="dateAdded" onClick={() => setOrderByDate(true)}>
              Date Added
            </TabsTrigger>
          </TabsList>
        </Tabs> */}
      </div>
      {createFoods()}
      <AddFoodModal />
      <div className="pb-10" />
    </section>
  );
}

export default FoodList;
