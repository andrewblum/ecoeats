import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

const ONE_WEEK = 604800000;
const THREE_DAYS = 172800000;

function FoodListItem({ id, name, expiry, image, createdAt }) {
  const today = new Date();
  const expireDate = new Date(expiry);
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

  return (
    <Card className="flex flex-row relative overflow-hidden h-[144px]">
      <div className={cn('relative w-[32px]', color)} alt="expiry color" />
      <div className="w-[144px] h-[144px] bg-gray-100" alt="food image" />
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Expires: {expiry}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: add AI buttons */}
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">1</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>How to tell if your food is actually bad</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">2</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>What to do with your food if it is bad</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">3</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tips on how to keep this food fresh longer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FoodListItem;
