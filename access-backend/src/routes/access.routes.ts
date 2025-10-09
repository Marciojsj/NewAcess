import { Router } from 'express';
import { accessController } from '../controllers/access.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { permit } from '../middlewares/permissions.middleware';
import { validate } from '../middlewares/validation.middleware';
import { registerEntrySchema, registerExitSchema } from '../validators/visitor.validator';

const router = Router();

router.use(authenticate);

router.post('/entry', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), validate(registerEntrySchema), accessController.registerEntry);
router.post('/exit', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), validate(registerExitSchema), accessController.registerExit);
router.get('/logs', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), accessController.getAccessLogs);
router.get('/report', permit('SUPERADMIN', 'ADMIN'), accessController.getAccessReport);

export default router;
