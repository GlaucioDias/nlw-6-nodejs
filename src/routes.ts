import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListUserController } from './controllers/ListUserController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';

const router = Router();

const authenticateUserController = new AuthenticateUserController();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();

const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();

const createComplimentController = new CreateComplimentController();

const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();

// router.post('/users', createUserController.handle);
router.route('/users')
    .post(createUserController.handle)
    .get(ensureAuthenticated, listUserController.handle);

router.route('/tags')
    .post(ensureAuthenticated, ensureAdmin, createTagController.handle)
    .get(ensureAuthenticated, listTagsController.handle);

router.route('/users/compliments/send')
    .get(ensureAuthenticated, listUserSendComplimentsController.handle);

router.route('/users/compliments/receive')
    .get(ensureAuthenticated, listUserReceiveComplimentsController.handle);


router.post('/login', authenticateUserController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)

export { router };