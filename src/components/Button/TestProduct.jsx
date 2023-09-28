import React from 'react'

const TestProduct = ({product}) => {
  return (
    <div>
    <h2>{product.name}</h2>
    <p>Harga: ${product.price}</p>
    <p>Deskripsi: {product.description}</p>
    {/* Tampilkan informasi produk lainnya sesuai kebutuhan */}
  </div>
  )
}

export default TestProduct