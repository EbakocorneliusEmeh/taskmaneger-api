import express from 'express';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

import CreateAccount from '../controllers/users/CreateAccount.js';
import Login from '../controllers/users/Login.js';
import Logout from '../controllers/users/Logout.js';
import LogoutAllAccounts from '../controllers/users/LogoutAllAccounts.js';
import Profile from '../controllers/users/Profile.js';
import UpdateAccount from '../controllers/users/UpdateAccount.js';
import DeleteAccount from '../controllers/users/DeleteAccount.js';
import UploadAvatar from '../controllers/users/UploadAvatar.js';
import DeleteAvatar from '../controllers/users/DeleteAvatar.js';
import GetAvatar from '../controllers/users/GetAvatar.js';

import errorMessage from '../../utils/errors/message.js';

const router = express.Router();

// Public routes
router.post('/users', CreateAccount);
router.post('/users/login', Login);

// Protected routes
router.use(auth);

router.post('/users/logout', Logout);
router.post('/users/logoutAll', LogoutAllAccounts);

router
  .route('/users/me')
  .get(Profile)
  .patch(UpdateAccount)
  .delete(DeleteAccount);

router
  .route('/users/me/avatar')
  .post(upload.single('avatar'), UploadAvatar, errorMessage)
  .delete(DeleteAvatar);

router.get('/users/:id/avatar', GetAvatar);

export default router;
