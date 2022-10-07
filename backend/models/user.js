const mongoose = require('mongoose');
const validator = require('validator');
const { compare } = require('bcrypt');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Должно быть, не меньше 2 символа'],
    maxlength: [30, 'Должно быть, не больше 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Должно быть, не меньше 2 символа'],
    maxlength: [30, 'Должно быть, не больше 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, {
  toObject: {
    useProjection: true,
    versionKey: false,
  },
});

userSchema.method.toJSON = () => {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Ошибка авторизации');
      }
      return compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Ошибка авторизации');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
