const slugify = require('slugify')
const { check, body } = require('express-validator')
const validatorMiddleware = require('../../middlewares/validator.middleware')

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validatorMiddleware,
]

exports.createBrandValidator = [
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 3 })
    .withMessage('Brand name is too short')
    .isLength({ max: 32 })
    .withMessage('Brand name is too long')
    .custom((val, { req }) => {
        if(req?.body?.slug)
            req.body.slug = slugify(val)
        return true
    }),
    validatorMiddleware,
]

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id'),
    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val)
            return true
        }),
    validatorMiddleware,
]

exports.deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Brand id'),
  validatorMiddleware,
]