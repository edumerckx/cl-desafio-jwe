import express from 'express';
import { controller } from '../controllers';
import { validateLogin } from '../validation';

const router = express.Router();

router.post('/login', validateLogin, controller.login);
router.post('/decrypt', controller.jwe);
router.get('/history', controller.history);

export default router;
