# Magnet_Assiment


#📝 Task Management System (MERN Stack)

This is a Simple Task Management System built using the MERN stack as part of an assignment.
The application supports role-based access where admins manage users and tasks, and normal users manage only their assigned tasks.




🚀 Tech Stack

Frontend: React.js, React Router, Axios

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)


)

👥 User Roles
👑 Admin

Automatically created on first application run

Can create and delete users

Can create tasks and assign them to any user (including self)

Can view and manage all tasks

Can see which user each task is assigned to

👤 User

Can log in using credentials created by admin

Can see only tasks assigned to them

Can create tasks for self only

Can edit, delete, and update status of own tasks




✅ Features Implemented

User authentication (Login / Register)

Default admin creation on first run

Admin user management (add / delete users)

Task CRUD (Create, View, Edit, Delete)

Task assignment to users

Task status update (Pending / Completed)

Priority management (High / Medium / Low)

Color-coded priority lists

Pagination per priority list

Edit task using popup modal

Role-based access control (frontend + backend)




📂 Project Structure (Simplified)






git clone https://github.com/AshishDhakad/Magnet_Assiment.git


cd backend
npm install

#*.ENV file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start backend server:  npx nodemon
Backend will run on:  http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev



Frontend will run on:  http://localhost:5173



🔐 Default Admin Credentials (Demo Purpose)

On first run, a default admin is created automatically.

Email: admin@taskmanager.com
Password: admin123

⚠️ These credentials are for demo/testing only.

