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
import { Trash2 } from 'lucide-react';
import AIFoodTipModal from './AIFoodTipModal';

const ONE_WEEK = 604800000;
const THREE_DAYS = 172800000;

function FoodListItem({ id, name, expirationDate, image }) {
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

  const handleDeleteFood = () => {
    fetch(`/api/food/${id}`, {
      method: 'DELETE',
    })
  }

  return (
    <Card className="flex flex-row relative overflow-hidden h-[144px]">
      <div className={cn('relative w-[32px]', color)} alt="expiry color" />
      <img src={image} className="w-[144px] h-[144px] bg-gray-100" alt="food image" />
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Expires: {expirationDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">1</Button>
              </DialogTrigger>
              <DialogContent>
                <AIFoodTipModal
                  title={`How do I know if ${name} is bad`}
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button variant="outline">2</Button>
              </DialogTrigger>
              <DialogContent>
                <AIFoodTipModal
                  title={`What can I do with expired ${name}`}
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button variant="outline">3</Button>
              </DialogTrigger>
              <DialogContent>
                <AIFoodTipModal
                  title={`How can I keep ${name} fresh`}
                  name={name}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button variant="destructive" onClick={handleDeleteFood}>
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FoodListItem;
