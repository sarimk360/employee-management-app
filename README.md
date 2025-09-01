Here’s your full **README.md** properly formatted in Markdown:

````markdown
# Employee Management App

A simple employee management app built with **React + TypeScript**, integrating modern tools like **Clerk (authentication)**, **React Hook Form + Zod (form validation)**, **AG Grid (data table)**, **ShadCN UI (styling)**, and **EmailJS (email trigger)**.

---

## Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/your-username/employee-management-app.git
cd employee-management-app
npm install
````

### 2. Environment Variables

Create a `.env` file in the project root:

```env
# Clerk (Authentication)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# EmailJS (Email sending)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Run the App

```bash
npm run dev
```

---

## Login Credentials

This app uses **Clerk** for authentication. To test the app, you can log in with the following credentials:

- **Email:** sarimtest@gmail.com  
- **Password:** Kolkata@#123

> Note: Only this email account is registered in Clerk for testing. Other emails will not be able to access the app unless added in the Clerk dashboard.


## How I Approached the Task

I followed the assignment step by step, learning each library and implementing features incrementally:

### 1. Authentication (Clerk)

* Integrated Clerk so only authenticated users can access the app.

### 2. Employee Form with Validation

* Used **React Hook Form** for state handling.
* Used **Zod** for schema validation:

  * **Name:** required, min 3 chars
  * **Email:** required, valid format
  * **Phone:** optional, 10–15 digits
  * **Role:** required (Developer, Designer, Manager)
  * **Joining Date:** must be today or earlier

### 3. Display Data in AG Grid

* Displayed submitted employees in an **AG Grid** table.
* Enabled **sorting and filtering** on all columns.

### 4. Styling with ShadCN UI

* Used **Dialog, Form, Input, Button, Select** from ShadCN for a clean UI.
* Arranged fields like **Role** and **Joining Date** side by side using **Tailwind grid**.

### 5. Data Persistence

* Used **localStorage** to persist employees across page refreshes:

```ts
localStorage.setItem('employees', JSON.stringify(updatedEmployees));
```

* On app load, restored data with:

```ts
JSON.parse(localStorage.getItem('employees'))
```

### 6. Email Trigger

* Integrated **EmailJS** to send submitted employee details.
* Secured keys in `.env` file using `VITE_` prefix (required by Vite).

---

## Tech Stack

* **React 18 + TypeScript**
* **Clerk** → Authentication
* **React Hook Form + Zod** → Form handling & validation
* **ShadCN UI** → UI components & styling
* **AG Grid** → Table rendering
* **EmailJS** → Email sending
* **LocalStorage** → Data persistence

---

## Features

* **Authentication (Clerk):** Only logged-in users can access the app.
* **Employee Form:** Collects name, email, phone, role, and joining date with validation.
* **Validation with Zod:** Enforces rules (e.g., min 3 chars name, valid email, phone digits, past date).
* **Data Display:** Employee list displayed in **AG Grid** with sorting & filtering.
* **Styling:** Modern, responsive UI using **ShadCN components + Tailwind**.
* **Persistence:** Uses **localStorage** to persist employees across refreshes.
* **Email Trigger:** On successful form submission, details are sent via **EmailJS**.

---

## Future Improvements

* Add **unit tests** with Jest + React Testing Library.
* Use **Zustand or Redux** for centralized state management.
* Add **responsive UI & dark mode** support.

---

## Key Takeaways

* Learned to combine **React Hook Form + Zod** for robust validation.
* Fixed **accessibility issues** with `id`, `htmlFor`, and `autocomplete`.
* Used `onOpenChange` in **Dialog** to reset the form on modal close.
* Secured sensitive keys with **.env**.
* Built a **fully functional mini app** demonstrating multiple modern tools.

```
