const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');

const OK = 200;

const getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((card) => {
      if (card !== null) {
        res.send(card);
      }
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      } next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      return Card.remove(card);
    })
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id'));
        return;
      }
      next(err);
    });
};

const setLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      } return res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      } next(err);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (card === null) {
        throw new NotFoundError('Карточка не найдена');
      } return res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      } next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};
