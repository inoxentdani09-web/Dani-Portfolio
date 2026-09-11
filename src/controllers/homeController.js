import { db } from '../db/database.js';
import { askDaniyalAI } from '../utils/aiMentor.js';
import { sendEmailNotification } from '../utils/mailer.js';

export const homeController = {
  // Render Main Portfolio Website
  getIndex: (req, res) => {
    try {
      // Only show Published skills, projects, and active courses to the public
      const skills = db.getSkills().filter(s => (s.status || 'Published').toLowerCase() === 'published');
      const projects = db.getProjects().filter(p => (p.status || 'Published').toLowerCase() === 'published');
      
      // Free courses must appear at the top, followed by Paid courses
      const courses = db.getCourses()
        .filter(c => (c.status || 'Published').toLowerCase() !== 'draft')
        .sort((a, b) => {
          const aFree = a.price === 'Free' || a.priceType === 'free' || String(a.price).toLowerCase() === 'free';
          const bFree = b.price === 'Free' || b.priceType === 'free' || String(b.price).toLowerCase() === 'free';
          if (aFree && !bFree) return -1;
          if (!aFree && bFree) return 1;
          return (a.courseID || 0) - (b.courseID || 0);
        });

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
  postSendMessage: async (req, res) => {
    try {
      const { name, email, phone, subject, messageText, message } = req.body;
      const actualMsg = messageText || message;
      if (!name || !email || !actualMsg) {
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
        messageText: actualMsg
      });

      // Dispatch notification email to inoxentdani09@gmail.com
      sendEmailNotification({
        type: 'inquiry',
        name,
        email,
        phone: phone || '',
        subject: subject || 'New Website Contact Inquiry',
        message: actualMsg
      }).catch(err => console.warn('Email notify error:', err));

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
    const skills = db.getSkills(category).filter(s => (s.status || 'Published').toLowerCase() === 'published');
    res.json(skills);
  },

  getProjectsJson: (req, res) => {
    const category = req.query.category || null;
    const projects = db.getProjects(category).filter(p => (p.status || 'Published').toLowerCase() === 'published');
    res.json(projects);
  },

  getCoursesJson: (req, res) => {
    const filter = req.query.type || null;
    const courses = db.getCourses(filter).filter(c => (c.status || 'Published').toLowerCase() !== 'draft');
    res.json(courses);
  },

  getCourseDetailsJson: (req, res) => {
    const id = req.query.id;
    const course = db.getCourseById(id);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  },

  postEnrollCourse: async (req, res) => {
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

      // Notify admin email of new enrollment
      sendEmailNotification({
        type: 'enrollment',
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        courseName: enrollment.courseName,
        amount: enrollment.amountPaid,
        paymentMethod: enrollment.paymentMethod,
        trxId: enrollment.transactionId
      }).catch(err => console.warn('Enrollment email notify error:', err));

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
  },

  postAiChat: async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || !message.trim()) {
        return res.status(400).json({ success: false, reply: 'Please provide a question or message.' });
      }
      const reply = await askDaniyalAI(message.trim(), history || []);
      return res.json({ success: true, reply });
    } catch (error) {
      console.error('AI Chat Error:', error);
      return res.status(500).json({ success: false, reply: 'AI service is temporarily busy. Please try again or ask on WhatsApp.' });
    }
  }
};
