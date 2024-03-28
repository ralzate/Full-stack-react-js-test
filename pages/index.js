import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IndexPage = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [supplier, setSupplier] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error fetching products. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !price || !stock || !brand || !supplier) {
            setError('Please fill in all fields.');
            return;
        }
        if (isNaN(Number(price)) || isNaN(Number(stock))) {
            setError('Price and stock must be numbers.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/v1/products', {
                name,
                description,
                price,
                stock,
                brand,
                supplier
            });
            setProducts([...products, response.data]);
            setName('');
            setDescription('');
            setPrice('');
            setStock('');
            setBrand('');
            setSupplier('');
            setError(null);
        } catch (error) {
            console.error('Error creating product:', error);
            setError('Error creating product. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Supplier"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                />
                <button type="submit">Add Product</button>
            </form>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.description} -
                        ${product.price} - {product.stock} -
                        {product.brand} - {product.supplier}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IndexPage;