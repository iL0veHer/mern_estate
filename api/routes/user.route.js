import express from 'express';
import { test, updateUserInfo } from '../controllers/user.controller.js';
import { verifiedToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:id', verifiedToken, updateUserInfo);

export default router;