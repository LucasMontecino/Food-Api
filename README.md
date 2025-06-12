# 🍽️ Food API
A full-stack web application where users can explore, search, filter, and create recipes. Built with React, Redux, Node.js, Express, PostgreSQL, and Sequelize, integrating the external Spoonacular API for recipe data.

## 📌 Features

🔎 Search Recipes by name.

⚙️ Filter by diet types (e.g., vegetarian, vegan, gluten-free).

📊 Sort recipes by name or health score.

📝 Create Your Recipe with validation and diet selections.

🗂️ Pagination (9 recipes per page).

📄 Recipe Detail Page with ingredients, summary, and preparation steps.

🖥️ Responsive Design for desktop and mobile devices.

## 🛠️ Technologies Used

### Frontend
- React

- Redux

- React Router

- CSS Modules

### Backend
- Node.js

- Express.js

- PostgreSQL

- Sequelize

- Spoonacular API

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```
  git clone https://github.com/LucasMontecino/Food-Api.git
  cd Food-Api
```

### 2️⃣ Install dependencies
```
  cd api
  npm install
  cd ../client
  npm install
```

### 3️⃣ Setup environment variables
In the /api directory, create a .env file:
```
  DB_USER=your_postgres_user
  DB_PASSWORD=your_postgres_password
  DB_HOST=localhost
  API_KEY=your_spoonacular_api_key
```
🔑 Note: Sign up at https://spoonacular.com/food-api to get your API key.

### 4️⃣ Run the project
#### Backend:

```
  cd api
  npm start
```

#### Frontend:

```
  cd client
  npm start
```
