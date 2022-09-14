const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { authValidate, registerValidate } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => { // crash test route for check pm2
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', registerValidate, createUser);
router.post('/signin', authValidate, login);
router.get('/signout', logout);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(() => {
  throw new NotFoundError('Указан неправильный путь');
});

module.exports = router;
