import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Info, Lightbulb, Recycle, Trash2 } from 'lucide-react';
import AIFoodTipModal from './AIFoodTipModal';
import { useCallback } from 'react';

const ONE_WEEK = 604800000;
const THREE_DAYS = 172800000;

function FoodListItem({ id, name, expirationDate, image, setFood }) {
  const today = new Date();
  const expireDate = new Date(expirationDate);
  const timeToExpire = expireDate - today;
  let color = '';

  if (timeToExpire <= 0) {
    color = 'bg-tangerine';
  } else if (timeToExpire <= THREE_DAYS) {
    color = 'bg-light-orange';
  } else if (timeToExpire <= ONE_WEEK) {
    color = 'bg-vanilla';
  } else {
    color = 'bg-tea-green';
  }

  const handleDeleteFood = useCallback(() => {
    fetch(`/api/food/${id}`, {
      method: 'DELETE',
    }).then(() =>
      setFood((food) => food.filter(({ id: foodId }) => id !== foodId)),
    );
  }, [id, setFood]);

  return (
    <Card className="flex flex-row relative overflow-hidden h-[144px] shrink-0 border-0 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all ease-out">
      <div
        className={cn('relative w-[32px] shrink-0', color)}
        alt="expiry color"
      />
      <img
        src={image}
        className="w-[144px] h-[144px] bg-gray-100 shrink-0"
        alt="food image"
      />
      <div className="flex flex-col justify-center gap-2 py-4 px-6 grow shrink-0">
        <CardHeader className="m-0 p-0">
          <CardTitle>{name}</CardTitle>
          <CardDescription>Expires: {expirationDate}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 m-0 p-0 shrink-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Info />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AIFoodTipModal title={`How do I know if ${name} is bad?`} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Recycle />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AIFoodTipModal title={`What can I do with expired ${name}?`} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Lightbulb />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AIFoodTipModal
                title={`How can I keep ${name} fresh?`}
                name={name}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </div>
      <CardFooter className="m-0 p-4 shrink-0">
        <Button variant="destructive" onClick={handleDeleteFood}>
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FoodListItem;
