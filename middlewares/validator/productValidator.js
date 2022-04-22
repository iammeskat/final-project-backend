const { check, validationResult } = require('express-validator');
const { Category } = require('../../models/category');
const { Brand } = require('../../models/brand');

let validators = {}
validators.addProductValidators = [
    check('name')
        .isLength({ min: 3 })
        .withMessage('Name is required')
        .trim(),
    check('price')
        .isInt()
        .withMessage('Invalid price'),
    check('description')
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('category.*')
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
    check('brand')
        .custom(async (value) => {
            try {
                const brand = await Brand.findById(value);
                if (!brand) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
    check('quantity')
        .isInt()
        .withMessage('Invalid quantity value'),
    check('photos')
        .isLength({ min: 1 })
        .withMessage('Photo is required'),
    check('unitPrice')
        .isInt()
        .withMessage('Invalid unit price value'),
    check('size')
        .isLength({ min: 1 })
        .withMessage('Size is required'),
    check('color')
        .isLength({ min: 1 })
        .withMessage('Color is required'),
    check('weight')
        .isLength({ min: 1 })
        .withMessage('Weight is required'),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive', 'discontinued'])
        .withMessage('Invalid status value'),
];

validators.updateProductValidators = [
    check('name')
        .if(check('name').exists())
        .isLength({ min: 3 })
        .withMessage('Name is required')
        .trim(),
    check('price')
        .if(check('price').exists())
        .isInt()
        .withMessage('Invalid price'),
    check('description')
        .if(check('description').exists())
        .isLength({ min: 1 })
        .withMessage('Description is required'),
    check('category.*')
        .if(check('category').exists())
        .custom(async (value) => {
            try {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Invalid category ID!');
                }
            } catch (err) {
                throw new Error('Invalid category ID!');
            }
        }),
    check('brand')
        .if(check('brand').exists())
        .custom(async (value) => {
            try {
                const brand = await Brand.findById(value);
                if (!brand) {
                    throw new Error('Invalid brand ID!');
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
    check('quantity')
        .if(check('quantity').exists())
        .isInt()
        .withMessage('Invalid quantity value'),
    check('unitPrice')
        .if(check('unitPrice').exists())
        .isInt()
        .withMessage('Invalid unit price value'),
    check('size')
        .if(check('size').exists())
        .isLength({ min: 1 })
        .withMessage('Size is required'),
    check('color')
        .if(check('color').exists())
        .isLength({ min: 1 })
        .withMessage('Color is required'),
    check('weight')
        .if(check('weight').exists())
        .isLength({ min: 1 })
        .withMessage('Weight is required'),
    check('status')
        .if(check('status').exists())
        .isIn(['active', 'inactive', 'discontinued'])
        .withMessage('Invalid status value'),
];


validators.productValidationHandler = (req, res, next)=>{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappedErrors,
        })
    }
}

module.exports = validators;
