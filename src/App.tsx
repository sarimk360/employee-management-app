import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  RedirectToSignIn,
} from '@clerk/clerk-react';
import EmployeeForm from './layout/EmployeeForm';
import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import EmployeeTable from './layout/EmployeeTable';
import { z } from 'zod';

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
type EmployeeFormValues = z.infer<typeof employeeSchema>;
function App() {
  const [employees, setEmployees] = useState<EmployeeFormValues[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('employees');
    if (stored) setEmployees(JSON.parse(stored));
  }, []);

  const handleAddEmployee = (data: EmployeeFormValues) => {
    const updated = [data, ...employees];
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setIsModalOpen(false);
  };
  const handleDeleteEmployee = (employee: EmployeeFormValues) => {
    const updated = employees.filter((e) => e !== employee);
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
  };
  return (
    <div>
      <header className='flex justify-between items-center p-4 border-b'>
        <h1 className='text-xl font-bold'>Employee Management</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </header>

      <main className='p-6'>
        <SignedIn>
          <div className=' mx-auto flex-col'>
            <Button onClick={() => setIsModalOpen(true)}>Add Employee</Button>
            <EmployeeForm
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              onSubmit={handleAddEmployee}
            />
            <EmployeeTable
              employees={employees}
              onDelete={handleDeleteEmployee}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>
    </div>
  );
}

export default App;
