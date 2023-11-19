const { Order, ProductCart } = require("../models/order")

exports.getOrderById = async (req, res, id, next) => {
    const orderToFind = await Order.findById(id).populate("products.product", "name price").exec();
    if (!orderToFind) {
        return res.status(400).json({
            msg: "No order was found by Id"
        })
    }
    res.order = orderToFind;
    next();
}

exports.createOrder = async (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    const orderToSave = await order.save();
    if (!orderToSave) {
        return res.status(400).json({
            msg: "Failed to save your order in DB"
        })
    }
}

exports.getAllOrders = async (req, res) => {
    const allOrder = await Order.find().populate("user", "_id name").exec();
    if (!allOrder) {
        return res.satus(400).json({
            msg: "No orders found in db"
        })
    }
    res.json(allOrder);
}


exports.getOrderStatus = (req, res) => {

    res.json(Order.schema.path("status").enumValues);

}

exports.updateStatus = async (req, res) => {
    const order = await Order.updateMany(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } }
    )

    if (!order) {
        return res.status(400).json({
            msg: "Cannot update order status"
        })
    }
    res.json(order);
}