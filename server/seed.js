import { connectDB } from './db.js';
import User from './models/User.js';
import Course from './models/Course.js';
import Test from './models/Test.js';
import TestResult from './models/TestResult.js';
import Payment from './models/Payment.js';
import PracticeTopic from './models/PracticeTopic.js';
import StudyPlan from './models/StudyPlan.js';
import Article from './models/Article.js';
import SubjectPerformance from './models/SubjectPerformance.js';
import Setting from './models/Setting.js';

async function seed() {
  await connectDB();

  await User.deleteMany({});
  await Course.deleteMany({});
  await Test.deleteMany({});
  await TestResult.deleteMany({});
  await Payment.deleteMany({});
  await PracticeTopic.deleteMany({});
  await StudyPlan.deleteMany({});
  await Article.deleteMany({});
  await SubjectPerformance.deleteMany({});
  await Setting.deleteMany({});

  const [courseUPSC, courseSSC, courseIBPS, courseRRB, courseStatePSC, courseSSCCHSL] = await Course.create([
    { title: "UPSC CSE Foundation 2027", emoji: "📜", description: "GS Paper I · II · III · IV + CSAT", category: "UPSC", totalLessons: 240, completedLessons: 149, enrolledCount: 3420, status: "Published", progressColor: "linear-gradient(90deg,#6366f1,#a5b4fc)" },
    { title: "SSC CGL Tier I & II Complete", emoji: "📊", description: "Quant · Reasoning · English · GK", category: "SSC", totalLessons: 180, completedLessons: 81, enrolledCount: 5240, status: "Published", progressColor: "linear-gradient(90deg,#22c55e,#86efac)" },
    { title: "IBPS PO Complete Prep", emoji: "🏦", description: "Prelims + Mains + Interview", category: "Banking", totalLessons: 160, completedLessons: 45, enrolledCount: 4100, status: "Published", progressColor: "linear-gradient(90deg,#f97316,#fdba74)" },
    { title: "Railway RRB NTPC", emoji: "🚂", description: "CBT-1 & CBT-2", category: "Railway", totalLessons: 140, completedLessons: 0, enrolledCount: 2980, status: "Published", progressColor: "linear-gradient(90deg,#0ea5e9,#7dd3fc)" },
    { title: "UP PCS Prelims+Mains", emoji: "🏛️", description: "State PSC", category: "State PSC", totalLessons: 120, completedLessons: 0, enrolledCount: 1860, status: "Draft", progressColor: "linear-gradient(90deg,#ec4899,#f9a8d4)" },
    { title: "SSC CHSL Tier I", emoji: "📝", description: "English·Quant·Reasoning", category: "SSC", totalLessons: 100, completedLessons: 0, enrolledCount: 1420, status: "Published", progressColor: "linear-gradient(90deg,#8b5cf6,#c4b5fd)" }
  ]);

  const [ravi, priya, arjun, meena, suresh, anjali, vikram, neha, admin] = await User.create([
    { name: "Ravi Sharma", email: "ravi@email.com", password: "password123", role: "student", gender: "male", avatar: "RS", targetExam: "UPSC CSE", status: "Active", enrolledCourses: [courseUPSC._id], streak: 12, allIndiaRank: 142, bestScore: 82, studyHours: 86 },
    { name: "Priya Nair", email: "priya@email.com", password: "password123", role: "student", gender: "female", avatar: "PN", targetExam: "SSC CGL", status: "Active" },
    { name: "Arjun Singh", email: "arjun@email.com", password: "password123", role: "student", gender: "male", avatar: "AS", targetExam: "IBPS PO", status: "Pending" },
    { name: "Meena Verma", email: "meena@email.com", password: "password123", role: "student", gender: "female", avatar: "MV", targetExam: "Railway RRB", status: "Active" },
    { name: "Suresh Kumar", email: "suresh@email.com", password: "password123", role: "student", gender: "male", avatar: "SK", targetExam: "State PSC", status: "Inactive" },
    { name: "Anjali Rao", email: "anjali@email.com", password: "password123", role: "student", gender: "female", avatar: "AR", targetExam: "SSC CHSL", status: "Active" },
    { name: "Vikram Kaur", email: "vikram@email.com", password: "password123", role: "student", gender: "male", avatar: "VK", targetExam: "UPSC CSE", status: "Active" },
    { name: "Neha Patel", email: "neha@email.com", password: "password123", role: "student", gender: "female", avatar: "NP", targetExam: "IBPS Clerk", status: "Pending" },
    { name: "Admin", email: "admin@govtprep.in", password: "admin123", role: "admin", gender: "male", avatar: "AD", status: "Active" }
  ]);

  await Test.create([
    { title: "UPSC GS Paper I — May Set", category: "UPSC", questions: 100, duration: 120, status: "Live", attempts: 1240, avgScore: 68, passRate: 74 },
    { title: "SSC CGL Tier I Full Mock", category: "SSC", questions: 100, duration: 60, status: "Live", attempts: 980, avgScore: 142, passRate: 81 },
    { title: "IBPS PO Prelims Practice", category: "Banking", questions: 100, duration: 60, status: "Live", attempts: 756, avgScore: 55, passRate: 61 },
    { title: "RRB NTPC CBT-1 Mock", category: "Railway", questions: 100, duration: 90, status: "Live", attempts: 1102, avgScore: 78, passRate: 79 },
    { title: "UP PCS Prelims Mega Test", category: "State PSC", questions: 150, duration: 120, status: "Draft", attempts: 430, avgScore: 62, passRate: 48 },
    { title: "Current Affairs May 2026", category: "General", questions: 50, duration: 30, status: "Live", attempts: 2100, avgScore: 38, passRate: 76 }
  ]);

  await TestResult.create([
    { student: ravi._id, testName: "UPSC GS Mock — Set 11", score: 82, total: 100, accuracy: 82, rank: "#138", timeTaken: "108 min", date: new Date("2026-05-18"), status: "Excellent" },
    { student: ravi._id, testName: "SSC CGL Tier I Full Mock", score: 148, total: 200, accuracy: 74, rank: "#201", timeTaken: "55 min", date: new Date("2026-05-16"), status: "Good" },
    { student: ravi._id, testName: "IBPS PO Quant Practice", score: 19, total: 35, accuracy: 54, rank: "#580", timeTaken: "42 min", date: new Date("2026-05-14"), status: "Average" },
    { student: ravi._id, testName: "Current Affairs — May Week 2", score: 22, total: 25, accuracy: 88, rank: "#72", timeTaken: "18 min", date: new Date("2026-05-12"), status: "Excellent" },
    { student: ravi._id, testName: "UPSC GS Mock — Set 10", score: 76, total: 100, accuracy: 76, rank: "#204", timeTaken: "115 min", date: new Date("2026-05-10"), status: "Good" }
  ]);

  await Payment.create([
    { student: ravi._id, studentName: "Ravi Sharma", course: courseUPSC._id, courseName: "UPSC Foundation", amount: 2999, date: new Date("2026-05-19"), method: "UPI", status: "Success", txnId: "#TXN8821" },
    { student: priya._id, studentName: "Priya Nair", course: courseSSC._id, courseName: "SSC CGL Tier I & II", amount: 1499, date: new Date("2026-05-18"), method: "Card", status: "Success", txnId: "#TXN8820" },
    { student: arjun._id, studentName: "Arjun Singh", course: courseIBPS._id, courseName: "IBPS PO Prep", amount: 1799, date: new Date("2026-05-18"), method: "NetBanking", status: "Pending", txnId: "#TXN8819" },
    { student: meena._id, studentName: "Meena Verma", course: courseRRB._id, courseName: "Railway RRB", amount: 999, date: new Date("2026-05-17"), method: "UPI", status: "Success", txnId: "#TXN8818" },
    { student: suresh._id, studentName: "Suresh Kumar", course: courseStatePSC._id, courseName: "State PSC", amount: 1299, date: new Date("2026-05-16"), method: "Card", status: "Refunded", txnId: "#TXN8817" },
    { student: anjali._id, studentName: "Anjali Rao", course: courseSSCCHSL._id, courseName: "SSC CHSL", amount: 899, date: new Date("2026-05-15"), method: "UPI", status: "Success", txnId: "#TXN8816" }
  ]);

  await PracticeTopic.create([
    {
      title: "Indian Polity", emoji: "🏛️", description: "Fundamental Rights, Parliament, Judiciary & Constitutional Amendments.", totalQuestions: 420, completedPercentage: 62, categoryId: 24,
      questions: [
        { q: "Which article of the Indian Constitution guarantees the Right to Equality?", a: "Article 14", opts: ["Article 14", "Article 19", "Article 21", "Article 32"] },
        { q: "Who is the custodian of the Indian Constitution?", a: "The Supreme Court of India", opts: ["The President", "The Parliament", "The Supreme Court of India", "The Prime Minister"] },
        { q: "What is the minimum age to be elected as the President of India?", a: "35 years", opts: ["25 years", "30 years", "35 years", "40 years"] }
      ]
    },
    {
      title: "History & Culture", emoji: "📜", description: "Ancient India, Medieval India, Modern Freedom Struggle & Indian Heritage.", totalQuestions: 580, completedPercentage: 40, categoryId: 23,
      questions: [
        { q: "In which year did the Revolt of 1857 start?", a: "1857", opts: ["1757", "1857", "1942", "1947"] },
        { q: "Who was the founder of the Mauryan Empire?", a: "Chandragupta Maurya", opts: ["Chandragupta Maurya", "Ashoka the Great", "Samudragupta", "Harsha"] },
        { q: "Under whose leadership was the Non-Cooperation Movement launched?", a: "Mahatma Gandhi", opts: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bal Gangadhar Tilak"] }
      ]
    },
    {
      title: "Geography", emoji: "🌍", description: "Physical Geography, Indian Geography, Resources, Climate & Mapping.", totalQuestions: 350, completedPercentage: 15, categoryId: 22,
      questions: [
        { q: "Which river is known as the Ganga of the South?", a: "Godavari", opts: ["Krishna", "Cauvery", "Godavari", "Narmada"] },
        { q: "Which is the highest peak in India?", a: "Kangchenjunga", opts: ["K2", "Kangchenjunga", "Nanda Devi", "Anamudi"] },
        { q: "Which state in India has the longest coastline?", a: "Gujarat", opts: ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"] }
      ]
    },
    {
      title: "Quantitative Aptitude", emoji: "📈", description: "Algebra, Arithmetic, Geometry, Mensuration & Data Interpretation.", totalQuestions: 980, completedPercentage: 28, categoryId: 19,
      questions: [
        { q: "What is the value of 25% of 160?", a: "40", opts: ["20", "30", "40", "50"] },
        { q: "If a train runs at 72 km/h, what is its speed in m/s?", a: "20 m/s", opts: ["15 m/s", "20 m/s", "25 m/s", "30 m/s"] }
      ]
    },
    {
      title: "Reasoning Ability", emoji: "🧩", description: "Logical Reasoning, Puzzles, Syllogisms, Coding-Decoding & Series.", totalQuestions: 750, completedPercentage: 54, categoryId: 9,
      questions: [
        { q: "If A is coded as 1, B as 2, what is the code for CAT?", a: "24", opts: ["20", "22", "24", "26"] }
      ]
    },
    {
      title: "English Language", emoji: "✍️", description: "Grammar rules, Vocabulary, Reading Comprehension & Sentence Correction.", totalQuestions: 640, completedPercentage: 48, categoryId: 10,
      questions: [
        { q: "Choose the correct synonym for 'Diligent'.", a: "Hardworking", opts: ["Lazy", "Hardworking", "Careless", "Slow"] }
      ]
    }
  ]);

  await StudyPlan.create([
    { day: "Mon", date: 18, title: "Indian Polity — Fundamental Rights", tasks: "Read Laxmikanth Ch 7 · Practice 25 MCQ Quiz", completed: true, week: 3, student: ravi._id },
    { day: "Tue", date: 19, title: "Quantitative Aptitude — Quadratic Equations", tasks: "Complete 3 Video Lectures · Solve Practice Set 4", completed: false, week: 3, student: ravi._id },
    { day: "Wed", date: 20, title: "Modern Indian History — Revolt of 1857", tasks: "Read Spectrum Unit 3 · Attempt Mini Mock Test", completed: false, week: 3, student: ravi._id },
    { day: "Thu", date: 21, title: "English Language — Subject Verb Agreement", tasks: "Practice Grammar Rule Booklet · Worksheets", completed: false, week: 3, student: ravi._id },
    { day: "Fri", date: 22, title: "Geography — Himalayan Drainage System", tasks: "Watch Map Session Part 2 · Practice Atlas Exercises", completed: false, week: 3, student: ravi._id }
  ]);

  await Article.create([
    { title: "G7 Summit Focuses on AI Security Regulations", summary: "Leaders at the annual G7 Summit established a cooperative framework for cross-border artificial intelligence security guidelines and safety auditing benchmarks.", category: "International Relations", date: "Today", icon: "🌐", isLive: false },
    { title: "RBI Reports Record Dividend Transfer to Central Government", summary: "The Reserve Bank of India has approved a historic dividend surplus transfer to the federal Treasury, boosting the state fiscal balance ahead of budget reviews.", category: "Economy", date: "Today", icon: "💰", isLive: false },
    { title: "ISRO Successfully Launches NVS-02 Navigation Satellite", summary: "The Indian Space Research Organisation has successfully deployed the second-generation NavIC satellite series, enhancing navigation reliability across South Asia.", category: "Science & Tech", date: "Yesterday", icon: "🚀", isLive: false }
  ]);

  await SubjectPerformance.create([
    { student: ravi._id, subject: "General Studies", accuracy: 82, color: "linear-gradient(90deg,#6366f1,#a5b4fc)" },
    { student: ravi._id, subject: "English", accuracy: 78, color: "linear-gradient(90deg,#22c55e,#86efac)" },
    { student: ravi._id, subject: "Quantitative Aptitude", accuracy: 61, color: "linear-gradient(90deg,#f97316,#fdba74)" },
    { student: ravi._id, subject: "Reasoning", accuracy: 74, color: "linear-gradient(90deg,#0ea5e9,#7dd3fc)" },
    { student: ravi._id, subject: "Current Affairs", accuracy: 88, color: "linear-gradient(90deg,#8b5cf6,#c4b5fd)" }
  ]);

  await Setting.create({
    platformName: "GovtPrep",
    supportEmail: "support@govtprep.in",
    contactNumber: "+91 98765 43210",
    websiteUrl: "https://govtprep.in",
    notifications: { newRegistration: true, paymentAlerts: true, testReports: false, refundRequests: true },
    features: { studentRegistrations: true, freeMockTests: true, googleLogin: false, maintenanceMode: false }
  });

  console.log('Seed data inserted successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
