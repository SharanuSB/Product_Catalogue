
const Product = require("../models/Product")

const productsController = {}

productsController.list = async (req, res) => {
    try {
        const products = await Product.find()
        if (products) {
            res.json(products)
        } else {
            res.json([])
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.create = async (req, res) => {
    try {
        const body = req.body
        const id = req.user.id
        const productObj = new Product(body)
        productObj.createdBy = id
        const product = await productObj.save()
        if (product) {
            res.json(product)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.update = async (req, res) => {
    try {
        const body = req.body
        const productId = req.params.id
        const userId = req.user.id
        const product = await Product.findByIdAndUpdate(productId, { ...body, lastUpdatedBy: userId }, { new: true, runValidators: true })
        if (product) {
            res.json(product)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.destroy = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        if (product) {
            res.json(product)
        } else {
            res.json({
                error: "Invalid Product Id"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

productsController.destroyAll = async (req, res) => {
    try {
        const products = await Product.deleteMany({})
        if (products) {
            res.json(products)
        } else {
            res.json({})
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = productsController