import FoodListItem from '@/components/app/FoodListItem';
import AddFoodModal from '@/components/app/AddFoodModal';
import { useState, useEffect } from 'react';

function FoodList() {
  const [food, setFood] = useState([]);

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

  useEffect(() => {
    fetch('/api/user/1/food')
      .then((resp) => resp.json())
      .then((data) => setFood(data));
  });

  return (
    <section>
      {/* TODO: sorting */}
      <div>Sort by: Expiration Date | Date Added</div>
      {food.map(({ id, name, expirationDate, content }) => (
        <FoodListItem
          key={id}
          id={id}
          name={name}
          exexpirationDatepiry={expirationDate}
          image={content}
        />
      ))}
      <AddFoodModal />
    </section>
  );
}

export default FoodList;
