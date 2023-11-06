import express from 'express'
import auth from '../authController/auth'

const router = express()

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/forgot-password', auth.forgotPassword);
router.get('/reset-password/:id/:token', auth.checkToken);
router.post('/reset-password/:id/:token', auth.resetPassword);



export default router
