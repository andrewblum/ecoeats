import FoodListItem from '@/components/app/FoodListItem';
import AddFoodModal from '@/components/app/AddFoodModal';

function FoodList() {
  // TODO: fetch foods for user id
  const items = [
    {
      id: '1',
      name: 'Maple syrup',
      expiry: '2025-04-01',
      image: '',
      createdAt: '2024-03-01',
    },
    {
      id: '2',
      name: 'Strawberries',
      expiry: '2024-04-30',
      image: '',
      createdAt: '2024-04-25',
    },
    {
      id: '3',
      name: 'Mushrooms',
      expiry: '2024-05-05',
      image: '',
      createdAt: '2024-04-26',
    },
    {
      id: '4',
      name: 'Milk',
      expiry: '2024-04-01',
      image: '',
      createdAt: '2024-03-23',
    },
  ];

  return (
    <section>
      {/* TODO: sorting */}
      <div>Sort by: Expiration Date | Date Added</div>
      {items.map(({ id, name, expiry, image, createdAt }) => (
        <FoodListItem
          key={id}
          name={name}
          expiry={expiry}
          image={image}
          createdAt={createdAt}
        />
      ))}
      <AddFoodModal />
    </section>
  );
}

export default FoodList;
