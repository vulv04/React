import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [sortOrder, setSortOrder] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
    );
    const data = await res.json();
    setTotal(data.total);
    let fetchedProducts = data.products;

    if (searchTerm) {
      fetchedProducts = fetchedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      fetchedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      fetchedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, sortOrder, searchTerm]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="none">Hủy sắp xếp</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>

          <select
            onChange={(e) => setLimit(Number(e.target.value))}
            value={limit}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h3>{product.title}</h3>
            <p>Giá: ${product.price}</p>
            <p style={{ fontSize: "14px", color: "#555" }}>
              {product.description}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          preview
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
