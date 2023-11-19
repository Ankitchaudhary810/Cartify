const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = async (req, res, next, _id) => {
  const product = await Product.findById(_id)
  
    .populate("category")
    .exec();
  if (!product) {
    return res.status(400).json({
      msg: "Product not found"
    });
  }
  req.product = product;
  next();
};

exports.getProductId = async (req, res, next , _id) => {
  try {
    const product = await Product.findById(_id)
      .select("_id")
      .exec();
    if (!product) {
      return res.status(400).json({
        msg: "Product not found"
      });
    }
    req.productId = product._id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
}

exports.createProduct = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  try {
    form.parse(req, async (err, fields, file) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(400).json({
          error: "Problem with image",
        });
      }

      // Destructure the fields
      const { name, description, price, category, stock } = fields;
      console.log(name, description, price, category, stock);

      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
          error: "Please include all fields",
        });
      }

      let product = new Product(fields);

      // Handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        product.photo.data = fs.readFileSync(file.photo.filepath);
        product.photo.contentType = file.photo.type;
      }

      try {
        const productToSave = await product.save();
        // console.log("Product saved:", productToSave);
        if (!productToSave) {
          return res.status(400).json({
            error: "Saving product in DB failed",
          });
        } else {
          res.status(200).json({
            msg: "Product is saved",
            // productToSave
          });
        }
      } catch (error) {
        console.error("Error saving product in DB:", error);
        res.status(400).json({
          error: "Error saving product in DB",
        });
      }
    });
  } catch (error) {
    console.error("Error parsing form data:", error);
    return res.status(400).json({
      error: "Problem with image",
    });
  }
};



exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product)
}

exports.getProductWithPhoto = (req, res) => {
  return res.json(req.product)
}

//middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};


exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //updation code
    let product = req.product;
    product = _.extend(product, fields);
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.type;
    }
    //save to the DB
    try {
      const productTosave = product.save();

      if (!productTosave) {
        return res.status(400).json({
          error: "updation tshirt in DB failed"
        });
      }
      else {
        return res.json({
          msg: "Product is updated",
          // product
        });
      }
    } catch (error) {
      return res.status(400).json({
        msg: "some error",
        err: JSON.stringify(error)
      })
    }
  });
}

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.productId;

    // Find the product by its ID and remove it
    const deletedProduct = await Product.findByIdAndRemove(productId).exec();

    if (!deletedProduct) {
      return res.status(400).json({
        msg: "Failed to delete the product"
      });
    }
    res.status(200).json({
      msg: "Product is deleted",
      // product: deletedProduct
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
  // let product = req.product;
  // try{
  //   const productToRemove =await product.deleteOne();
  //   if(!productToRemove){
  //     return res.status(400).json({
  //       msg:"Faild to delete the product"
  //     })
  //   }
  //   res.status(200).json({
  //     msg:"Product is deleted",
  //     // productToRemove
  //   })
  // }catch(e){
  //   console.log(e);
  // }
  // console.log('done');
};



exports.getAllProducts = async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 3
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id"
  const productToFind = await Product.find({}).sort([[sortBy, "asc"]]).populate('category').exec();
  if (!productToFind) {
    return res.status(400).json({
      msg: "NO PRODUCT FOUND"
    })
  } else {
    // console.log(productToFind);
    res.json(productToFind);
  }
}

exports.getAllUniqueCategories = (req, res) => {
  const uniqueCategory = Product.distinct('category', {});
  if (!uniqueCategory) {
    return res.json({
      msg: "no category found"
    })
  }
  res.json(uniqueCategory);
}

exports.updateStock = async (req, res, next) => {

  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } }
      }
    }
  })
  const productToOperate = await Product.bulkWrite(myOperations, {});
  if (!productToOperate) {
    return res.status.json({
      msg: "bulk Operation failed"
    })
  }
  next();
}
