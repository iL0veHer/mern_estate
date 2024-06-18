import express from 'express'
import { test,upadateUserInfo} from '../controllers/user.controller.js'
import { verifiedToken } from '../utils/verifyUser.js'

const router =express.Router()

router.get('/test',test)
router.post('/update/:id',verifiedToken,upadateUserInfo)

export default router