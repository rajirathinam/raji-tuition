# Tuitix – Smart Tuition Management System

A comprehensive tuition management platform designed to streamline educational administration, student engagement, and payment processing.

## Features

### ✅ Completed Features
- **User Management System**
  - Student Registration & Management
  - Tutor Registration with Admin Approval
  - Role-based Authentication (Admin, Tutor, Student)
  - Secure Password Reset with Email Verification

- **Email Notification System**
  - Student registration confirmation emails
  - Tutor application pending notifications
  - Tutor approval/decline notifications

- **Class Management**
  - Class Schedule Updates
  - Class Creation & Assignment
  - Student Enrollment System

- **File Management**
  - Document Upload & Storage (Cloudinary Integration)
  - File Sharing Between Tutors & Students
  - Assignment Submission System

- **Communication**
  - Feedback System
  - Announcement Management
  - Gallery for Educational Content

## 🚀 Development Roadmap

### Phase 1: Enhanced Authentication
- **Authentication Enhancements**
  - OAuth Google Integration
  - Google Two-Factor Authentication (2FA)
  - Sign in with Google option

### Phase 2: Payment & Performance
- **Payment Gateway Integration**
  - Fee payment processing
  - Automated payment reminders
  - Payment history tracking
- **Performance Analytics**
  - AI-powered student performance analysis
  - Progress tracking and reporting
  - Personalized learning insights

### Phase 3: User Experience Enhancement
- **Frontend Improvements**
  - Home page redesign and enhancement
  - About page with comprehensive information
  - Three distinct login portals (Admin/Tutor/Student)
- **Student Dashboard**
  - Performance metrics visualization
  - Assignment tracking
  - Payment status overview

### Phase 4: Advanced Features
- **Live Learning Platform**
  - Real-time online classes
  - Interactive whiteboard for tutors
  - Screen sharing capabilities
- **Real-time Communication**
  - Chat system using Socket.io
  - Study rooms for group discussions
  - AI-powered chatbot for instant support

## Tech Stack

- **Frontend:** React/Next.js
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Authentication:** JWT, OAuth (Google)
- **Email Service:** Nodemailer with Gmail SMTP
- **File Storage:** Cloudinary
- **Real-time Communication:** Socket.io
- **Payment Processing:** Stripe/Razorpay (Planned)
- **AI Integration:** OpenAI API (Planned)

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd tuition-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start backend server
cd ../backend
npm start

# Start frontend development server
cd ../frontend
npm start
```

## Environment Setup

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/tuitionApp
JWT_SECRET=your-jwt-secret
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Project Structure

```
tuition-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── Middleware/
│   └── config/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── public/
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License

---

**Current Status:** Phase 1 Development - Email Notification System Completed ✅

## 🎓 Tuition App - Complete Feature Analysis

### Core System Architecture
- **Backend:** Node.js + Express.js + MongoDB
- **Frontend:** React.js with responsive design
- **Authentication:** JWT + Google OAuth
- **File Storage:** Cloudinary integration
- **Email Service:** Nodemailer with Gmail

### 👥 User Management System

#### Authentication & Authorization
- Multi-role system: Student, Tutor, Admin
- Registration: Email/password + Google OAuth
- Login: JWT-based authentication
- Password Reset: Email-based token system
- Role-based access control
- Tutor approval workflow (pending → approved/declined)

#### User Roles & Permissions
- **Students:** Class 8-12 enrollment, assignments, payments
- **Tutors:** Class management, assignment creation, student progress
- **Admin:** Full system control, user management, approvals

### 📚 Class Management System

#### Class Features
- Class Creation: Name, subject, schedule, tutor assignment
- Student Enrollment: Automatic enrollment based on class level
- Class Status: Scheduled, completed, cancelled
- Resource Management: Links and materials per class
- Announcements: Class-specific announcements
- Student-Tutor Mapping: Automatic assignment based on class level

#### Subjects Supported
- Mathematics, Science, English, Social Studies
- Physics, Chemistry, Biology, Computer Science
- Languages: Tamil, Hindi, Sanskrit, French, German

### 📝 Assignment System

#### Assignment Management
- Assignment Creation: Title, description, subject, class level
- File Attachments: Multiple file support with Cloudinary
- Due Date Management: Deadline tracking
- Difficulty Levels: Easy, Medium, Hard
- Point System: Configurable total points (default: 100)

#### Submission System
- Student Submissions: Text content + file attachments
- Late Submission Tracking: Automatic late detection
- Submission Status: Submitted → Graded → Returned
- File Upload: Multiple attachment support

#### Grading System
- Points-based Grading: Earned points vs total points
- Feedback System: Detailed tutor feedback
- Grade Tracking: Historical grade records
- Performance Analytics: Subject-wise performance

### 💰 Payment Management System

#### Payment Features
- GPay QR Code Integration: QR code-based payments
- Screenshot Upload: Payment proof submission
- Monthly Payment Tracking: Month-wise payment records
- Payment Status: Pending → Verified/Rejected
- Payment History: Complete transaction history

#### Admin Payment Controls
- Payment Verification: Admin approval workflow
- Rejection with Reasons: Detailed rejection feedback
- Payment Statistics: Monthly revenue tracking
- Payment Reminders: Automated email reminders
- Resubmission System: Failed payment resubmission

### 📊 Performance Tracking System

#### Student Performance
- Exam Records: Unit tests, mid-terms, finals
- Grade Calculation: Automatic percentage and grade assignment
- Subject-wise Analytics: Performance by subject
- Academic Year Tracking: Term-based organization
- Performance Trends: Historical performance analysis

#### Grade System
- A+: 90%+, A: 80-89%, B+: 70-79%
- B: 60-69%, C: 50-59%, F: Below 50%

### 🎮 Gamification System

#### Badge System
- Achievement Categories: Performance, attendance, assignment, streak, special
- Badge Types: Common, rare, epic, legendary
- Criteria-based Awards: Assignment count, performance average, login streaks
- Point Rewards: Badge-specific point awards

#### User Statistics
- Points System: Total, weekly, monthly points
- Level System: XP-based leveling with increasing requirements
- Streak Tracking: Login streaks and longest streaks
- Achievement Tracking: Badges earned, assignments completed

#### Leaderboard
- Multiple Rankings: Total points, weekly, monthly, streak-based
- User Comparison: Rank-based competitive system

### 📢 Communication System

#### Announcement System
- Global Announcements: Admin-wide broadcasts
- Announcement Types: General, holiday, urgent
- Class Announcements: Class-specific messages
- Real-time Display: Dashboard integration

#### Email Notifications
- Registration Confirmations: Welcome emails
- Tutor Status Updates: Approval/decline notifications
- Payment Confirmations: Payment status updates
- Password Reset: Secure token-based reset

### 📁 File Management System

#### File Upload & Storage
- Cloudinary Integration: Cloud-based file storage
- Multiple File Types: Documents, images, PDFs
- Class-based Organization: Files organized by class
- Access Control: Role-based file access

#### Study Materials
- Resource Links: External resource management
- File Sharing: Tutor-to-student file distribution
- Download Tracking: File access monitoring

### 📱 Dashboard Systems

#### Admin Dashboard
- User Management: Student/tutor overview
- Statistics Display: Active users, classes, materials
- Approval Workflow: Tutor approval interface
- Announcement Management: Global announcement creation
- System Analytics: Comprehensive system stats

#### Student Dashboard
- Real-time Clock: Live time display
- Class Overview: Enrolled classes display
- Study Materials: Accessible resources
- Announcements: Global and class announcements
- Assignment Access: Assignment submission interface

#### Tutor Dashboard
- Class Management: Tutor's class overview
- Student Progress: Performance analytics
- Assignment Creation: Assignment management tools
- Announcement Display: System announcements

### 🔐 Security Features

#### Authentication Security
- Password Hashing: bcrypt encryption
- JWT Tokens: Secure session management
- Role-based Access: Endpoint protection
- Google OAuth: Secure third-party authentication

#### Data Protection
- Input Validation: Server-side validation
- File Upload Security: Secure file handling
- Database Security: MongoDB security practices

### 📧 Email Integration

#### Automated Emails
- Welcome Emails: New user registration
- Status Updates: Tutor approval/decline
- Payment Notifications: Payment confirmations
- Reminders: Payment due reminders
- Password Reset: Secure reset links

### 🎨 Frontend Features

#### User Interface
- Responsive Design: Mobile-friendly interface
- Interactive Elements: Hover effects, animations
- Modal Systems: Popup interfaces
- Form Validation: Client-side validation
- Real-time Updates: Dynamic content updates

#### Navigation
- Role-based Menus: Customized navigation per role
- Breadcrumb Navigation: Clear navigation paths
- Search Functionality: Content search capabilities

### 🔧 Technical Features

#### API Architecture
- RESTful APIs: Standard HTTP methods
- Middleware Integration: Authentication, file upload
- Error Handling: Comprehensive error management
- Database Optimization: Efficient queries and indexing

#### Development Features
- Environment Configuration: Development/production settings
- Logging System: Comprehensive error logging
- Database Seeding: Initial data setup
- CORS Configuration: Cross-origin resource sharing

This tuition app is a comprehensive educational management system with features covering user management, class organization, assignment handling, payment processing, performance tracking, gamification, and communication - making it a complete solution for tuition center management.
