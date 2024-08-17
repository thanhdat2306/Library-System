# Library Management System
## Overview
This project is a Library Management System built using React for the frontend and .NET Web API with Entity Framework Core and MySQL for the backend. The system allows users to manage library books efficiently by providing functionalities to view, add, update, and delete book records.

## Features
- **View Books:** Display a list of all books in the library.
- **Book Details:** View detailed information about each book.
- **Add Book:** Add new books to the library.
- **Update Book:** Edit information of existing books.
- **Delete Book:** Remove books from the library.
  
## Technologies Used
### Frontend
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static types.
- **Axios:** Promise-based HTTP client for making requests to the backend.
- **React Router:** Library for routing in React applications.
- **Bootstrap:** CSS framework directed at responsive, mobile-first front-end web development.

### Backend
- **.NET Web API:** Framework for building RESTful APIs.
- **Entity Framework Core:** ORM for interacting with the database.
- **MySQL:** Relational database management system.

## Getting Started
### Prerequisites
- **Node.js:** Ensure you have Node.js installed for running the frontend.
- **.NET SDK:** Required for running the backend API.
- **MySQL:** Database server to store and manage library data.

### Setup
**1. Clone the Repository**
```
git clone https://github.com/thanhdat2306/Library-System.git
```

**2. Install Frontend Dependencies**
```
cd frontend
npm install
```

**3. Install Backend Dependencies**
```
cd ../backend
dotnet restore
```

**4. Configure Database**

Update the connection string in `appsettings.json` to point to your MySQL database.

**5. Run the Application**

**Backend:** Start the .NET Web API
```
cd backend
dotnet run
```
**Frontend:** Start the React application
```
cd frontend
npm start
```


