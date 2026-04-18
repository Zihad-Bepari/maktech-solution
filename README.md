# 📦Urban Farming Platform Overview

Urban Farming Platform is a role-based marketplace system built for agricultural products and farm-related services. The system is divided into three main roles: **Admin, Vendor, and Customer**. Each role has different permissions and responsibilities.

---

# 👤 Customer Role

Customers are regular users of the system.

- Can view products listed by vendors  
- Can place orders for products  
- Can browse available farm rental spaces  
- Can book rental spaces for farming or usage  
- Can view their order and booking history  

Customers mainly interact with products and rental services provided by vendors.

---

# 🧑‍🌾 Vendor Role

Vendors are the sellers and service providers in the system.

- Can create and manage their products  
- Can list farm rental spaces for rent  
- Can receive orders from customers  
- Can manage booking requests for rental spaces  
- Can sell products after admin approval  
- Can offer rental services after admin approval  

Vendor data and services become visible in the system only after admin approval.

---

# 👨‍💼 Admin Role

Admin has full control over the entire system.

- Manages all users, vendors, and customers  
- Approves or rejects vendor requests  
- Approves or rejects products and rental spaces  
- Handles all CRUD operations in the system  
- Monitors orders, bookings, and platform activity  
- Ensures system security and data integrity  

Admin is the highest authority in the system.

---

# 🔐 Auth Service

Handles all authentication-related features.

- Registers new users  
- Handles login authentication  
- Sends OTP for forgot password  
- Verifies OTP for account security  
- Supports password reset functionality  

---

# 👤 User Service

Manages user account settings and profile features.

- Displays user profile  
- Updates password  
- Enables/disables email notifications  
- Enables/disables 2FA  
- Handles account deletion and logout  

---

# 🧑‍🌾 Vendor Service

Manages vendor application and profile system.

- Allows users to apply as vendors  
- Creates vendor profiles  
- Updates vendor information  
- Admin approves or rejects vendor requests  

---

# 🏢 Certification Service

Manages farm/vendor certification process.

- Vendors submit certification requests  
- Displays certification list  
- Admin approves or rejects certifications  
- Tracks certification status  

---

# 🛒 Produce (Product) Service

Handles farm product management.

- Vendors create products  
- Displays product list  
- Shows single product details  
- Allows product update and deletion  
- Supports category and price filtering  

---

# 📦 Order Service

Manages ordering system between buyers and vendors.

- Creates new orders  
- Allows users to view their orders  
- Displays order details  
- Updates order status (Pending → Shipped, etc.)  

---

# 🏠 Rental Space Service

Handles farm rental space management.

- Vendors create rental spaces  
- Displays available spaces  
- Updates and deletes spaces  
- Supports booking-related data  

---

# 🧑‍🤝‍🧑 Community Service

Handles social/community features.

- Users can create posts  
- Displays all posts  
- Allows comments on posts  
- Like/unlike toggle system for posts  

---

# 👨‍💼 Admin Service

Provides system administration control.

- View all vendors  
- View single vendor details  
- Approve or reject vendors  
- Delete vendor accounts  

---

# 🌐 Marketplace Service

Provides public marketplace data.

- Shows approved products  
- Displays single product details  
- Lists approved vendors  

---

# ⚠️ Notes

- The project follows a modular architecture  
- Many routes require authentication  
- Role-based access control (User, Vendor, Admin) is implemented  
- PostgreSQL is used as the database  
- UUID is used as primary keys  
---
# 🚀⚙️ Urban Farming Platform Setup Instructions

### 1️⃣ Clone Project
```bash
git clone <your-repo-url>
cd maktech-backend
npm install
Create .env File
```
# Create a .env file in root directory:

```bash
PORT = 8080
CLIENT_URL = "http://localhost:5173"

DB_PORT=5432
DB_PASSWORD="12345678"
DB_NAME=*********
DB_HOST=localhost
DB_USER="postgres"

COOKIE_EXPIRES_IN=7
JWT_SECRET_KEY=************
JWT_EXPIRES_IN=7d

SMTP_SERVICE = gmail
SMTP_MAIL = ******************
SMTP_PASSWORD = ***************
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465

GOOGLE_CLIENT_SECRET=***************************
GOOGLE_CLIENT_ID=*******************************************
BASE_URL=http://localhost:8080/api


```

# Create Database
```bash
 CREATE DATABASE maktech;
```

# Run Database Seed

This will create all tables and initial setup:
```bash
npm run seed
```
# Start Server
```bash
npm run dev
```
# 📡 Server Info
```bash
http://localhost:8080
```
# 🧪 Example API Test
POST /api/auth/signup

# ⚡ Quick Run Flow
```bash
git clone <repo>
npm install
.env setup
create database
npm run seed
npm run dev
```
# 🛠️ Notes
- Make sure PostgreSQL is running
- Use Gmail App Password for email service
- Run seed before starting server
- Check .env values if any error occurs
