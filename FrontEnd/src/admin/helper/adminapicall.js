import { API } from "../../backend";

// categories

// get Categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API}categories`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// get Single category by id

export const getCategory = async (categoryId, userId , Token) => {
  try {
    const response = await fetch(`${API}category/${categoryId}/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// create category
export const createCategory = async (userId, Token, category) => {
  try {
    const response = await fetch(`${API}category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// delete the category
export const deleteCategory = async(categoryId , userId , Token) => {
  try {
    const response = await fetch(`${API}category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

// update Category
export const updateCategory = async (categoryId, userId, Token, category) => {
  try {
    const response = await fetch(`${API}category/${categoryId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json", // Add this header
      },
      body: JSON.stringify(category), // Stringify the category object
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};


// product calls

// create product
export const createProduct = async (userId, Token, product) => {
  try {
    const response = await fetch(`${API}product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// get products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API}products`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
// delete a product
export const deleteProduct = async (productId, userId ,Token) => {
  try {
    const response = await fetch(`${API}product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// get a product
export const getProduct = async (productId) => {
  try {
    const response = await fetch(`${API}product/${productId}`, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// update a product
export const updateProduct = async (productId, userId, Token, product) => {
  try {
    const response = await fetch(`${API}product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

