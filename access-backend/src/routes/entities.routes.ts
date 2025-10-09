import { Router } from 'express';
import { entitiesController } from '../controllers/entities.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { permit } from '../middlewares/permissions.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createEntitySchema, updateEntitySchema } from '../validators/entity.validator';

const router = Router();

router.use(authenticate);

router.get('/', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), entitiesController.getAllEntities);
router.get('/:id', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), entitiesController.getEntityById);
router.post('/', permit('SUPERADMIN'), validate(createEntitySchema), entitiesController.createEntity);
router.put('/:id', permit('SUPERADMIN', 'ADMIN'), validate(updateEntitySchema), entitiesController.updateEntity);
router.delete('/:id', permit('SUPERADMIN'), entitiesController.deleteEntity);

export default router;
