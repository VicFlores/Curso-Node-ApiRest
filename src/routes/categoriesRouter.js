const express = require("express")

const router = express.Router()


router.get('/:categoryID/products/:productID', (req, res) => {
    const { categoryID, productID } = req.params
    
    res.json({
        categoryID,
        productID,
    })
})

module.exports = router