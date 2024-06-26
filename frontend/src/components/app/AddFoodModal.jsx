import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CalendarIcon, Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  expirationDate: z
    .string({ required_error: 'An expiration date is required.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/),
  content: z.string(),
});

function AddFoodModal({ setFood }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      date: '',
      expirationDate: '',
      content: '',
    },
  });

  function onSubmit(values) {
    const data = {
      name: values.name,
      content: values.content,
      userId: 1,
      expirationDate: values.expirationDate,
    };
    fetch('/api/food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        form.reset();
        setFood((food) => [...food, data]);
        setOpen(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* TODO: Determine placement */}
      <DialogTrigger className="flex justify-center items-center text-white bg-tiffany-blue w-[56px] h-[56px] rounded-full drop-shadow-xl fixed bottom-10 right-10 hover:scale-125 transition-all">
        <Plus size={44} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiration Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          form.setValue(
                            'expirationDate',
                            date.toISOString().split('T')[0],
                          );
                          field.onChange(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddFoodModal;
