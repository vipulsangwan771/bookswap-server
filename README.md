cat > README.md << 'EOF'
# 📚 BookSwap Server

This is the **backend API** for the **BookSwap** application — a platform where users can register, list books for exchange, send/receive requests, and manage their personal library.  
Built with **Node.js**, **Express**, and **MongoDB**, this backend provides secure authentication, image uploads, and request handling.

---

## 🚀 Features

- **User Authentication**
  - Register & login using JWT authentication
  - Input validation for secure and clean data handling
- **Book Management**
  - Add new books with image upload
  - View all books or user-specific books
  - Delete owned books
- **Book Requests**
  - Send book exchange requests
  - View sent and received requests
  - Accept or reject incoming requests
- **Security**
  - Helmet for HTTP headers security
  - CORS configuration for frontend communication
  - Rate limiting to prevent abuse
- **File Uploads**
  - Uses \`multer\` to handle image uploads
  - Only allows \`.jpeg\`, \`.jpg\`, \`.png\`

---

## 🛠 Tech Stack

- **Backend Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer
- **Security:** Helmet, CORS, Rate Limiting
- **Environment Management:** dotenv

---

## 📂 Project Structure

\`\`\`
bookswap-server/
│
├── routes/              # API route definitions
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── requestRoutes.js
│
├── controllers/         # Request handlers (business logic)
├── middleware/          # Custom middleware (auth, error handling)
├── uploads/             # Uploaded book images
├── .env                  # Environment variables
├── server.js             # Main server entry point
└── package.json
\`\`\`

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
\`\`\`bash
git clone https://github.com/<your-username>/bookswap-server.git
cd bookswap-server
\`\`\`

### 2️⃣ Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3️⃣ Create a \`.env\` file in the root folder
\`\`\`env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
\`\`\`

### 4️⃣ Run the server
\`\`\`bash
npm start
\`\`\`
Server will run at:
\`\`\`
http://localhost:5000
\`\`\`

---

## 📡 API Endpoints

### **Auth Routes** (\`/auth\`)
| Method | Endpoint         | Description         | Protected |
|--------|------------------|--------------------|-----------|
| POST   | \`/register\`      | Register a user    | ❌ |
| POST   | \`/login\`         | Login a user       | ❌ |

### **Book Routes** (\`/books\`)
| Method | Endpoint   | Description            | Protected |
|--------|-----------|------------------------|-----------|
| POST   | \`/\`       | Add new book (with image) | ✅ |
| GET    | \`/\`       | Get all books           | ❌ |
| GET    | \`/my\`     | Get logged-in user's books | ✅ |
| GET    | \`/:id\`    | Get book by ID          | ❌ |
| DELETE | \`/:id\`    | Delete book by ID       | ✅ |

### **Request Routes** (\`/requests\`)
| Method | Endpoint     | Description                  | Protected |
|--------|-------------|------------------------------|-----------|
| POST   | \`/\`         | Send a book exchange request | ✅ |
| GET    | \`/my\`       | Get my sent requests         | ✅ |
| GET    | \`/incoming\` | Get incoming requests        | ✅ |
| PUT    | \`/:id\`      | Update request (accept/reject) | ✅ |

---

## 🖼 Image Uploads
- Images are stored in the \`/uploads\` folder
- Only \`.jpeg\`, \`.jpg\`, \`.png\` are accepted
- Access uploaded files at:
\`\`\`
http://localhost:5000/uploads/<filename>
\`\`\`

---

## 🔐 Security & Best Practices
- Helmet is used for setting secure HTTP headers.
- Rate limiting is applied: Max **1000 requests / 15 minutes**.
- CORS is configured to allow requests only from:
  \`\`\`
  http://localhost:3000
  \`\`\`
- Passwords should be hashed in the database (handled in controllers).

---

## 📜 License
This project is licensed under the **MIT License** — feel free to modify and use it as needed.

---

## 🤝 Contributing
1. Fork this repo
2. Create a new branch (\`feature-branch\`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

**💡 Tip:**  
For the frontend, check out the [BookSwap Frontend Repository](https://github.com/<your-username>/bookswap-front)
EOF
