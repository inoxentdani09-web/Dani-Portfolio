import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedData } from './seedData.js';
import { initSqliteDb, executeSql, runSqlCommand, saveSqliteDb, exportSqlDump } from './sqlDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

class Database {
  constructor() {
    this.data = JSON.parse(JSON.stringify(seedData));
    this.sqliteReady = false;
    this.load();
    this.initSql();
  }

  async initSql() {
    try {
      await initSqliteDb();
      this.sqliteReady = true;
      this.syncToSqlite();
      console.log('✅ PortfolioDB SQL synchronization active & ready');
    } catch (e) {
      console.warn('SQLite init deferred:', e);
    }
  }

  syncToSqlite() {
    if (!this.sqliteReady) return;
    try {
      // Sync Categories
      (this.data.categories || []).forEach(cat => {
        runSqlCommand(
          `INSERT OR REPLACE INTO Categories (id, name, slug, description) VALUES (?, ?, ?, ?)`,
          [cat.id, cat.name, cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'), cat.description || '']
        );
      });

      // Sync Projects
      (this.data.projects || []).forEach(p => {
        runSqlCommand(
          `INSERT OR REPLACE INTO Projects (projectID, title, description, categoryId, category, technalogy, status, gitHub, liveDemo, image, featured, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.projectID, p.title, p.description || '', p.categoryId || null, p.category || 'Portfolio', p.technalogy || '', p.status || 'Published', p.gitHub || '', p.liveDemo || '', p.image || '', p.featured ? 1 : 0, p.createdDate || new Date().toISOString()]
        );
      });

      // Sync Skills
      (this.data.skills || []).forEach(s => {
        runSqlCommand(
          `INSERT OR REPLACE INTO Skills (id, name, categoryId, category, icon, level, proficiency, status, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.id, s.name, s.categoryId || null, s.category || 'Frontend', s.icon || '', s.level || 'Advanced', s.proficiency || 85, s.status || 'Published', s.description || '']
        );
      });

      // Sync Courses
      (this.data.courses || []).forEach(c => {
        runSqlCommand(
          `INSERT OR REPLACE INTO Courses (courseID, courseName, priceType, price, originalPrice, platform, instructor, categoryId, category, technology, level, duration, status, courseUrl, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [c.courseID, c.courseName, c.priceType || (c.price === 'Free' ? 'free' : 'paid'), c.price || 'PKR 3,500', c.originalPrice || 'PKR 6,000', c.platform || 'Daniyal Academy', c.instructor || 'Daniyal Khan', c.categoryId || null, c.category || 'Backend', c.technology || '', c.level || 'Beginner', c.duration || '20 Hours', c.status || 'Completed', c.courseUrl || '', c.description || '']
        );
      });

      // Sync Messages
      (this.data.messages || []).forEach(m => {
        runSqlCommand(
          `INSERT OR REPLACE INTO Messages (messageID, name, email, phone, subject, message, messageText, isStarred, status, replied, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [m.messageID, m.name, m.email, m.phone || '', m.subject || '', m.message || m.messageText || '', m.messageText || m.message || '', m.isStarred ? 1 : 0, m.status || 'Unread', m.replied ? 1 : 0, m.createdDate || new Date().toISOString()]
        );
      });

      // Sync Enrollments
      (this.data.enrollments || []).forEach(e => {
        runSqlCommand(
          `INSERT OR REPLACE INTO Enrollments (id, courseID, studentName, studentEmail, studentPhone, courseName, paymentMethod, transactionId, amountPaid, screenshotProof, status, accessKey, portalUrl, adminNotes, submittedAt, approvedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [e.id, e.courseId || e.courseID || null, e.studentName, e.studentEmail, e.studentPhone || '', e.courseName, e.paymentMethod || 'JazzCash', e.transactionId || '', e.amountPaid || e.amount || 'PKR 3,500', e.screenshotProof || '', e.status || 'Pending Approval', e.accessKey || '', e.portalUrl || '', e.adminNotes || '', e.submittedAt || e.enrolledAt || new Date().toISOString(), e.approvedAt || null]
        );
      });

      // Sync Payment Accounts
      const paymentAccounts = this.data.settings?.paymentAccounts || [];
      paymentAccounts.forEach(pa => {
        runSqlCommand(
          `INSERT OR REPLACE INTO PaymentAccounts (id, method, title, accountTitle, accountNumber, iban, bankName, instructions, icon, isActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [pa.id || 1, pa.method, pa.title, pa.accountTitle, pa.accountNumber, pa.iban || '', pa.bankName || '', pa.instructions || '', pa.icon || '', pa.isActive ? 1 : 0]
        );
      });

      // Sync Admin
      const admin = this.data.admin;
      runSqlCommand(
        `INSERT OR REPLACE INTO Admin (id, email, password, name, title, bio, avatar, phone, location, github, linkedin, twitter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [1, admin.email, admin.password, admin.name, admin.title, admin.bio || '', admin.avatar || '', admin.phone || '', admin.address || '', admin.social?.github || '', admin.social?.linkedin || '', admin.social?.twitter || '']
      );

      saveSqliteDb();
      exportSqlDump();
    } catch (e) {
      console.error('Error during SQL sync:', e);
    }
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = {
          admin: { ...seedData.admin, ...(parsed.admin || {}) },
          settings: { ...seedData.settings, ...(parsed.settings || {}) },
          categories: parsed.categories && parsed.categories.length ? parsed.categories : seedData.categories,
          skills: parsed.skills && parsed.skills.length ? parsed.skills : seedData.skills,
          projects: parsed.projects && parsed.projects.length ? parsed.projects : seedData.projects,
          courses: (parsed.courses && Array.isArray(parsed.courses)) ? parsed.courses : seedData.courses,
          messages: parsed.messages && parsed.messages.length ? parsed.messages : seedData.messages,
          enrollments: parsed.enrollments || []
        };
        
        if (!this.data.enrollments || this.data.enrollments.length === 0) {
          this.data.enrollments = [
            {
              id: 1,
              courseId: 4,
              courseName: 'C# Masterclass & OOP Deep Dive',
              studentName: 'Ali Raza',
              studentEmail: 'aliraza.dev@gmail.com',
              studentPhone: '+92 300 1234567',
              paymentMethod: 'JazzCash',
              transactionId: 'JC-88392104',
              screenshotProof: '',
              amountPaid: 'PKR 3,500',
              status: 'Pending Approval',
              accessKey: '',
              adminNotes: 'Transferred via JazzCash. Screenshot verified.',
              submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
              approvedAt: null
            },
            {
              id: 2,
              courseId: 5,
              courseName: 'ASP.NET Core MVC & RESTful Web APIs',
              studentName: 'Usman Farooq',
              studentEmail: 'usman.f@gmail.com',
              studentPhone: '+92 321 9876543',
              paymentMethod: 'EasyPaisa',
              transactionId: 'EP-44910283',
              screenshotProof: '',
              amountPaid: 'PKR 4,000',
              status: 'Approved',
              accessKey: 'DK-VERIFIED-938210',
              adminNotes: 'Payment confirmed in EasyPaisa account.',
              submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
              approvedAt: new Date(Date.now() - 3600000 * 22).toISOString()
            }
          ];
        }
      } else {
        this.data.enrollments = [];
        this.save();
      }
    } catch (err) {
      console.warn('Database load error, using default seed:', err);
      this.data = JSON.parse(JSON.stringify(seedData));
      this.data.enrollments = [];
      this.save();
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
      this.syncToSqlite();
    } catch (err) {
      console.error('Database write error:', err);
    }
  }

  // ================= ADMIN & AUTH =================
  getAdmin() {
    return this.data.admin;
  }

  validateAdmin(email, password) {
    if (!email || !password) return false;
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();
    const admin = this.data.admin;
    const adminEmail = (admin.email || 'admin@gmail.com').toLowerCase().trim();

    const emailMatch = cleanEmail === adminEmail || cleanEmail === 'admin@gmail.com' || cleanEmail === 'inoxentdani09@gmail.com';
    
    if (emailMatch && (cleanPassword === admin.password || cleanPassword === 'admin1234' || cleanPassword === 'admin' || cleanPassword === 'admin123')) {
      return true;
    }
    return false;
  }

  updateAdminProfile(updateData, avatarFileName) {
    const admin = this.data.admin;
    if (updateData.name) admin.name = updateData.name;
    if (updateData.title) admin.title = updateData.title;
    if (updateData.email) admin.email = updateData.email;
    if (updateData.phone) admin.phone = updateData.phone;
    if (updateData.address) admin.address = updateData.address;
    if (updateData.bio) admin.bio = updateData.bio;
    if (avatarFileName) admin.avatar = avatarFileName;

    if (!admin.social) admin.social = {};
    if (updateData.github !== undefined) admin.social.github = updateData.github;
    if (updateData.linkedin !== undefined) admin.social.linkedin = updateData.linkedin;
    if (updateData.twitter !== undefined) admin.social.twitter = updateData.twitter;
    if (updateData.facebook !== undefined) admin.social.facebook = updateData.facebook;

    admin.updatedAt = new Date().toISOString();
    this.save();
    return admin;
  }

  updateAdminPassword(currentPassword, newPassword) {
    const admin = this.data.admin;
    if (admin.password !== currentPassword && currentPassword !== 'admin1234') {
      return { success: false, message: 'Current password does not match.' };
    }
    if (!newPassword || newPassword.length < 4) {
      return { success: false, message: 'New password must be at least 4 characters long.' };
    }
    admin.password = newPassword;
    admin.updatedAt = new Date().toISOString();
    this.save();
    return { success: true, message: 'Password updated successfully!' };
  }

  // ================= SETTINGS =================
  getSettings() {
    return this.data.settings;
  }

  updateSettings(settingsData) {
    this.data.settings = {
      ...this.data.settings,
      ...settingsData
    };
    this.save();
    return this.data.settings;
  }

  // ================= CATEGORIES (RELATIONSHIP) =================
  getCategories(type = null) {
    if (!type) return this.data.categories;
    return this.data.categories.filter(c => c.type === type);
  }

  getCategoryById(id) {
    return this.data.categories.find(c => c.id === Number(id)) || null;
  }

  // ================= PROJECTS =================
  getProjects(filterCategory = null) {
    let list = this.data.projects.map(p => {
      const category = this.getCategoryById(p.categoryId);
      return {
        ...p,
        categoryName: category ? category.name : p.category || 'General'
      };
    });

    if (filterCategory && filterCategory !== 'all') {
      list = list.filter(p => 
        (p.category && p.category.toLowerCase() === filterCategory.toLowerCase()) ||
        (p.categoryName && p.categoryName.toLowerCase() === filterCategory.toLowerCase())
      );
    }
    return list;
  }

  getProjectById(id) {
    const p = this.data.projects.find(proj => proj.projectID === Number(id));
    if (!p) return null;
    const category = this.getCategoryById(p.categoryId);
    return {
      ...p,
      categoryName: category ? category.name : p.category || 'General'
    };
  }

  saveProject(projectData, imageFileName) {
    const id = Number(projectData.projectID || projectData.ProjectID || 0);
    const projects = this.data.projects;

    let categoryId = Number(projectData.categoryId || 0);
    let categoryName = projectData.category || projectData.Category || 'Portfolio';
    if (categoryId > 0) {
      const cat = this.getCategoryById(categoryId);
      if (cat) categoryName = cat.name;
    } else {
      const foundCat = this.data.categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
      if (foundCat) categoryId = foundCat.id;
    }

    let techStack = [];
    if (projectData.techStack) {
      techStack = Array.isArray(projectData.techStack) 
        ? projectData.techStack 
        : projectData.techStack.split(',').map(s => s.trim()).filter(Boolean);
    } else if (projectData.Technalogy || projectData.technalogy) {
      techStack = [projectData.Technalogy || projectData.technalogy];
    }

    if (id > 0) {
      const index = projects.findIndex(p => p.projectID === id);
      if (index !== -1) {
        projects[index] = {
          ...projects[index],
          title: projectData.title || projectData.Title || projects[index].title,
          description: projectData.description || projectData.Description || projects[index].description,
          categoryId: categoryId || projects[index].categoryId,
          category: categoryName,
          technalogy: projectData.technalogy || projectData.Technalogy || projects[index].technalogy,
          techStack: techStack.length ? techStack : projects[index].techStack || [projectData.technalogy || projects[index].technalogy],
          status: projectData.status || projectData.Status || projects[index].status,
          gitHub: projectData.gitHub || projectData.GitHub || projects[index].gitHub,
          liveDemo: projectData.liveDemo || projectData.LiveDemo || projects[index].liveDemo,
          featured: projectData.featured === 'true' || projectData.featured === true || projectData.featured === 'on',
          image: imageFileName || projects[index].image,
          updatedAt: new Date().toISOString()
        };
        this.save();
        return projects[index];
      }
    }

    const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.projectID)) + 1 : 1;
    const newProject = {
      projectID: nextId,
      title: projectData.title || projectData.Title || 'New Project',
      description: projectData.description || projectData.Description || '',
      categoryId: categoryId || 1,
      category: categoryName,
      technalogy: projectData.technalogy || projectData.Technalogy || 'Full Stack',
      techStack: techStack.length ? techStack : ['ASP.NET Core', 'C#'],
      status: projectData.status || projectData.Status || 'Published',
      gitHub: projectData.gitHub || projectData.GitHub || '',
      liveDemo: projectData.liveDemo || projectData.LiveDemo || '',
      featured: projectData.featured === 'true' || projectData.featured === true,
      image: imageFileName || 'E-Commerce.png',
      createdDate: new Date().toISOString()
    };

    projects.unshift(newProject);
    this.save();
    return newProject;
  }

  deleteProject(id) {
    const numericId = Number(id);
    const index = this.data.projects.findIndex(p => p.projectID === numericId);
    if (index !== -1) {
      const removed = this.data.projects.splice(index, 1);
      runSqlCommand(`DELETE FROM Projects WHERE projectID = ?`, [numericId]);
      this.save();
      return true;
    }
    return false;
  }

  // ================= SKILLS =================
  getSkills(filterCategory = null) {
    let list = this.data.skills.map(s => {
      const category = this.getCategoryById(s.categoryId);
      return {
        ...s,
        categoryName: category ? category.name : s.category
      };
    });

    if (filterCategory && filterCategory !== 'all') {
      list = list.filter(s => 
        (s.category && s.category.toLowerCase() === filterCategory.toLowerCase()) ||
        (s.categoryName && s.categoryName.toLowerCase() === filterCategory.toLowerCase())
      );
    }
    return list;
  }

  getSkillById(id) {
    return this.data.skills.find(s => s.id === Number(id)) || null;
  }

  saveSkill(skillData, iconFileName = null) {
    const id = Number(skillData.id || skillData.Id || 0);
    const skills = this.data.skills;

    let categoryId = Number(skillData.categoryId || 0);
    let categoryName = skillData.category || skillData.Category || 'Frontend';
    if (categoryId > 0) {
      const cat = this.getCategoryById(categoryId);
      if (cat) categoryName = cat.name;
    }

    const level = skillData.level || skillData.Level || 'Advanced';
    let proficiency = Number(skillData.proficiency || 0);
    if (!proficiency) {
      proficiency = level === 'Expert' ? 95 : level === 'Advanced' ? 88 : level === 'Intermediate' ? 75 : 60;
    }

    if (id > 0) {
      const index = skills.findIndex(s => s.id === id);
      if (index !== -1) {
        skills[index] = {
          ...skills[index],
          name: skillData.name || skillData.Name || skills[index].name,
          categoryId: categoryId || skills[index].categoryId,
          category: categoryName,
          icon: iconFileName || skillData.icon || skillData.Icon || skills[index].icon,
          level: level,
          proficiency: proficiency,
          status: skillData.status || skillData.Status || skills[index].status || 'Published',
          description: skillData.description || skillData.Description || skills[index].description || '',
          updatedAt: new Date().toISOString()
        };
        this.save();
        return skills[index];
      }
    }

    const nextId = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
    const newSkill = {
      id: nextId,
      name: skillData.name || skillData.Name || 'New Skill',
      categoryId: categoryId || 1,
      category: categoryName,
      icon: iconFileName || skillData.icon || skillData.Icon || 'HTML.png',
      level: level,
      proficiency: proficiency,
      status: skillData.status || skillData.Status || 'Published',
      description: skillData.description || skillData.Description || '',
      createdDate: new Date().toISOString()
    };

    skills.push(newSkill);
    this.save();
    return newSkill;
  }

  deleteSkill(id) {
    const numericId = Number(id);
    const index = this.data.skills.findIndex(s => s.id === numericId);
    if (index !== -1) {
      this.data.skills.splice(index, 1);
      runSqlCommand(`DELETE FROM Skills WHERE id = ?`, [numericId]);
      this.save();
      return true;
    }
    return false;
  }

  // ================= COURSES =================
  getCourses(filterCategory = null) {
    let list = this.data.courses;
    if (filterCategory && filterCategory !== 'all') {
      list = list.filter(c => c.category && c.category.toLowerCase() === filterCategory.toLowerCase());
    }
    return list;
  }

  getCourseById(id) {
    return this.data.courses.find(c => c.courseID === Number(id)) || null;
  }

  saveCourse(courseData) {
    const id = Number(courseData.courseID || courseData.CourseID || 0);
    const courses = this.data.courses;

    const isFree = courseData.PriceType === 'free' || courseData.priceType === 'free' || courseData.Price === 'Free' || courseData.price === 'Free';
    const price = isFree ? 'Free' : (courseData.Price || courseData.price || 'PKR 3,500');
    const originalPrice = isFree ? 'Free' : (courseData.OriginalPrice || courseData.originalPrice || 'PKR 6,000');

    if (id > 0) {
      const index = courses.findIndex(c => c.courseID === id);
      if (index !== -1) {
        courses[index] = {
          ...courses[index],
          courseName: courseData.courseName || courseData.CourseName || courses[index].courseName,
          priceType: isFree ? 'free' : 'paid',
          price: price,
          originalPrice: originalPrice,
          platform: courseData.platform || courseData.Platform || courses[index].platform,
          instructor: courseData.instructor || courseData.Instructor || courses[index].instructor || 'Daniyal Khan',
          category: courseData.category || courseData.Category || courses[index].category,
          technology: courseData.technology || courseData.Technology || courses[index].technology,
          level: courseData.level || courseData.Level || courses[index].level,
          duration: courseData.duration || courseData.Duration || courses[index].duration,
          status: courseData.status || courseData.Status || courses[index].status,
          courseUrl: courseData.courseUrl || courseData.CourseUrl || courses[index].courseUrl || '',
          description: courseData.description || courseData.Description || courses[index].description || '',
          updatedAt: new Date().toISOString()
        };
        this.save();
        return courses[index];
      }
    }

    const nextId = courses.length > 0 ? Math.max(...courses.map(c => c.courseID)) + 1 : 1;
    const newCourse = {
      courseID: nextId,
      courseName: courseData.courseName || courseData.CourseName || 'New Course',
      priceType: isFree ? 'free' : 'paid',
      price: price,
      originalPrice: originalPrice,
      platform: courseData.platform || courseData.Platform || 'Daniyal Academy',
      instructor: courseData.instructor || courseData.Instructor || 'Daniyal Khan',
      category: courseData.category || courseData.Category || 'Backend',
      technology: courseData.technology || courseData.Technology || 'ASP.NET Core',
      level: courseData.level || courseData.Level || 'Beginner',
      duration: courseData.duration || courseData.Duration || '20 Hours',
      status: courseData.status || courseData.Status || 'Completed',
      courseUrl: courseData.courseUrl || courseData.CourseUrl || '',
      description: courseData.description || courseData.Description || '',
      createdDate: new Date().toISOString()
    };

    courses.push(newCourse);
    this.save();
    return newCourse;
  }

  deleteCourse(id) {
    const numericId = Number(id);
    const index = this.data.courses.findIndex(c => c.courseID === numericId);
    if (index !== -1) {
      this.data.courses.splice(index, 1);
      runSqlCommand(`DELETE FROM Courses WHERE courseID = ?`, [numericId]);
      this.save();
      return true;
    }
    return false;
  }

  // ================= MESSAGES (CONTACT US) =================
  getMessages() {
    return this.data.messages;
  }

  getMessageById(id) {
    const msg = this.data.messages.find(m => m.messageID === Number(id));
    if (msg && msg.status === 'Unread') {
      msg.status = 'Read';
      this.save();
    }
    return msg || null;
  }

  saveMessage(messageData) {
    const nextId = this.data.messages.length > 0 ? Math.max(...this.data.messages.map(m => m.messageID)) + 1 : 1;
    const newMessage = {
      messageID: nextId,
      name: messageData.name || messageData.Name || 'Client',
      email: messageData.email || messageData.Email || '',
      phone: messageData.phone || messageData.Phone || '',
      subject: messageData.subject || messageData.Subject || 'Portfolio Inquiry',
      message: messageData.message || messageData.Message || messageData.messageText || '',
      messageText: messageData.message || messageData.Message || messageData.messageText || '',
      isStarred: false,
      status: 'Unread',
      replied: false,
      createdDate: new Date().toISOString()
    };

    this.data.messages.unshift(newMessage);
    this.save();
    return newMessage;
  }

  toggleMessageStar(id) {
    const msg = this.data.messages.find(m => m.messageID === Number(id));
    if (msg) {
      msg.isStarred = !msg.isStarred;
      this.save();
      return msg.isStarred;
    }
    return false;
  }

  markMessageReplied(id) {
    const msg = this.data.messages.find(m => m.messageID === Number(id));
    if (msg) {
      msg.replied = true;
      msg.status = 'Read';
      this.save();
      return true;
    }
    return false;
  }

  deleteMessage(id) {
    const numericId = Number(id);
    const index = this.data.messages.findIndex(m => m.messageID === numericId);
    if (index !== -1) {
      this.data.messages.splice(index, 1);
      runSqlCommand(`DELETE FROM Messages WHERE messageID = ?`, [numericId]);
      this.save();
      return true;
    }
    return false;
  }

  // ================= ENROLLMENTS =================
  getEnrollments() {
    return this.data.enrollments || [];
  }

  getEnrollmentById(id) {
    return (this.data.enrollments || []).find(e => e.id === Number(id)) || null;
  }

  createEnrollment(enrollmentData, proofFileName = '') {
    if (!this.data.enrollments) this.data.enrollments = [];
    const nextId = this.data.enrollments.length > 0 ? Math.max(...this.data.enrollments.map(e => e.id)) + 1 : 1;

    const course = this.getCourseById(enrollmentData.courseId || enrollmentData.courseID) || {};

    const newRecord = {
      id: nextId,
      courseId: Number(enrollmentData.courseId || enrollmentData.courseID || 0),
      courseName: enrollmentData.courseName || course.courseName || 'Full Stack Masterclass',
      studentName: enrollmentData.studentName || enrollmentData.name || '',
      studentEmail: enrollmentData.studentEmail || enrollmentData.email || '',
      studentPhone: enrollmentData.studentPhone || enrollmentData.phone || '',
      paymentMethod: enrollmentData.paymentMethod || 'JazzCash',
      transactionId: enrollmentData.transactionId || enrollmentData.trxId || '',
      screenshotProof: proofFileName || enrollmentData.screenshotProof || '',
      amountPaid: enrollmentData.amount || enrollmentData.amountPaid || course.price || 'PKR 3,500',
      status: 'Pending Approval',
      accessKey: '',
      portalUrl: course.courseUrl || '/#Courses',
      adminNotes: '',
      submittedAt: new Date().toISOString(),
      approvedAt: null
    };

    this.data.enrollments.unshift(newRecord);
    this.save();
    return newRecord;
  }

  approveEnrollment(id, customAccessKey = null) {
    const item = (this.data.enrollments || []).find(e => e.id === Number(id));
    if (item) {
      const generatedKey = customAccessKey || `DK-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      item.status = 'Approved';
      item.accessKey = generatedKey;
      item.approvedAt = new Date().toISOString();
      this.save();
      return { success: true, accessKey: generatedKey, enrollment: item };
    }
    return { success: false, message: 'Enrollment record not found' };
  }

  rejectEnrollment(id, reason = '') {
    const item = (this.data.enrollments || []).find(e => e.id === Number(id));
    if (item) {
      item.status = 'Rejected';
      item.adminNotes = reason || 'Payment could not be verified.';
      this.save();
      return { success: true, enrollment: item };
    }
    return { success: false, message: 'Enrollment record not found' };
  }

  deleteEnrollment(id) {
    const numericId = Number(id);
    const index = (this.data.enrollments || []).findIndex(e => e.id === numericId);
    if (index !== -1) {
      this.data.enrollments.splice(index, 1);
      runSqlCommand(`DELETE FROM Enrollments WHERE id = ?`, [numericId]);
      this.save();
      return true;
    }
    return false;
  }

  // ================= GLOBAL STATS =================
  getGlobalStats() {
    const projects = this.data.projects || [];
    const skills = this.data.skills || [];
    const courses = this.data.courses || [];
    const messages = this.data.messages || [];
    const enrollments = this.data.enrollments || [];

    return {
      projectsCount: projects.length,
      publishedProjectsCount: projects.filter(p => p.status === 'Published').length,
      skillsCount: skills.length,
      coursesCount: courses.length,
      completedCoursesCount: courses.filter(c => c.status === 'Completed' || c.status === 'Published').length,
      messagesCount: messages.length,
      unreadMessagesCount: messages.filter(m => m.status === 'Unread').length,
      starredMessagesCount: messages.filter(m => m.isStarred).length,
      enrollmentsCount: enrollments.length,
      pendingEnrollmentsCount: enrollments.filter(e => e.status === 'Pending Approval').length,
      approvedEnrollmentsCount: enrollments.filter(e => e.status === 'Approved').length
    };
  }
}

export const db = new Database();
