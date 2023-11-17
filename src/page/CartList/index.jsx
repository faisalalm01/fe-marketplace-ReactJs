/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatRupiah } from "../../utils";
import ButtonPrimary from "../../components/Button/Primary";
import { useNavigate } from "react-router-dom";
import OrderCreate from "../../components/Order";
import ButtonSecondary from "../../components/Button/Secondary";
const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [orderItem, setOrderItem] = useState([]);
  const [tokenTransaction, setTokenTransaction] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    productId: cartItems.productId,
    totalProduct: 1,
  });

  useEffect(() => {
    if (token) {
      // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
      const config = {
        headers: {
          access_token: `Bearer ${token}`,
        },
      };

      axios
        .get(import.meta.env.VITE_BASE_URL + "/user/detail", config) // Ganti dengan URL API yang sesuai
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [token]);

  // const process = async (id) => {
  //   const order = orderItem.find((p) => p.id === id);
  //   setSelectedProduct(order);
  //   const data = {
  //     name: user.username,
  //     order_id: order.id,
  //     total: order.totalPrice,
  //   };
  //   const configg = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await axios.post(
  //     import.meta.env.VITE_BASE_URL + "/user/transaction",
  //     data,
  //     configg
  //   );
  //   setTokenTransaction(response.data.token);
  // };

  useEffect(() => {
    // Setel header dengan token bearer
    const headers = {
      access_token: `Bearer ${token}`,
    };

    // Buat permintaan GET ke endpoint keranjang
    axios
      .get(import.meta.env.VITE_BASE_URL + "/user/cart", { headers })
      .then((response) => {
        setCartItems(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data keranjang:", error);
      });
  }, []);

  useEffect(() => {
    // Setel header dengan token bearer
    const headers = {
      access_token: `Bearer ${token}`,
    };
    axios
      .get(import.meta.env.VITE_BASE_URL + "/user/order", { headers })
      .then((response) => {
        setOrderItem(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data order:", error);
      });
  }, []);

  const handleCheckkout = async (id) => {
    const dataproduct = cartItems.find((item) => item.id === id);
    console.log(dataproduct);
    if (dataproduct) {
      const headers = {
        access_token: `Bearer ${token}`,
      };
      const dataorderrr = {
        userId: user.id,
        productId: dataproduct.products.id,
        totalProduct: orderData.totalProduct,
      };
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "user/order",
        dataorderrr,
        {
          headers,
        }
      );
      let tokentrans = response.data.data.token_transaction;
      window.snap.pay(tokentrans, {
        onSuccess: async (result) => {
          const headers = {
            access_token: `Bearer ${token}`,
          };
          const data = {
            userId: user.id,
            status_bayar: "Sudah Dibayar",
            status_kirim: "Belum Dikirim",
            token_transaction: null,
          };
          await axios.put(
            import.meta.env.VITE_BASE_URL + `/user/order/${result.order_id}`,
            data,
            { headers }
          );
          window.location.href = "/user/carts";
          // alert("success Pembayaran");
          // localStorage.setItem("transaction", JSON.stringify(result));
          // // setTokenTransaction("");
          // localStorage.removeItem("transaction");
        },
        onPending: async (result) => {
          window.location.href = "/user/carts";
          // localStorage.setItem("transaction", JSON.stringify(result));
          // // setTokenTransaction("");
          // window.location.href = window.location.href;
        },
        onError: (error) => {
          window.location.href = "/user/carts";
          // alert("pembayaran error");
          // console.log(error);
          // setTokenTransaction("");
        },
        onClose: () => {
          window.location.href = "/user/carts";
          // alert("pembayaran error");
          // console.log("Anda Belum Menyelesaikan Pembayaran");
          // setTokenTransaction("");
        },
      });
    }
  };
  const handleAddToOrder = async (id) => {
    const dataproduct = cartItems.find((item) => item.id === id);
    console.log(dataproduct);
    if (dataproduct) {
      const headers = {
        access_token: `Bearer ${token}`,
      };
      const dataorderrr = {
        userId: user.id,
        productId: dataproduct.products.id,
        totalProduct: orderData.totalProduct,
      };
      await axios
        .post(import.meta.env.VITE_BASE_URL + "user/order", dataorderrr, {
          headers,
        })
        .then((result) => {
          window.location.href = "/user/carts";
        });
    }
  };
  useEffect(() => {
    // production use : 'https://app.midtrans.com/snap/snap.js'
    // const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransUrl = 'https://app.midtrans.com/snap/snap.js'
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.env.CLIENT_KEY_MIDTRANS;
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mx-auto container mt-20">
      {/* <p>{orderItem.length}</p> */}
      {cartItems?.length === 0 ? (
        <div className=" bg-white justify-center text-center rounded-lg shadow-xl py-6 font-bold text-2xl">
          <div>keranjangmu Kosong</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 mx-auto container my-16">
            {cartItems &&
              cartItems.map((item) => (
                <>
                  <div
                    key={item.id}
                    className="rounded-lg bg-white shadow-xl p-3"
                  >
                    <div>
                      <div className="flex flex-wrap mb-2 space-x-3">
                        <div>
                          <img
                            src={item?.products?.image}
                            alt=""
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold">
                            {item?.products?.title}
                          </p>
                          <p>
                            Harga :{" "}
                            <b className="text-red-600">
                              {item?.products?.price === null ||
                              item?.products?.price === 0
                                ? "Free"
                                : `${formatRupiah(
                                    `${item?.products?.price}`
                                  )},-`}
                            </b>
                          </p>
                          <p>{item?.products?.title}</p>
                        </div>
                      </div>
                      <ButtonPrimary
                        name={"Order Sekarang"}
                        onClick={openModal}
                        classname={"px-3 p-2 rounded-xl"}
                      />
                    </div>
                  </div>
                  <OrderCreate isOpen={isModalOpen} onClose={closeModal}>
                    <h2 className="text-xl font-semibold">Order Product</h2>
                    <img src={item?.products?.image} alt="product" />
                    <div>
                      <div className="flex flex-wrap">
                        <p className="w-9/12 text-2xl font-bold py-2">
                          {item?.products?.title}
                        </p>
                        <p className="w-3/12 mt-3">
                          <i className="font-semibold">Tersisa : </i>
                          {item?.products?.stock}
                        </p>
                      </div>
                      <p>
                        Harga :{" "}
                        <b className="text-red-600">
                          {item?.products?.price === null ||
                          item?.products?.price === 0
                            ? "Free"
                            : `${formatRupiah(`${item?.products?.price}`)},-`}
                        </b>
                      </p>
                      <p className="py-2 font-normal">
                        {item?.products?.description}
                      </p>
                    </div>
                    <form onSubmit={handleAddToOrder}>
                      <label htmlFor="">Jumlah : </label>
                      <input
                        className="border border-gray-500 rounded-lg px-2 w-1/5 mx-a"
                        type="number"
                        value={orderData.totalProduct}
                        onChange={(e) =>
                          setOrderData({
                            ...orderData,
                            totalProduct: e.target.value,
                          })
                        }
                      />
                      <div className="flex flex-wrap gap-5 justify-center">
                        <ButtonSecondary
                          type="submit"
                          name={"Bayar Nanti"}
                          onClick={() => handleAddToOrder(item.id)}
                          classname={
                            "w-2/5 mt-5 hover:bg-blue-800 hover:text-white font-semibold"
                          }
                        />
                        <ButtonPrimary
                          classname={"p-4 w-2/5 mt-5"}
                          onClick={() => handleCheckkout(item.id)}
                          name={"Lanjut Pemabayaran"}
                          type="submit"
                        ></ButtonPrimary>
                      </div>
                    </form>
                  </OrderCreate>
                </>
              ))}
          </div>
        </>
      )}

      {/* <OrderCreate isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold">Order Product</h2>
        <img src={data.image} alt="product" />
        <div>
          <div className='flex flex-wrap'>
            <p className='w-9/12 text-2xl font-bold py-2'>{data.title}</p>
            <p className='w-3/12 mt-3'><i className='font-semibold'>Tersisa : </i>{data.stock}</p>
          </div>
          <p>Harga : <b className='text-red-600'>{data.price === null || data.price === 0 ? 'Free' : `${formatRupiah(`${data.price}`)},-`}</b></p>
          <p className='py-2 font-normal'>{data.description}</p>
        </div>
        <form onSubmit={handleAddToOrder}>
          <label htmlFor="">Jumlah : </label>
          <input className='border border-gray-500 rounded-lg px-2 w-1/5 mx-a' type="number"
            value={orderData.totalProduct}
            onChange={(e) => setOrderData({ ...orderData, totalProduct: e.target.value })}
          />
          <div className='flex flex-wrap gap-5 justify-center'>
            <ButtonSecondary type='submit' name={'Bayar Nanti'} onClick={handleAddToOrder} classname={'w-2/5 mt-5 hover:bg-blue-800 hover:text-white font-semibold'} />
            <ButtonPrimary classname={'p-4 w-2/5 mt-5'} onClick={process} name={"Lanjut Pemabayaran"} type='submit'></ButtonPrimary>
          </div>
        </form>
      </OrderCreate> */}
    </div>
  );
};

export default CartList;
