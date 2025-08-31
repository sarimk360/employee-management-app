'use client';

import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const employeeSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9]{10,15}$/.test(val),
      'Phone must be 10–15 digits'
    ),
  role: z.enum(['Developer', 'Designer', 'Manager']),
  joiningDate: z
    .string()
    .refine(
      (val) => new Date(val) <= new Date(),
      'Joining date must be today or in the past'
    ),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface Props {
  onSubmit: (data: EmployeeFormValues) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function EmployeeForm({ onSubmit, isOpen, setIsOpen }: Props) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'Developer',
      joiningDate: '',
    },
  });

  const handleSubmit = (data: EmployeeFormValues) => {
    onSubmit(data);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          phone: data.phone || 'N/A',
          role: data.role,
          joiningDate: data.joiningDate,
          title: 'Employee Submission',
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('✅ Email sent successfully:', result.text);
        },
        (error) => {
          console.error('❌ Email sending failed:', error.text);
        }
      );
    form.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new employee.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <FormControl>
                    <Input
                      id='name'
                      autoComplete='name'
                      placeholder='John Doe'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input
                      id='email'
                      placeholder='john@example.com'
                      type='email'
                      autoComplete='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='phone'>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input
                      id='phone'
                      autoComplete='tel'
                      placeholder='Enter your phone number'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id='role'>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Developer'>Developer</SelectItem>
                          <SelectItem value='Designer'>Designer</SelectItem>
                          <SelectItem value='Manager'>Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='joiningDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='joiningDate'>Joining Date</FormLabel>
                    <FormControl>
                      <Input
                        id='joiningDate'
                        type='date'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type='submit'
              className='w-full mt-2'
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
