import React, { useState } from 'react'

const OrderCreate = ({ isOpen, onClose, children }) => {

    const [name, setName] = useState("");
    const [order_id, setOrder_id] = useState("");
    const [total, setTotal] = useState("");

    const process = async() => {
        const data = {
            name: name,
            order_id: order_id,
            total: total
        }

        console.log(data);
    }
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={onClose}></div>

    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div className="modal-content py-4 text-left px-6">
        {/* Tombol untuk menutup modal */}
        <div className="flex justify-center items-center">
          <button className="modal-close-button" onClick={onClose}>
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M1 1l16 16M17 1L1 17"/>
            </svg>
          </button>
        </div>

        {/* Konten modal */}
        {children}
      </div>
    </div>
  </div>
  )
}

export default OrderCreate