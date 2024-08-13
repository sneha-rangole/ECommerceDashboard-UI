# Admin Dashboard

## Overview of the Front-end Interface

The front-end interface is designed to enhance user experience, providing easy access to the application’s functionalities. Key features include:

### 1. Create New Order
Users can easily create new orders by filling out a form that includes:
- Order ID
- User ID
- Selected products
- Total amount
- Order status

This form submits data to the database, creating a new order record.
![image](https://github.com/user-attachments/assets/3564750b-79f7-40d4-b2ce-176aef22c874)

### 2. Create New Product
Authorized users can add new products through a dedicated interface. This includes fields for:
- Product name
- Description
- Price
- Category
![image](https://github.com/user-attachments/assets/29d947a9-da52-4333-9e50-68a0b2fcb5ea)

### 3. View All Orders and Products
Users can view all existing orders and products in a structured format. Each entry provides essential details:
- **Orders:** Order number, user ID, list of products, total amount, and status (e.g., completed, shipped, pending).
- ![image](https://github.com/user-attachments/assets/0748d7a8-1a38-4af9-a40c-272e1de25cb4)

- **Products:** Product name, description, category, and price, along with options to edit or delete products.
- ![image](https://github.com/user-attachments/assets/4389df59-9c9b-4fe5-93ea-770ff73c7ad8)

### 4. User Information
Users can access their account details, including:
- Username
- Role
- Language
- Country
- Company name
![image](https://github.com/user-attachments/assets/4550de43-22c9-4d26-b410-706d2fad5bdd)

This ensures transparency and control over their profiles.

## Technologies Used
- **Frontend:** React, HTML, CSS
- **Backend:** Node.js
- **Database:** MongoDB

## Front-End Features

### 1. Order Management
- Create new orders with an order ID, status, and list of products.
- View all orders, including order number, user ID, total amount, and status (completed, shipped, pending).

### 2. Product Management
- Create new products, including name, description, category, and price.
- View all products with options to edit or delete.

### 3. User Information Display
- Users can see their role, username, language, country, and company name.

## Steps to Run the Application

1. Open the server terminal and execute the command:
   ```bash
   node server.js
2. A separate terminal, navigate to the frontend directory and run the command:
   ```bash
   npm start
