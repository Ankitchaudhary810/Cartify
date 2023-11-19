const User = require("../models/user");
const Order = require("../models/order");

// Route Middleware
exports.getUserById = async (req, res, next, _id) => {
    try {
      const user = await User.findById(_id).exec();
      if (!user) {
        return res.status(400).json({
          msg: "No user was found by ID",
        });
      }
      req.profile = user;
      console.log("req.profile in getUserById" , req.profile);
      next();
    } catch (err) {
      return res.status(400).json({
        msg: "Error retrieving user",
        error: err,
      });
    }
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = "";
    req.profile.updatedAt = undefined;
    console.log("req.profile in getUser", req.profile);
    return res.json(req.profile)
}

exports.getAllUsers = async (req,res) =>{
        try {
            const allUser = await User.find({});
            res.status(200).json(allUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
}

exports.updateUser  = async(req,res) => {

    const updatedUser = await User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
    )
    try {
        if(updatedUser){
            updatedUser.salt = undefined;
            updatedUser.encry_password = undefined;
            res.status(200).json(updatedUser)
        }
    } catch (error) {
        return res.status(403).json({
            msg:"you are not authorized to update this user"
        })
    }

}

exports.userPurchaseList = async( req, res) => {
    const PurcheseList = await Order.find({user: req.profile._id})
    .populate("user", "_id name email")
    .exec();

    try {   
        return res.json({
            PurcheseList
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"NO order is this user Account"
        })
    }
}

exports.pushOrderInPurchaseList = async (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });
    // Storing in The db
    const purchasesList = await User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true}
    )
    try {
        if(purchasesList){
            res.status(400).json({
                msg:"purchase list is made"
            })
        }
    } catch (error) {
        res.status(400).json({
            msg:"unable so save purchase list"
        })
    }
    next();
}