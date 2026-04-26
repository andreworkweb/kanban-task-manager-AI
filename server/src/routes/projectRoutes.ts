import { Router } from 'express';
import { getProjects, createProject, deleteProject } from '../controllers/projectController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', getProjects);
router.post('/', createProject);
router.delete('/:id', deleteProject);

export default router;
