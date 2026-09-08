import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { requireAdminAuth } from '../middlewares/authMiddleware.js';
import { uploadImage } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Authentication
router.get('/Admin/Login', adminController.getLogin);
router.post('/Admin/Login', adminController.postLogin);
router.get('/Admin/Logout', adminController.getLogout);

// Protected Admin Views
router.get('/Admin', requireAdminAuth, (req, res) => res.redirect('/Admin/Dashboard'));
router.get('/Admin/Dashboard', requireAdminAuth, adminController.getDashboard);
router.get('/Admin/Projects', requireAdminAuth, adminController.getProjectsPage);
router.get('/Admin/Skill', requireAdminAuth, adminController.getSkillsPage);
router.get('/Admin/Skills', requireAdminAuth, adminController.getSkillsPage);
router.get('/Admin/Course', requireAdminAuth, adminController.getCoursesPage);
router.get('/Admin/Courses', requireAdminAuth, adminController.getCoursesPage);
router.get('/Admin/Message', requireAdminAuth, adminController.getMessagesPage);
router.get('/Admin/Messages', requireAdminAuth, adminController.getMessagesPage);
router.get('/Admin/Enrollments', requireAdminAuth, adminController.getEnrollmentsPage);
router.get('/Admin/Enrollment', requireAdminAuth, adminController.getEnrollmentsPage);
router.get('/Admin/Settings', requireAdminAuth, adminController.getSettingsPage);

// Projects Operations
router.get('/Admin/GetProject', requireAdminAuth, adminController.getProjectById);
router.post('/Admin/CreateProjects', requireAdminAuth, uploadImage.single('ImageFile'), adminController.postCreateProject);
router.post('/Admin/DeleteProject', requireAdminAuth, adminController.postDeleteProject);
router.get('/Admin/ExportProjects', requireAdminAuth, adminController.getExportProjects);

// Skills Operations
router.get('/Admin/GetSkill', requireAdminAuth, adminController.getSkillById);
router.post('/Admin/SaveSkill', requireAdminAuth, uploadImage.single('SkillImage'), adminController.postSaveSkill);
router.post('/Admin/DeleteSkill', requireAdminAuth, adminController.postDeleteSkill);

// Courses Operations
router.get('/Admin/GetCourse', requireAdminAuth, adminController.getCourseById);
router.post('/Admin/SaveCourse', requireAdminAuth, adminController.postSaveCourse);
router.post('/Admin/DeleteCourse', requireAdminAuth, adminController.postDeleteCourse);

// Messages Operations
router.get('/Admin/GetMessage', requireAdminAuth, adminController.getMessageById);
router.post('/Admin/ToggleMessageStar', requireAdminAuth, adminController.postToggleMessageStar);
router.post('/Admin/ReplyMessage', requireAdminAuth, adminController.postReplyMessage);
router.post('/Admin/DeleteMessage', requireAdminAuth, adminController.postDeleteMessage);

// Enrollment Approval Operations
router.post('/Admin/ApproveEnrollment', requireAdminAuth, adminController.postApproveEnrollment);
router.post('/Admin/RejectEnrollment', requireAdminAuth, adminController.postRejectEnrollment);
router.post('/Admin/DeleteEnrollment', requireAdminAuth, adminController.postDeleteEnrollment);

// Profile & Settings Operations
router.post('/Admin/UpdateProfile', requireAdminAuth, uploadImage.single('AvatarImage'), adminController.postUpdateProfile);
router.post('/Admin/ChangePassword', requireAdminAuth, adminController.postChangePassword);
router.post('/Admin/UpdateSiteSettings', requireAdminAuth, adminController.postUpdateSiteSettings);
router.post('/Admin/UpdatePaymentAccounts', requireAdminAuth, adminController.postUpdatePaymentAccounts);

export default router;
