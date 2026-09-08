import * as XLSX from 'xlsx';
import { db } from '../db/database.js';

export const adminController = {
  // ================= AUTH =================
  getLogin: (req, res) => {
    if (req.query.logged_out === 'true') {
      res.clearCookie('admin_session', { path: '/', sameSite: 'none', secure: true });
      res.clearCookie('admin_session', { path: '/' });
      res.clearCookie('admin_session');
      const admin = db.getAdmin();
      return res.render('admin/login', {
        error: null,
        email: admin.email || 'admin@gmail.com',
        password: ''
      });
    }

    if (req.cookies && req.cookies.admin_session === 'authenticated') {
      return res.redirect('/Admin/Dashboard');
    }
    const admin = db.getAdmin();
    res.render('admin/login', {
      error: null,
      email: admin.email || 'admin@gmail.com',
      password: ''
    });
  },

  postLogin: (req, res) => {
    const { email, password, remember } = req.body;
    const isValid = db.validateAdmin(email, password);
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest' || req.headers.accept?.includes('application/json');

    if (isValid) {
      const maxAge = remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
      res.cookie('admin_session', 'authenticated', {
        maxAge: maxAge,
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        path: '/'
      });

      if (isAjax) {
        return res.json({ success: true, redirect: '/Admin/Dashboard?auth=authenticated' });
      }
      return res.redirect('/Admin/Dashboard?auth=authenticated');
    }

    if (isAjax) {
      return res.status(400).json({ success: false, message: 'Invalid email or password. Default credentials: admin@gmail.com / admin1234' });
    }

    res.render('admin/login', {
      error: 'Invalid email or password. Default credentials: admin@gmail.com / admin1234',
      email: email || 'admin@gmail.com',
      password: ''
    });
  },

  getLogout: (req, res) => {
    res.clearCookie('admin_session', { path: '/', sameSite: 'none', secure: true });
    res.clearCookie('admin_session', { path: '/' });
    res.clearCookie('admin_session');
    res.cookie('admin_session', '', { maxAge: 0, expires: new Date(0), path: '/', sameSite: 'none', secure: true });
    res.cookie('admin_session', '', { maxAge: 0, expires: new Date(0), path: '/' });
    
    if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
      return res.json({ success: true, redirect: '/Admin/Login?logged_out=true' });
    }
    res.redirect('/Admin/Login?logged_out=true');
  },

  // ================= DASHBOARD & PAGES =================
  getDashboard: (req, res) => {
    const stats = db.getGlobalStats();
    const projects = db.getProjects();
    const skills = db.getSkills();
    const courses = db.getCourses();
    const messages = db.getMessages();
    const admin = db.getAdmin();
    const settings = db.getSettings();
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    res.render('admin/partials/dashboard_content', {
      stats,
      projects,
      skills,
      courses,
      messages,
      admin,
      settings
    }, (err, content) => {
      if (err) {
        console.error('Render Dashboard Content Error:', err);
        return res.status(500).send('Error loading dashboard');
      }
      if (isAjax) return res.send(content);

      res.render('admin/dashboard', {
        activeTab: 'dashboard',
        activeTitle: 'Dashboard Overview',
        stats,
        admin,
        settings,
        currentContent: content
      });
    });
  },

  getProjectsPage: (req, res) => {
    const stats = db.getGlobalStats();
    const projects = db.getProjects();
    const categories = db.getCategories('project');
    const admin = db.getAdmin();
    const settings = db.getSettings();
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    res.render('admin/partials/projects_content', {
      projects,
      categories,
      stats,
      admin,
      settings
    }, (err, content) => {
      if (err) {
        console.error('Render Projects Content Error:', err);
        return res.status(500).send('Error loading projects');
      }
      if (isAjax) return res.send(content);

      res.render('admin/dashboard', {
        activeTab: 'projects',
        activeTitle: 'Projects Management',
        stats,
        admin,
        settings,
        currentContent: content
      });
    });
  },

  getSkillsPage: (req, res) => {
    const stats = db.getGlobalStats();
    const skills = db.getSkills();
    const categories = db.getCategories('skill');
    const admin = db.getAdmin();
    const settings = db.getSettings();
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    res.render('admin/partials/skills_content', {
      skills,
      categories,
      stats,
      admin,
      settings
    }, (err, content) => {
      if (err) {
        console.error('Render Skills Content Error:', err);
        return res.status(500).send('Error loading skills');
      }
      if (isAjax) return res.send(content);

      res.render('admin/dashboard', {
        activeTab: 'skills',
        activeTitle: 'Skills & Tech Stack',
        stats,
        admin,
        settings,
        currentContent: content
      });
    });
  },

  getCoursesPage: (req, res) => {
    const stats = db.getGlobalStats();
    const courses = db.getCourses();
    const categories = db.getCategories('skill');
    const admin = db.getAdmin();
    const settings = db.getSettings();
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    res.render('admin/partials/courses_content', {
      courses,
      categories,
      stats,
      admin,
      settings
    }, (err, content) => {
      if (err) {
        console.error('Render Courses Content Error:', err);
        return res.status(500).send('Error loading courses');
      }
      if (isAjax) return res.send(content);

      res.render('admin/dashboard', {
        activeTab: 'courses',
        activeTitle: 'Courses & Certifications',
        stats,
        admin,
        settings,
        currentContent: content
      });
    });
  },

  getMessagesPage: (req, res) => {
    const stats = db.getGlobalStats();
    const messages = db.getMessages();
    const admin = db.getAdmin();
    const settings = db.getSettings();
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    res.render('admin/partials/messages_content', {
      messages,
      stats,
      admin,
      settings
    }, (err, content) => {
      if (err) {
        console.error('Render Messages Content Error:', err);
        return res.status(500).send('Error loading messages');
      }
      if (isAjax) return res.send(content);

      res.render('admin/dashboard', {
        activeTab: 'messages',
        activeTitle: 'Client Messages Inbox',
        stats,
        admin,
        settings,
        currentContent: content
      });
    });
  },

  getSettingsPage: (req, res) => {
    const stats = db.getGlobalStats();
    const admin = db.getAdmin();
    const settings = db.getSettings();
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';
    const flashMessage = req.query.saved === 'true' ? 'Settings updated successfully!' : null;

    res.render('admin/partials/settings_content', {
      admin,
      settings,
      stats,
      flashMessage
    }, (err, content) => {
      if (err) {
        console.error('Render Settings Content Error:', err);
        return res.status(500).send('Error loading settings');
      }
      if (isAjax) return res.send(content);

      res.render('admin/dashboard', {
        activeTab: 'settings',
        activeTitle: 'System & Profile Settings',
        stats,
        admin,
        settings,
        currentContent: content
      });
    });
  },

  getEnrollmentsPage: (req, res) => {
    const stats = db.getGlobalStats();
    const enrollments = db.getEnrollments();
    const courses = db.getCourses();
    const admin = db.getAdmin();
    const settings = db.getSettings();
    const isAjax = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';

    res.render('admin/partials/enrollments_content', {
      enrollments,
      courses,
      stats,
      admin,
      settings
    }, (err, content) => {
      if (err) {
        console.error('Render Enrollments Content Error:', err);
        return res.status(500).send('Error loading enrollments');
      }
      if (isAjax) return res.send(content);

      res.render('admin/dashboard', {
        activeTab: 'enrollments',
        activeTitle: 'Course Enrollments & Student Access',
        stats,
        admin,
        settings,
        currentContent: content
      });
    });
  },

  // ================= PROJECT ACTIONS =================
  getProjectById: (req, res) => {
    const id = req.query.id;
    const project = db.getProjectById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  },

  postCreateProject: (req, res) => {
    try {
      const imageFileName = req.file ? req.file.filename : null;
      db.saveProject(req.body, imageFileName);
      res.redirect('/Admin/Projects');
    } catch (error) {
      console.error('Create Project Error:', error);
      res.redirect('/Admin/Projects');
    }
  },

  postDeleteProject: (req, res) => {
    const id = req.body.id || req.query.id;
    db.deleteProject(id);
    res.json({ success: true, message: 'Project deleted successfully' });
  },

  getExportProjects: (req, res) => {
    try {
      const projects = db.getProjects();
      const exportData = projects.map(p => ({
        'Project ID': p.projectID,
        'Project Title': p.title,
        'Category': p.category,
        'Technology': p.technalogy,
        'Tech Stack': Array.isArray(p.techStack) ? p.techStack.join(', ') : p.technalogy,
        'Status': p.status,
        'GitHub URL': p.gitHub,
        'Live Demo URL': p.liveDemo,
        'Created Date': p.createdDate,
        'Description': p.description
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');

      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      res.setHeader('Content-Disposition', 'attachment; filename="Daniyal_Portfolio_Projects.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      console.error('Export Error:', error);
      res.status(500).send('Error generating project export.');
    }
  },

  // ================= SKILL ACTIONS =================
  getSkillById: (req, res) => {
    const id = req.query.id;
    const skill = db.getSkillById(id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.json(skill);
  },

  postSaveSkill: (req, res) => {
    try {
      const iconFileName = req.file ? req.file.filename : req.body.Icon;
      db.saveSkill(req.body, iconFileName);
      res.redirect('/Admin/Skill');
    } catch (error) {
      console.error('Save Skill Error:', error);
      res.redirect('/Admin/Skill');
    }
  },

  postDeleteSkill: (req, res) => {
    const id = req.body.id || req.query.id;
    db.deleteSkill(id);
    res.json({ success: true, message: 'Skill deleted successfully' });
  },

  // ================= COURSE ACTIONS =================
  getCourseById: (req, res) => {
    const id = req.query.id;
    const course = db.getCourseById(id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  },

  postSaveCourse: (req, res) => {
    try {
      db.saveCourse(req.body);
      res.redirect('/Admin/Course');
    } catch (error) {
      console.error('Save Course Error:', error);
      res.redirect('/Admin/Course');
    }
  },

  postDeleteCourse: (req, res) => {
    const id = req.body.id || req.query.id;
    db.deleteCourse(id);
    res.json({ success: true, message: 'Course deleted successfully' });
  },

  // ================= MESSAGE ACTIONS =================
  getMessageById: (req, res) => {
    const id = req.query.id;
    const msg = db.getMessageById(id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    db.markMessageRead(id);
    res.json(msg);
  },

  postToggleMessageStar: (req, res) => {
    const id = req.body.id;
    const msg = db.toggleMessageStar(id);
    res.json({ success: true, isStarred: msg ? msg.isStarred : false });
  },

  postReplyMessage: (req, res) => {
    const { id, replyText } = req.body;
    const msg = db.replyToMessage(id, replyText);
    res.json({ success: true, message: 'Reply saved and marked as sent!', data: msg });
  },

  postDeleteMessage: (req, res) => {
    const id = req.body.id || req.query.id;
    db.deleteMessage(id);
    res.json({ success: true, message: 'Message deleted successfully' });
  },

  // ================= SETTINGS & PROFILE ACTIONS =================
  postUpdateProfile: (req, res) => {
    try {
      const avatarFileName = req.file ? req.file.filename : null;
      db.updateAdminProfile(req.body, avatarFileName);
      res.redirect('/Admin/Settings?saved=true');
    } catch (error) {
      console.error('Update Profile Error:', error);
      res.redirect('/Admin/Settings?error=true');
    }
  },

  postChangePassword: (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'New passwords do not match.' });
      }
      const result = db.updateAdminPassword(currentPassword, newPassword);
      res.json(result);
    } catch (error) {
      console.error('Change Password Error:', error);
      res.status(500).json({ success: false, message: 'Failed to update password.' });
    }
  },

  postUpdateSiteSettings: (req, res) => {
    try {
      db.updateSettings(req.body);
      res.redirect('/Admin/Settings?saved=true');
    } catch (error) {
      console.error('Update Site Settings Error:', error);
      res.redirect('/Admin/Settings?error=true');
    }
  },

  postUpdatePaymentAccounts: (req, res) => {
    try {
      const current = db.getSettings();
      const updatedPaymentAccounts = {
        ...(current.paymentAccounts || {}),
        jazzCashNumber: req.body.jazzCashNumber || '0318-2315238',
        jazzCashTitle: req.body.jazzCashTitle || 'Daniyal Khan',
        easyPaisaNumber: req.body.easyPaisaNumber || '0318-2315238',
        easyPaisaTitle: req.body.easyPaisaTitle || 'Daniyal Khan',
        bankName: req.body.bankName || 'Meezan Bank / HBL',
        bankAccountNumber: req.body.bankAccountNumber || '0102-03182315238',
        bankIban: req.body.bankIban || 'PK36MEZN00010203182315238',
        bankAccountTitle: req.body.bankAccountTitle || 'Daniyal Khan',
        instructions: req.body.instructions || 'Send fee to account above, copy TID, and upload screenshot.'
      };

      db.updateSettings({ paymentAccounts: updatedPaymentAccounts });
      res.redirect('/Admin/Settings?paymentSaved=true');
    } catch (error) {
      console.error('Update Payment Accounts Error:', error);
      res.redirect('/Admin/Settings?error=true');
    }
  },

  // ================= ENROLLMENT APPROVAL ACTIONS =================
  postApproveEnrollment: (req, res) => {
    try {
      const { id, notes } = req.body;
      const approved = db.approveEnrollment(id, notes);
      res.json({
        success: true,
        message: `Student enrollment #${id} approved successfully! Access Key generated.`,
        enrollment: approved
      });
    } catch (error) {
      console.error('Approve Enrollment Error:', error);
      res.status(500).json({ success: false, message: 'Failed to approve enrollment.' });
    }
  },

  postRejectEnrollment: (req, res) => {
    try {
      const { id, reason } = req.body;
      const rejected = db.rejectEnrollment(id, reason);
      res.json({
        success: true,
        message: `Enrollment #${id} marked as rejected.`,
        enrollment: rejected
      });
    } catch (error) {
      console.error('Reject Enrollment Error:', error);
      res.status(500).json({ success: false, message: 'Failed to reject enrollment.' });
    }
  },

  postDeleteEnrollment: (req, res) => {
    try {
      const id = req.body.id || req.query.id;
      db.deleteEnrollment(id);
      res.json({ success: true, message: 'Enrollment record deleted successfully.' });
    } catch (error) {
      console.error('Delete Enrollment Error:', error);
      res.status(500).json({ success: false, message: 'Failed to delete enrollment.' });
    }
  }
};
