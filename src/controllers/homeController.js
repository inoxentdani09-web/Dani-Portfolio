import { db } from '../db/database.js';

export const homeController = {
  // Render Main Portfolio Website
  getIndex: (req, res) => {
    try {
      const skills = db.getSkills();
      const projects = db.getProjects();
      const courses = db.getCourses();
      const categories = db.getCategories();
      const admin = db.getAdmin();
      const settings = db.getSettings();
      const stats = db.getGlobalStats();

      const messageSuccess = req.query.sent === 'true' 
        ? 'Thank you! Your message has been received successfully. I will get back to you shortly.' 
        : null;

      res.render('home', {
        title: `${admin.name} | ${admin.title}`,
        skills,
        projects,
        courses,
        categories,
        admin,
        settings,
        stats,
        messageSuccess
      }, (err, html) => {
        if (err) {
          console.error('Render Home Error:', err);
          return res.status(500).send('Server Error Rendering Home Page');
        }
        res.render('layout', {
          title: `${admin.name} | ${admin.title}`,
          admin,
          settings,
          body: html
        });
      });
    } catch (error) {
      console.error('Home Page Controller Error:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Submit Contact Message
  postSendMessage: (req, res) => {
    try {
      const { name, email, phone, subject, messageText, message } = req.body;
      if (!name || !email || (!messageText && !message)) {
        if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
          return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
        }
        return res.redirect('/#Contact');
      }

      const saved = db.saveMessage({
        name,
        email,
        phone: phone || '',
        subject: subject || 'New Website Contact Inquiry',
        messageText: messageText || message
      });

      if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
        return res.json({ 
          success: true, 
          message: 'Message submitted successfully! Thank you for reaching out.',
          messageId: saved.messageID 
        });
      }

      res.redirect('/?sent=true#Contact');
    } catch (error) {
      console.error('SendMessage Error:', error);
      if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
        return res.status(500).json({ success: false, message: 'Error processing message.' });
      }
      res.redirect('/#Contact');
    }
  },

  // Public JSON APIs (compatible with original routes)
  getSkillsJson: (req, res) => {
    const category = req.query.category || null;
    res.json(db.getSkills(category));
  },

  getProjectsJson: (req, res) => {
    const category = req.query.category || null;
    res.json(db.getProjects(category));
  },

  getCoursesJson: (req, res) => {
    const filter = req.query.type || null;
    res.json(db.getCourses(filter));
  },

  getCourseDetailsJson: (req, res) => {
    const id = req.query.id;
    const course = db.getCourseById(id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  },

  postEnrollCourse: (req, res) => {
    try {
      const { courseId, courseID, studentName, studentEmail, studentPhone, paymentMethod, transactionId, trxId, screenshotProof } = req.body;
      const targetCourseId = courseId || courseID;
      
      if (!targetCourseId || !studentName || !studentEmail) {
        return res.status(400).json({ success: false, message: 'Please provide course, your name and email.' });
      }

      const enrollment = db.enrollInCourse({
        courseId: targetCourseId,
        studentName,
        studentEmail,
        studentPhone,
        paymentMethod: paymentMethod || 'JazzCash',
        transactionId: transactionId || trxId,
        screenshotProof: screenshotProof || ''
      });

      return res.json({
        success: true,
        message: enrollment.status === 'Approved' 
          ? 'Free access granted! You can begin learning immediately.' 
          : 'Enrollment application submitted to Daniyal Khan! Your access will be approved after payment confirmation.',
        enrollment
      });
    } catch (err) {
      console.error('Enroll Error:', err);
      return res.status(500).json({ success: false, message: 'Enrollment processing error. Please try again.' });
    }
  },

  getCheckEnrollment: (req, res) => {
    try {
      const query = req.query.query || req.query.email || req.query.trx;
      if (!query) {
        return res.status(400).json({ success: false, message: 'Please enter your email or Transaction ID.' });
      }
      const enrollments = db.getStudentEnrollments(query);
      return res.json({
        success: true,
        enrollments
      });
    } catch (err) {
      console.error('Check Enrollment Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to look up enrollment.' });
    }
  }
};
