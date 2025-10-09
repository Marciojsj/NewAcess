import { Router } from 'express';
import { visitorsController } from '../controllers/visitors.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { permit } from '../middlewares/permissions.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createVisitorSchema, updateVisitorSchema } from '../validators/visitor.validator';

const router = Router();

router.use(authenticate);

router.get('/', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), visitorsController.getAllVisitors);
router.get('/:id', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), visitorsController.getVisitorById);
router.post('/', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), validate(createVisitorSchema), visitorsController.createVisitor);
router.put('/:id', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), validate(updateVisitorSchema), visitorsController.updateVisitor);
router.delete('/:id', permit('SUPERADMIN', 'ADMIN'), visitorsController.deleteVisitor);
router.post('/:id/regenerate-qrcode', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), visitorsController.regenerateQRCode);

export default router;
