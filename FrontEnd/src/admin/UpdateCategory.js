import React, { useEffect } from 'react';
import Base from '../core/Base';
import { Link, useParams } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { useState } from 'react';
import { getCategory, updateCategory } from './helper/adminapicall';
const UpdateCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, Token } = isAutheticated();
    const { categoryId } = useParams();

    const preLoad = (categoryId) => {
        getCategory(categoryId, user._id, Token)
            .then((data) => {
                console.log("Category data:", data);
                setName(data.name);
            });
    };

    useEffect(() => {
        preLoad(categoryId);
    }, [categoryId]);

    const handleChange = (event) => {
        setError(false);
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);

        const category = {
            name: name,
        };

        updateCategory(categoryId, user._id, Token, category)
            .then((data) => {
                console.log(data);
                if (data.error) {
                    setError(true);
                } else {
                    setError(false);
                    setSuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
                Admin Home
            </Link>
        </div>
    );

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category Updated Successfully</h4>;
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-danger">Failed to Update Category</h4>;
        }
    };

    const updateCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Update the Category</p>
                <input
                    type="text"
                    className="form-control my-3"
                    autoFocus
                    required
                    placeholder="Ex. Computer"
                    onChange={handleChange}
                    value={name}
                    name='name'
                    id='name'
                />

                <button className="btn btn-outline-info mb-1" onClick={onSubmit}>
                    Update Category
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Update Category"
            description="Update category for new Product"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {updateCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateCategory;
