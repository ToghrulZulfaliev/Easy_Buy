import React, { useState, useEffect } from 'react'
import Product from '../Product/Product'
import "./ProductsButtons.css"

const ProductsButtons = () => {
    const [query, setQuery] = useState("all")
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const queries = [
        "all",
        "men",
        "women",
        "jewelery",
        "electronics"
    ]

    useEffect(() => {

        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setFilteredProducts(data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (query === "all") {
            setFilteredProducts(products)
        } else if (query === "men") {
            setFilteredProducts(products.filter(product =>
                product.category === "men's clothing"))
        } else if (query === "women") {
            setFilteredProducts(products.filter(product =>
                product.category === "women's clothing"))
        } else {
            setFilteredProducts(products.filter(product =>
                product.category === query))
        }
    }, [query, products])

    return (
        <div className="products-section">
            <div className="container mx-auto px-4">
                <div className="products-title">
                    <h2 className='pt-5'>Latest Products</h2>
                    <hr className="section-divider" />
                </div>

                <div className="filter-buttons">
                    {queries.map((q) => (
                        <button
                            key={q}
                            onClick={() => setQuery(q)}
                            className={`filter-btn ${query === q ? 'active' : ''}`}
                        >
                            {q.charAt(0).toUpperCase() + q.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ProductsButtons