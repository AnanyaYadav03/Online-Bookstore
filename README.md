**Overview **

Frontend: React.js for user interface and user interactions. 

Backend: Spring Boot REST API for business logic and data management. 

Database: MySQL for Storing books, users, and orders data. 

State Management: React Context API to manage the shopping cart globally. 

 

**Key Features **

1. Book Listing and Search 

Frontend: 

Fetches the list of books from backend API (GET /api/books) on page load. 

Displays books with details like title, author, price, and available quantity. 

Users can search books by title using a search input. 

Clicking a book shows detailed info and allows selecting quantity to add to cart. 

Backend: 

Provides REST endpoint to fetch all books. 

Manages book data including stock quantity. 

 

2. Shopping Cart 

Frontend: 

Uses React Context API (CartContext) to store cart items globally. 

Users can add books with desired quantities to the cart. 

Cart persists in localStorage so it survives page reloads. 

Cart page allows users to view, update quantities, or remove items. 

Backend: 

No direct cart storage; cart state is managed client-side until checkout. 

 

3. User Authentication 

Frontend: 

Users can register and login. 

User info is stored in localStorage after login. 

Authenticated state controls access to protected routes (e.g., admin panel). 

Backend: 

Provides endpoints for user registration and login. 

Validates credentials and returns user data. 

 

4. Bulk Checkout and Order Placement 

Frontend: 

On checkout, the app collects all cart items. 

Sends a single POST request with the username and an array of order items to backend (POST /api/orders). 

On success, clears the cart and navigates to order confirmation or orders page. 

Backend: 

Accepts bulk order requests. 

Validates each item: checks book existence and available stock. 

Deducts ordered quantities from book stock atomically. 

Saves each order item in the database. 

Returns the list of saved orders as confirmation. 

 

5. Admin Panel  

Allows managing books, orders, and users. 

Protected route accessible only to admin users. 

 

**Technical Highlights **

React Context API: Efficient global state management for cart. 

Persisting Cart: Using localStorage to keep cart data across sessions. 

RESTful API Design: Clear separation of frontend and backend concerns. 

Bulk Order Processing: Backend processes multiple order items in one transaction, ensuring data consistency. 

Error Handling: Frontend shows validation errors from backend (e.g., insufficient stock). 

Routing: React Router for SPA navigation. 

Security: Basic authentication flow with protected routes. 

 
