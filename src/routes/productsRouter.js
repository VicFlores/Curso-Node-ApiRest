const express = require('express');
const productService = require('../services/productService');
const handlerJoi = require('../middlewares/handlerJoi');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const router = express.Router();
const service = new productService()

router.get('/', async (req, res) => {
    const products = await service.find()
    res.json(products)
})

router.get('/:id', 
    handlerJoi(getProductSchema, 'params'), 
    async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await service.findOne(id)

        res.status(200).json(product)
    } catch (error) {
        next(error)
    } 
})

router.post('/new-product', 
    handlerJoi(createProductSchema, 'body'), 
    async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body)

    res.status(201).json(newProduct)
})

router.patch('/update-product/:id', 
    handlerJoi(getProductSchema, 'params'),
    handlerJoi(updateProductSchema, 'body'), 
    async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body;
        const product = await service.update(id, body)
    
        res.json(product)
    } catch (error) {
        next(error)
    }
    
})


router.delete('/rm-product/:id', async (req, res) => {
    const { id } = req.params
    const product = await service.delete(id)

    res.json(product)
})

module.exports = router