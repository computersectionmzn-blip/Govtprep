# GovtPrep — Government Exam Preparation Portal

Live platform for aspirants preparing for UPSC, SSC, Banking, Railway, and State PSC exams.

## Architecture

```
┌──────────────────────┐       ┌──────────────────────────────┐
│   Firebase Hosting   │  ❖   │     Render (Node.js API)     │
│  (Static HTML/CSS/JS)│ ───► │  Express + Mongoose + JWT    │
│                      │ HTTPS │                              │
│  govtprep-832b5.web.app│     │  govtprep.onrender.com/api/* │
└──────────────────────┘       └──────────┬───────────────────┘
                                          │
                                   ┌──────▼──────┐
                                   │ MongoDB Atlas│
                                   │  (govtprep)  │
                                   └─────────────┘
```

- **Frontend**: Static HTML/CSS/JS deployed to Firebase Hosting
- **Backend**: Express REST API deployed on Render
- **Database**: MongoDB Atlas (cloud)
- **Auth**: JWT-based (plaintext passwords — to be migrated to bcrypt)

## Project Structure

```
GovtPrep/
├── .github/workflows/       # CI/CD pipelines
├── server/                  # Express API backend
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route handlers
│   ├── server.js            # Entry point
│   ├── db.js                # DB connection
│   └── seed.js              # Database seeder
├── images/                  # Static image assets
├── *.html                   # Frontend pages (Firebase Hosting root)
├── shared.css               # Shared design system
├── firebase-init.js         # Firebase SDK init
├── firebase.json            # Firebase Hosting config
├── .nvmrc                   # Node version
├── .editorconfig            # Editor settings
└── eslint.config.js         # Lint config
```

## Frontend Pages

| Page | Description |
|------|-------------|
| `login.html` | Sign-in with email/password |
| `register.html` | New account registration |
| `forgot-password.html` | Password reset request |
| `index.html` | Public homepage |
| `student-dashboard.html` | Student dashboard |
| `student-courses.html` | Enrolled courses |
| `student-tests.html` | Mock tests & results |
| `student-performance.html` | Performance analytics |
| `student-practice.html` | Practice zone with quizzes |
| `student-plan.html` | Study plan tracker |
| `student-affairs.html` | Current affairs & quizzes |
| `admin-dashboard.html` | Admin overview |
| `admin-students.html` | Student management |
| `admin-courses.html` | Course management |
| `admin-tests.html` | Test management |
| `admin-payments.html` | Payment records |
| `admin-reports.html` | Reports & analytics |
| `admin-settings.html` | Platform settings |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/users` | All users |
| GET | `/api/users/students` | All students |
| GET | `/api/courses` | All courses |
| GET | `/api/courses/student/:id` | Student's enrolled courses |
| GET | `/api/tests` | All tests |
| GET | `/api/test-results` | All test results |
| GET | `/api/test-results/student/:id` | Student's results |
| GET | `/api/payments` | All payments |
| GET | `/api/payments/stats` | Payment statistics |
| GET | `/api/practice/topics` | Practice topics |
| GET | `/api/practice/topics/:id` | Topic with questions |
| GET | `/api/study-plan` | Study plans |
| GET | `/api/articles` | Current affairs articles |
| GET | `/api/performance/student/:id` | Student performance |
| GET | `/api/performance/trend/:id` | Score trend |
| GET | `/api/performance/subject/:id` | Subject-wise performance |
| GET | `/api/dashboard/student/:id` | Dashboard data |
| GET | `/api/settings` | Platform settings |
| PUT | `/api/settings` | Update settings |
| PUT | `/api/settings/password` | Change admin password |

## Local Setup

### Prerequisites
- Node.js 20+ (see `.nvmrc`)
- MongoDB Atlas connection string
- Firebase project (for frontend deploy)

### Backend
```bash
cd server
cp .env.example .env   # Set MONGO_URI
npm install
npm run seed           # Seed database
npm start              # Start on :5000
```

### Frontend (optional — for local dev)
```bash
npm install -g serve
serve .                # Serves HTML files locally
```

## Deployment

### Backend (Render)
Push to `master` — auto-deploys from `server/` directory.
Set `MONGO_URI` and `JWT_SECRET` in Render dashboard.

### Frontend (Firebase Hosting)
```bash
firebase login
firebase deploy --only hosting
```
Or push to `master` — GitHub Actions auto-deploys.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | JWT signing secret (default in code only) |

## Credentials (Dev/Seed)

| Role | Email | Password |
|------|-------|----------|
| Student | `ravi@email.com` | `password123` |
| Admin | `admin@govtprep.in` | `admin123` |

## Known Limitations

- Passwords stored in plaintext (bcrypt installed but not wired)
- No authentication middleware on API routes
- No rate limiting on auth endpoints
