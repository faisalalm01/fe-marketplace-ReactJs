import React, { useEffect, useState } from "react";
import axios from "axios";
import TestProduct from "../../components/Button/TestProduct";
const TestPayment = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Data produk contoh (gantilah dengan data produk yang sesuai)
  const products = [
    { id: 1, name: 'Produk 1', price: 100, description: 'Deskripsi Produk 1' },
    { id: 2, name: 'Produk 2', price: 200, description: 'Deskripsi Produk 2' },
    // Tambahkan produk lainnya sesuai kebutuhan
  ];

  const handleProductClick = (id) => {
    // Cari produk dengan ID yang sesuai
    const product = products.find((p) => p.id === id);

    // Set produk yang dipilih
    setSelectedProduct(product);
  };


  const [name, setName] = useState("")
  const [order_id, setOrder_id] = useState("")
  const [total, setTotal] = useState(0)
  const [tokenTransaction,setTokenTransaction] = useState("")
  const process = async() => {
        const data = {
            name: name,
            order_id: order_id,
            total: total
        }
    const configg = {
    headers: {
      "Content-Type": "application/json",
    },
  };
    const response = await axios.post(import.meta.env.VITE_BASE_URL + 'user/transaction', data, configg)
    setTokenTransaction(response.data.token);
  }
  useEffect(() => {
    if (tokenTransaction) {
      window.snap.pay(tokenTransaction, {
        onSuccess: (result) => {
          localStorage.setItem('transaction', JSON.stringify(result))
          setTokenTransaction("")
        },
        onPending: (result) => {
          localStorage.setItem('transaction', JSON.stringify(result))
          setTokenTransaction("")
        },
        onError: (error) => {
          console.log(error);
          setTokenTransaction("")
        },
        onClose: () => {
          console.log('Anda Belum Menyelesaikan Pembayaran');
          setTokenTransaction("")
        }
      })
      setName("")
      setOrder_id("")
      setTotal(0)
    }
  },[tokenTransaction])

  useEffect(() => {
    // production use : 'https://app.midtrans.com/snap/snap.js'
    const midtransUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    let scriptTag = document.createElement("script")
    scriptTag.src = midtransUrl

    const midtransClientKey = import.meta.env.CLIENT_KEY_MIDTRANS
    scriptTag.setAttribute("data-client-key", midtransClientKey)
    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  })

return (
  <>
   <div className="relative flex w-full flex-wrap items-stretch mb-3">
  <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
  <input type="text" placeholder="order id" value={order_id} onChange={(e) => setOrder_id(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
    <input type="number" placeholder="name" value={total} onChange={(e) => setTotal(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10" />
    <button className="bg-slate-200  rounded-full p-4 mt-5" onClick={process}>test</button>
  </div>

  <div>
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => handleProductClick(product.id)}>
              Lihat Detail Produk {product.id}
            </button>
          </li>
        ))}
      </ul>

      {/* Tampilkan detail produk yang dipilih jika ada */}
      {selectedProduct && <TestProduct product={selectedProduct} />}
    </div>
  </>
  )
}

export default TestPayment
