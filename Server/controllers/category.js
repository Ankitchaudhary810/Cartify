const Category = require('../models/category');

exports.getCategoryById = async (req, res, next, id) => {
  const categoryById = await Category.findById(id).exec();
  //     cate
  if(!categoryById){
    return res.status(400).json({
      msg:"Category not found"
    })
  }
  req.category = categoryById;
  next();
}

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const userCategory = await category.save();
    if (userCategory) {
      return res.json({ category })
    }
  } catch (error) {
    return res.status(400).json({
      msg: "Some Error",
      err: error
    })
  }
}

exports.getCategory = (req, res) => {
  console.log("inside getcategory");
  return res.json(
    req.category
  )
}

exports.getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({}).exec();
    if (!allCategory ) {
      return res.json({
        msg: "No categories found"
      });
    } 
    res.json(allCategory)
  } catch (error) {
    return res.json({
      msg: "Error",
      err: error
    });
  }
};

exports.updateCategory = async (req, res) => {
  console.log("update Controller");

  try {
    
    const id = req.category._id;
    const {name} = req.body;
    // const name = "alsdjfl"
    console.log("name: " , name);
    console.log("req.body: " , req.body);
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    console.log("Updated category:", updatedCategory); // Add this line

    if (!updatedCategory) {
      return res.json({
        msg: "Failed to update category",
      });
    }

    res.json({
      msg: "Category updated successfully",
      data: updatedCategory,
      id: updatedCategory._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
      error: error.message,
    });
  }
};



exports.removeCategory = async (req, res) => {
  const category = req.category;
  const removedCategory = await Category.findByIdAndRemove(category._id);
  try {
    if (!removedCategory) {
      return res.json({
        msg: "Failed to remove Category",
      });
    }

    res.json({
      msg: "Category is removed from DB",
      name: removedCategory.name,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};
