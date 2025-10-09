import { Router } from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import entitiesRoutes from './entities.routes';
import visitorsRoutes from './visitors.routes';
import accessRoutes from './access.routes';
import healthRoutes from './health.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/entities', entitiesRoutes);
router.use('/visitors', visitorsRoutes);
router.use('/access', accessRoutes);
router.use('/health', healthRoutes);

export default router;
