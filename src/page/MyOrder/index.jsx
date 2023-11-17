import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../utils";
import ButtonPrimary from "../../components/Button/Primary";

const MyOrder = () => {
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

  const process = async (id) => {
    const dataorderupdated = orderItem.find((p) => p.id === id);

    if (dataorderupdated) {
      const configg = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      window.snap.pay(dataorderupdated.token_transaction, {
        onSuccess: async (result) => {
          // localStorage.setItem("datatransakski", JSON.stringify(result));
          // localStorage.setItem("datatransaction", JSON.stringify(result));
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
          window.location.href = "/user/order";
          // alert("success Pembayaran");
          // localStorage.setItem("transaction", JSON.stringify(result));
          // // setTokenTransaction("");
          // localStorage.removeItem("transaction");
        },
        onPending: async (result) => {
          window.location.href = "/user/order";
          // localStorage.setItem("transaction", JSON.stringify(result));
          // // setTokenTransaction("");
          // window.location.href = window.location.href;
        },
        onError: (error) => {
          window.location.href = "/user/order";
          // alert("pembayaran error");
          // console.log(error);
          // setTokenTransaction("");
        },
        onClose: () => {
          window.location.href = "/user/order";
          // alert("pembayaran error");
          // console.log("Anda Belum Menyelesaikan Pembayaran");
          // setTokenTransaction("");
        },
      });
    }
  };

  useEffect(() => {
    // production use : 'https://app.midtrans.com/snap/snap.js'
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    // const midtransUrl = 'https://app.midtrans.com/snap/snap.js'
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.env.CLIENT_KEY_MIDTRANS;
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  });

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="mx-auto container mt-20">
      {/* <p>{orderItem.length}</p> */}
      {orderItem?.length === 0 ? (
        <div className=" bg-white justify-center text-center rounded-lg shadow-xl py-6 font-bold text-2xl">
          <div>Orderanmu Kosong</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 mx-auto container my-16">
            {orderItem &&
              orderItem.map((item) => (
                <>
                  <div
                    key={item.id}
                    className="rounded-lg bg-white shadow-xl p-3 max-sm:mx-3"
                  >
                    <div>
                      <div className="md:flex flex-row mb-2 space-x-3">
                        <div>
                          <img
                            src={item?.product?.image}
                            alt=""
                            className=" md:w-52 rounded-lg"
                          />
                        </div>
                        <div className="max-sm:mt-5 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-lg font-semibold">
                              {item?.product?.title}
                            </p>
                            {item.status_bayar === "Belum Bayar" ? (
                              <p className="py-1 text-xs text-red-600 rounded-md px-2 bg-red-300">
                                {item.status_bayar}
                              </p>
                            ) : (
                              <div className="flex flex-row gap-2">
                                {item.status_kirim === "Belum Dikirim" ? (
                                  <p className="py-1 text-xs text-red-600 rounded-md px-2 bg-red-300">
                                    {item.status_kirim}
                                  </p>
                                ) : (
                                  <>
                                    <p className="py-1 text-xs text-green-600 rounded-md px-2 bg-green-300">
                                      {item.status_kirim}
                                    </p>
                                  </>
                                )}
                                <p className="py-1 text-xs text-green-600 rounded-md px-2 bg-green-300">
                                  {item.status_bayar}
                                </p>
                              </div>
                            )}
                          </div>
                          <p>total produk: {item.totalProduct}</p>
                          <p>
                            Harga :{" "}
                            <b className="text-red-600">
                              {item.totalPrice === null || item.totalPrice === 0
                                ? "Free"
                                : `${formatRupiah(`${item.totalPrice}`)},-`}
                            </b>
                          </p>
                          <p>{item?.products?.title}</p>
                          <p>
                            <b>Alamat Pengiriman:</b> {item.alamat_pengiriman}{" "}
                          </p>
                        </div>
                      </div>
                      {item.status_bayar === "Sudah Dibayar" ? (
                        <></>
                      ) : (
                        <>
                          <ButtonPrimary
                            name={"Bayar Sekarang"}
                            onClick={() => process(item.id)}
                            classname={"px-3 p-2 rounded-xl"}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrder;
