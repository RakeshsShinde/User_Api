import express from 'express';
const router = express.Router();
import passport from '../config/PassportConfig.js';
import { createNewPost, getPost, editPost, deletePost, getPostsByLocation } from '../controllers/post.controller.js'
import { dashboard } from '../controllers/user.controller.js';

router.post('/newpost', passport.authenticate('jwt', { session: false }), createNewPost);
router.get('/:postId', passport.authenticate('jwt', { session: false }), getPost);
router.put('/edit/:postId', passport.authenticate('jwt', { session: false }), editPost);
router.delete('/delete/:postId', passport.authenticate('jwt', { session: false }), deletePost);
router.get('/', passport.authenticate('jwt', { session: false }), getPostsByLocation);


export default router;
