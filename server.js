const express = require('express');
const cors = require('cors');
const examRoutes = require('./routes/examRoutes'); 
const db = require('./config/db'); // Database pool connection

const app = express();
const PORT = process.env.PORT || 3000; // Render/Railway వంటి సర్వర్లలో dynamic port వాడటానికి

app.use(express.json());
app.use(cors({ origin: '*' })); // Render dynamic hosted domains కోసం '*' ఇవ్వడం మంచిది

// =========================================================================
// AUTO DATABASE TABLES CREATION INITIALIZER
// డేటాబేస్‌లో టేబుల్స్ లేకపోతే సర్వర్ స్టార్ట్ అయినప్పుడు ఆటోమేటిక్‌గా క్రియేట్ అవుతాయి
// =========================================================================
async function initializeDatabase() {
  try {
    // 1. PDF Extract చేసిన ప్రశ్నలను దాచడానికి టేబుల్
    await db.query(`
      CREATE TABLE IF NOT EXISTS pdf_generated_questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question_text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_option TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. విద్యార్థుల Exam Responses టేబుల్
    await db.query(`
      CREATE TABLE IF NOT EXISTS student_exam_responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question_id INT NOT NULL,
        selected_option_text TEXT NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. User Login Accounts టేబుల్
    await db.query(`
      CREATE TABLE IF NOT EXISTS portal_user_accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        login_id VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        user_role VARCHAR(50) NOT NULL DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('[Database Setup Success] All tables verified/created successfully.');
  } catch (error) {
    console.error('[Database Setup Error] Failed to initialize database tables:', error.message);
  }
}

// Database Initializer Run చేయండి
initializeDatabase();

// Base root endpoint route dynamic allocation
app.use('/api/exams', examRoutes);

app.listen(PORT, () => {
  console.log(`[MVC Architecture Engine] Server runs listening actively on port: ${PORT}`);
});