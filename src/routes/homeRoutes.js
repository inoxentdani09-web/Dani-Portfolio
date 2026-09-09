import { Router } from 'express';
import { homeController } from '../controllers/homeController.js';

const router = Router();

router.get('/', homeController.getIndex);
router.get('/Home', homeController.getIndex);
router.get('/Home/Index', homeController.getIndex);

router.post('/Home/SendMessage', homeController.postSendMessage);

// Public JSON APIs
router.get('/Home/Skills', homeController.getSkillsJson);
router.get('/Home/Projects', homeController.getProjectsJson);
router.get('/Home/Course', homeController.getCoursesJson);
router.get('/Home/CourseDetails', homeController.getCourseDetailsJson);
router.post('/Home/EnrollCourse', homeController.postEnrollCourse);
router.get('/Home/CheckEnrollment', homeController.getCheckEnrollment);
router.post('/api/ai/chat', homeController.postAiChat);
router.post('/Home/AiChat', homeController.postAiChat);

export default router;
