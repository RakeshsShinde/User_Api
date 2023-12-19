import express from 'express';
const router = express.Router();
import { register, login, dashboard } from '../controllers/user.controller.js'
import passport from 'passport'
router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', passport.authenticate('jwt', { session: false }), dashboard);

export default router;
