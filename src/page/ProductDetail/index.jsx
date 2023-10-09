import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct } from "../../store/action";
import ButtonSecondary from "../../components/Button/Secondary";
import { formatRupiah } from "../../utils";
import ButtonPrimary from "../../components/Button/Primary";
import { FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import OrderCreate from "../../components/Order";
// import ButtonTest from '../../components/Button';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { Product } = useSelector((state) => state);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [orderData, setOrderData] = useState({
    productId: Product.dataDetailProduct.id,
    totalProduct: 1,
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(getDetailProduct(id));
  }, [id]);

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

  useEffect(() => {
    if (Product.dataDetailProduct) {
      setData(Product.dataDetailProduct);
    } else {
      setData({});
      // setKategori({})
    }
  }, [Product.dataDetailProduct]);

  const handleAddToCart = () => {
    const headers = {
      access_token: `Bearer ${token}`,
    };

    const productData = {
      userId: user.id,
      productId: Product.dataDetailProduct.id,
    };

    axios
      .post(import.meta.env.VITE_BASE_URL + "user/cart", productData, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          setCartItems(response.data.data);
          window.location.href = window.location.href;
        } else if (response.status === 401 || user.id === null) {
          navigate("/login");
        } else {
          window.location.href = window.location.href;
        }
      })
      .catch((error) => {
        console.error("Gagal menambahkan produk ke keranjang:", error);
      });
  };

  const handleAddToOrder = () => {
    const headers = {
      access_token: `Bearer ${token}`,
    };

    const productData = {
      userId: user.id,
      productId: Product.dataDetailProduct.id,
      totalProduct: orderData.totalProduct,
    };

    axios
      .post(import.meta.env.VITE_BASE_URL + "user/order", productData, {
        headers,
      })
      .then((response) => {
        if (response.status === 200) {
          setOrderData(response.data.data);
          // navigate(`/product/detail/ + ${productId}`)
          window.location.href = window.location.href;
        } else if (response.status === 401 || user.id === null) {
          navigate("/login");
        } else {
          window.location.href = window.location.href;
        }
      })
      .catch((error) => {
        console.error("Gagal menambahkan produk ke order:", error);
      });
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "user/transaction",
        { amount }
      );
      setPaymentResponse(response.data);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const [name, setName] = useState("");
  const [order_id, setOrder_id] = useState("2183191327213");
  const [total, setTotal] = useState(45899);
  const [tokenTransaction, setTokenTransaction] = useState("");

  const process = async () => {
    // handleAddToOrder()
    const headers = {
      access_token: `Bearer ${token}`,
    };

    const data = {
      userId: user.id,
      productId: Product.dataDetailProduct.id,
      totalProduct: orderData.totalProduct,
    };

    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/user/order",
      data,
      { headers }
    );
    // console.log(response.data.data.token_transaction);
    let tokentrans = response.data.data.token_transaction;
    window.snap.pay(tokentrans, {
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
        window.location.href = "/";
        // alert("success Pembayaran");
        // localStorage.setItem("transaction", JSON.stringify(result));
        // // setTokenTransaction("");
        // localStorage.removeItem("transaction");
      },
      onPending: async (result) => {
        window.location.href = "/";
        // localStorage.setItem("transaction", JSON.stringify(result));
        // // setTokenTransaction("");
        // window.location.href = window.location.href;
      },
      onError: (error) => {
        window.location.href = "/";
        // alert("pembayaran error");
        // console.log(error);
        // setTokenTransaction("");
      },
      onClose: () => {
        window.location.href = "/";
        // alert("pembayaran error");
        // console.log("Anda Belum Menyelesaikan Pembayaran");
        // setTokenTransaction("");
      },
    });
  };
  useEffect(() => {
    if (tokenTransaction) {
      setName("");
      setOrder_id("");
      setTotal(0);
    }
  }, [tokenTransaction]);
  useEffect(() => {
    // production use : 'https://app.midtrans.com/snap/snap.js'
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.env.CLIENT_KEY_MIDTRANS;
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  });

  console.log(token);
  return (
    <div>
      <div className="w-full container mx-auto">
        <div className="px-5 py-9 mx-32 bg-white mt-16 rounded-md shadow-xl">
          {data.stock === null || data.stock <= 0 ? (
            <div className="flex flex-wrap rounded-md w-full bg-red-600 text-white justify-center item-center text-center font-bold text-xl py-3 gap-3">
              <div className="my-auto">
                <FiAlertCircle />
              </div>
              <p>produk tidak tersedia</p>
            </div>
          ) : (
            <div></div>
          )}
          ;
          <div className="flex flex-wrap gap-10">
            <div className="w-5/12">
              <img
                className="w-full rounded-md shadow-xl"
                src={data.image}
                alt={`gambar-product-${data.title}`}
              />
              <div className="mt-6 flex gap-2 w-full border">
                {Product.dataDetailProduct.userId === user?.id ? (
                  <>
                    <div></div>
                  </>
                ) : (
                  <>
                    {token === 'null' ? (
                      <>
                        <p>Login Dahulu sebelum order</p>
                      </>
                    ): (
                      <> 
                    <ButtonSecondary
                      disable={
                        data.stock === null || data.stock <= 0 ? true : false
                      }
                      name={"Masukkan Keranjang"}
                      classname={
                        "w-7/12 bg-purple-800 px-10 py-2 text-white font-semibold hover:text-purple-800 hover:bg-white"
                      }
                      onClick={handleAddToCart}
                    />
                    <ButtonPrimary
                      disabled={
                        data.stock === null || data.stock <= 0 ? true : false
                      }
                      name={"Buy"}
                      classname={"px-10 py-2 w-full"}
                      onClick={openModal}
                      />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="w-6/12">
              <div className="flex w-full">
                <h1 className="text-4xl font-semibold w-4/5">{data.title}</h1>
                <p className="w-1/5 mt-3">
                  <i className="font-semibold">Tersisa : </i>
                  {data.stock === null || data.stock <= 0 ? (
                    <>
                    <p>tidak tersedia</p>
                    </>
                  ):(
                    <>
                    {data.stock}
                    </>
                  )}
                </p>
              </div>
              <div className="space-y-4 text-lg mt-5">
                <p>
                  <b>Kategori : </b>
                  {data?.kategoris?.nama}
                </p>
                <div className="flex font-semibold gap-2">
                  Harga :
                  <p className="text-red-600">
                    {data.price === null || data.price === 0
                      ? "Free"
                      : `${formatRupiah(`${data.price}`)},-`}
                  </p>
                </div>
                <div className="space-y-3">
                  <b>Description :</b>
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-28 flex flex-wrap mx-32 h-32 bg-white mt-16 rounded-md shadow-2xl">
          <div className="w-6/12 my-auto flex">
            <div className="border-r-2 border-gray-500 flex px-8">
              <div className="mr-8">
                <img
                  className="border border-gray-300 rounded-full h-24 w-24"
                  src={data?.market?.logo}
                  alt=""
                />
              </div>
              <div>
                <p className="text-xl font-semibold my-2">
                  {data?.market?.nama}
                </p>
                <ButtonSecondary
                  name={"Kunjungi Toko"}
                  classname={
                    "text-purple-800 px-6 text-sm py-2 hover:text-white hover:bg-purple-800"
                  }
                  onClick={() => navigate(`/market/detail/${data?.market?.id}`)}
                />
              </div>
            </div>
            {/* <div className=''> */}
            <div className="text-center mx-auto my-auto text-gray-500">
              <p>Total Product :</p>
              <p className="text-xl font-serif">{data.totalProduct}</p>
            </div>
          </div>
          <div className="w-6/12 h-full ml-auto">
            <img
              className="object-cover h-full w-full"
              src={data.image}
              alt=""
            />
          </div>
          {/* </div> */}
        </div>

        <OrderCreate isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-semibold">Order Product</h2>
          <img src={data.image} alt="product" />
          <div>
            <div className="flex flex-wrap">
              <p className="w-9/12 text-2xl font-bold py-2">{data.title}</p>
              <p className="w-3/12 mt-3">
                <i className="font-semibold">Tersisa : </i>
                {data.stock}
              </p>
            </div>
            <p>
              Harga :{" "}
              <b className="text-red-600">
                {data.price === null || data.price === 0
                  ? "Free"
                  : `${formatRupiah(`${data.price}`)},-`}
              </b>
            </p>
            <p className="py-2 font-normal">{data.description}</p>
          </div>
          <form onSubmit={handleAddToOrder}>
            <label htmlFor="">Jumlah : </label>
            <input
              className="border border-gray-500 rounded-lg px-2 w-1/5 mx-a"
              type="number"
              value={orderData.totalProduct}
              onChange={(e) =>
                setOrderData({ ...orderData, totalProduct: e.target.value })
              }
            />
            {/* <input type="text" name="" placeholder={orderData.totalProduct} id="" /> */}
            <div className="flex flex-wrap gap-5 justify-center">
              <>
                <ButtonSecondary
                  type="submit"
                  name={"Bayar Nanti"}
                  onClick={handleAddToOrder}
                  classname={
                    "w-2/5 mt-5 hover:bg-blue-800 hover:text-white font-semibold"
                  }
                />
                <ButtonPrimary
                  classname={"p-4 w-2/5 mt-5"}
                  onClick={process}
                  name={"Lanjut Pemabayaran"}
                  type="submit"
                ></ButtonPrimary>
              </>
            </div>
          </form>
        </OrderCreate>
      </div>
      {/* <div className="App">
                <h1>Pembayaran dengan Midtrans</h1>
                <div>
                    <label>Jumlah Pembayaran:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button onClick={handleCheckout}>Bayar</button>

                {paymentResponse && (
                    <div>
                        <h2>Respon Pembayaran Midtrans:</h2>
                        <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
                    </div>
                )}
            </div> */}
    </div>
  );
};

export default ProductDetail;
