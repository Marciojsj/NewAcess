import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { permit } from '../middlewares/permissions.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';

const router = Router();

router.use(authenticate);

router.get('/', permit('SUPERADMIN', 'ADMIN'), usersController.getAllUsers);
router.get('/:id', permit('SUPERADMIN', 'ADMIN', 'OPERATOR'), usersController.getUserById);
router.post('/', permit('SUPERADMIN', 'ADMIN'), validate(createUserSchema), usersController.createUser);
router.put('/:id', permit('SUPERADMIN', 'ADMIN'), validate(updateUserSchema), usersController.updateUser);
router.delete('/:id', permit('SUPERADMIN', 'ADMIN'), usersController.deleteUser);

export default router;
