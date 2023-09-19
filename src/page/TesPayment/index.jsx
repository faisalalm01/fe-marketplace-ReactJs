import React, { useState } from "react";
import axios from "axios";
const TestPayment = () => {
  const [name, setName] = useState("")
  const [order_id, setOrder_id] = useState("")
  const [total,setTotal] = useState(0)
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
    const response = await axios.post(import.meta.env.VITE_BASE_URL + '/user/transaction', data, configg)
    console.log(response);
    }


return (
   <div className="relative flex w-full flex-wrap items-stretch mb-3">
  <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
  <input type="text" placeholder="name" value={order_id} onChange={(e) => setOrder_id(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"/>
    <input type="text" placeholder="name" value={total} onChange={(e) => setTotal(e.target.value)} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10" />
    <button className="bg-slate-200  rounded-full p-4 mt-5" onClick={process}>test</button>
  </div>

  )
}

export default TestPayment
