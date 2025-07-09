# 🍽️ AI Restaurant Reservation System (Demo)

This is a demo project for a voice-enabled fine-dining restaurant reservation system. 
It focuses on backend reservation logic, slot availability tracking, and will integrate an AI voice assistant using OpenAI and Twilio in later stages.

---

## ⚙️ Tech Stack

- **Frontend**: React.js (in `client/`)
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL
- **Voice AI**: Twilio + OpenAI (coming soon)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/xcai0511/AI-Reservation-Demo.git
cd AI-Reservation-Demo
```
### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server/` folder:
```env
DATABASE_URL=postgresql://your_username@localhost:5432/reservation_demo
```
> > Replace `your_username` with your PostgreSQL username (e.g. `whitneycai`).  
> > You can also use `.env.example` as a reference.


Start the backend server:
```bash
npm run dev
```
Backend runs on: `http://localhost:3000`

---

### 3. Database Setup
If you haven't installed PostgreSQL:

```bash
brew install postgresql
brew services start postgresql@14
```

Then, from the project root, run:

```bash
chmod +x setup-db.sh    # only once
./setup-db.sh
```

This will:
- Create the `reservation_demo` database
- Run schema setup in `db/migrate.sql`


---

### 4. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`  
Ensure it points API calls to `http://localhost:3000`

---

## 📁 Project Structure

```
AI-Reservation-Demo/
├── client/                  # React frontend
├── server/                  # Express backend
│   ├── controllers/         # Route logic
│   ├── db/                  # PostgreSQL connection + schema
│   ├── routes/              # API endpoints
│   ├── server.js            # Backend entry
│   └── .env                 # Environment config
├── setup-db.sh              # DB init script
├── .env.example             # Sample env file
└── README.md
```

---

## 🔜 Coming Soon
- Twilio Voice Integration
- OpenAI-based voice reservation logic
- Admin dashboard to manage reservations


---

## 🛠️ Common Commands

| Task                          | Command                            |
|-------------------------------|-------------------------------------|
| Start backend server          | `npm run dev` (in `server/`)        |
| Start frontend                | `npm run dev` (in `client/`)        |
| Run DB setup script           | `./setup-db.sh` (from project root) |

---

## 📌 Example `.env` for Backend

```env
DATABASE_URL=postgresql://whitneycai@localhost:5432/reservation_demo
```

---

## 🙋\u200d♀️ Need Help?

Make sure:
- PostgreSQL is running
- You created the database
- You ran the setup script
- You created your `.env`

Then you're good to go!"