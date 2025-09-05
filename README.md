# 📖 BookVerse

BookVerse is a highly dynamic and user-friendly online bookstore that provides seamless searching, navigation, and a smooth shopping experience. The platform allows users to browse, purchase, and manage books with ease.

## 🚀 Features

- 🔍 **Advanced Search & Navigation** – Easily find books using smart filtering and search functionalities.
- 🎨 **Dynamic UI** – A modern and interactive user interface.
- 🔐 **Secure Authentication** – User authentication with JWT.
- 📚 **Rolling Gallery** – Visually appealing book display.
- 🌐 **Responsive Design** – Optimized for all screen sizes.

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Router DOM
- Lucide React (Icons)
- React Toastify (Notifications)
- React Select
- React Bootstrap
- Rolling Gallery
- Axios

### Backend:
- Express.js
- CORS
- Mongoose (MongoDB)
- JWT (Authentication)
- Stripe (Payments)

## 🏗️ Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (>=14.x)
- MongoDB

### Steps to Run the Project

#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/AbhiVardhan020/BookVerse.git
cd bookstore
```

#### 2️⃣ Install Dependencies

##### Frontend:
```sh
cd frontend
npm install
npm start
```

##### Backend:
```sh
cd backend
npm install
npm start
```

#### 3️⃣ Configure Environment Variables
Create a `.env` file in the backend folder and add:
```env
PORT=3001
STRIPE_SECRET_KEY=your_stripe_secret_key
```

#### 4️⃣ Start the Development Server
Run the frontend and backend servers:
```sh
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

#### 5️⃣ Open the Application
Visit: `http://localhost:3000`

---

### 📬 Contributions & Support
Feel free to fork, contribute, and open issues if you have suggestions. Happy coding! 🚀
