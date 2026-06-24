-- RUSL Student Management Portal Database Schema

-- Students Table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone_number VARCHAR(15),
    registration_number VARCHAR(50) UNIQUE,
    date_of_birth DATE,
    faculty VARCHAR(100),
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects Table
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(200) NOT NULL,
    credits INTEGER DEFAULT 3,
    faculty VARCHAR(100),
    semester INTEGER
);

-- Registrations Table (Subject Enrollment)
CREATE TABLE subject_registrations (
    registration_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),
    subject_id INTEGER REFERENCES subjects(subject_id),
    academic_year VARCHAR(10),
    semester INTEGER,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exams Table
CREATE TABLE exams (
    exam_id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(subject_id),
    exam_date DATE,
    exam_time TIME,
    venue VARCHAR(100)
);

-- Exam Entries (Admit list)
CREATE TABLE exam_entries (
    entry_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),
    exam_id INTEGER REFERENCES exams(exam_id),
    admit_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Administrators Table
CREATE TABLE administrators (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'STAFF' -- STAFF, SUPERADMIN
);
