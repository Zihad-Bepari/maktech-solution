# 🔐 Authentication Setup Guide (OAuth + Custom Auth)

This repository contains setup guides for multiple authentication systems:

* Social (Google, LinkedIn, GitHub)
* Email & Password
* Phone Number (OTP)

You can expand this file step by step.

---
# 📌 Email & Password Authentication

## Overview

The user will create an account using email and password. The password must always be stored in a hashed format.


---

## Step-by-Step

### 1. Register API

* Input:

  * Email
  * Password

### 2. Hash Password

```
bcrypt.hash(password, 10)
```

### 3. Store in Database

* email
* hashed password

---

### 4. Login

* Email + Password input
* Compare:

```
bcrypt.compare(password, user.password)
```

---

### 5. Generate Token (JWT)

```
jwt.sign({ userId }, SECRET, { expiresIn: "7d" })
```

---

# 📌 Google Authentication Setup (OAuth 2.0)

# Overview

Using Google Authentication (OAuth 2.0), a user can log in with their Google account.  
The main benefits are:

- Users don’t need to remember a separate password  
- Secure login system (handled by Google)  
- Fast signup/login experience  
---
## Step-by-Step

### 1. Go to Google Cloud Console

* https://console.cloud.google.com/
* Login with your Google account

### 2. Create / Select Project

* Click **New Project**
* Give a name → Create

### 3. Enable API

* APIs & Services → Library
* Enable **Google Identity Services**

### 4. Create Credentials

* APIs & Services → Credentials
* Click **Create Credentials**
* Select **OAuth Client ID**

### 5. OAuth Consent Screen

* Select **External**
* Fill:

  * App Name
  * Email
* Save & continue

### 6. Create OAuth Client

* Application Type: **Web Application**

**Redirect URI:**

```
http://localhost:8080
```

### 7. Save Credentials

* Client ID
* Client Secret

---

# 📌 GitHub Authentication Setup (OAuth 2.0)

## Overview

Using GitHub Authentication (OAuth 2.0), users can log in using their GitHub account.

---

## Step-by-Step

### 1. Go to GitHub Developer Settings

Open:    https://github.com/settings/developers  

Go to **OAuth Apps**

---

### 2. Create OAuth App

Click **“New OAuth App”**

Fill the form:

- **Application Name:** AuthForge (or your project name)  
- **Homepage URL:**   http://localhost:8080/api/auth/github


- **Authorization Callback URL:**  http://localhost:8080/api/auth/github/callback


---

### 3. Get Credentials

After creating the app, you will get:

- Client ID  
- Client Secret (generate if not shown)


⚠️ **Important:** Client Secret will only be shown once — make sure to copy and save it safely.

---

# 📌 LinkedIn Authentication Setup (OAuth 2.0)

## Overview

Using LinkedIn Authentication (OAuth 2.0), users can log in using their LinkedIn account.

---

## Step-by-Step

### 1. Go to LinkedIn Developer Portal

Open:  https://www.linkedin.com/developers/

Login with your LinkedIn account.

---

### 2. Create App

Click **“Create App”**

Fill the form:

- App Name: AuthForge (or your project name)
- LinkedIn Page: (your company/page required)
- Privacy Policy URL: (optional for localhost)
- App Logo: upload (optional)

---

### 3. Configure OAuth Settings

Go to **Auth tab**

Add Redirect URL: http://localhost:8080/api/auth/linkedin/callback


---

### 4. Get Credentials

After creating the app, you will get:

- Client ID  
- Client Secret  

⚠️ Important:
Client Secret will only be shown once — copy and store it safely.

---


## 💡 OAuth Flow

1. User clicks “Login with LinkedIn”
2. Redirect to LinkedIn login
3. User approves access
4. Redirect back to:

---

# 📂 Environment Variables

```
# Email Auth
JWT_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#Github 
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

#Linkedin
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret

# Common
REDIRECT_URI=http://localhost:8080
```

---
# ✅ Notes

* Never store passwords in plain text ❌
* Keep OTP expiry short (for security 🔒)
* The same redirect URI can be used (if handled in the backend)
* Do not push the .env file to GitHub

---
