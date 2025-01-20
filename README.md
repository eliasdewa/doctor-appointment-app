# Ed-Doctor Appointment App

A full-stack MERN application for seamless doctor appointment management. This app provides tailored interfaces for administrators, doctors, and patients, ensuring an intuitive and efficient user experience.

---

## 🚀 Features

### 🌟 Admin Panel
- **Manage Doctors**: Add, edit, or remove doctor profiles.
- **Appointment Insights**: View and manage all appointments in one place.
- **Dashboard Analytics**: Gain insights into system performance and user statistics.

### 🩺 Doctor Dashboard
- **Appointment Management**: View schedules and manage patient appointments.
- **Profile Customization**: Edit personal information and availability.
- **Performance Overview**: Track key metrics like completed appointments.

### 👩‍⚕️ Patient Frontend
- **Book Appointments**: Effortlessly schedule appointments with preferred doctors.
- **Profile Management**: Update personal information and view appointment history.
- **Discover Doctors**: Search for top-rated specialists by specialty.

---

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite for blazing-fast development)
- **Tailwind CSS** (for sleek and responsive designs)
- **Context API** (for efficient state management)

### Backend
- **Node.js** & **Express.js** (to power RESTful APIs)
- **MongoDB** (to store user, doctor, and appointment data)
- **JWT Authentication** (for secure and scalable login flows)
- **Cloudinary** (for image management)

---

## 📂 Directory Structure

Here's an overview of the project:

```plaintext
eliasdewa-ed-doctor-appointment-app/
├── admin/            # Admin panel code
├── backend/          # Backend API logic
├── frontend/         # Patient-facing app
└── README.md         # Project documentation
```

---

## 🔧 Getting Started

### Prerequisites
- **Node.js** (v16+ recommended)
- **MongoDB** (local or cloud database)
- **Vite** (optional for advanced development)

---

### Installation
1. Clone the repository:
    ```plaintext
   git clone https://github.com/eliasdewa/ed-doctor-appointment-app.git
   ```
2. Navigate to the project directory:
   ```plaintext
   cd ed-doctor-appointment-app
   ```
3. Install dependencies for each module:
   - Frontend:
     ```plaintext
     cd frontend
     npm install
     ```
   - Admin Panel:
     ```plaintext
     cd ../admin
     npm install
     ```
   - Backend:
     ```plaintext
     cd ../backend
     npm install
     ```
     
---

## ▶️ Running the Application
1. Start the Backend:
    ```plaintext
    cd backend
    npm run dev
   ```
2. Launch the Frontend:
   ```plaintext
   cd frontend
   npm run dev
   ```
3. Open the Admin Panel:
   ```plaintext
    cd admin
    npm run dev
   ```

---

## 🌐 Access the App
- Admin Panel: http://localhost:3001
- Frontend: http://localhost:5173

---

## ⚙️ Configuration
### Backend Environment Variables
Create a .env file in the backend/ directory with the following keys:
```plaintext
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_URL=<your_cloudinary_url>
```
---

## 📜 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms.

---

## 🙌 Contributors
[Elias Dewa](https://github.com/eliasdewa) - Creator and Maintainer

---

## 📞 Support
If you encounter any issues or have suggestions, feel free to reach out via eliasdewa3@gmail.com.

---

## 🎯 Future Plans
- Integration with Ethiopian payment systems (e.g., Chapa).
- Multi-language support for a global audience.
- Real-time appointment notifications.
