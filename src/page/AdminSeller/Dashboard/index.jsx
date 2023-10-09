import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../../utils";
import ButtonPrimary from "../../../components/Button/Primary";
import Sidebar from "../../../components/Sidebar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [market, setMarket] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
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
    if (token) {
      // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
      const config = {
        headers: {
          access_token: `Bearer ${token}`,
        },
      };

      axios
        .get(import.meta.env.VITE_BASE_URL + "/user/market", config) // Ganti dengan URL API yang sesuai
        .then((response) => {
          setMarket(response.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
      const config = {
        headers: {
          access_token: `Bearer ${token}`,
        },
      };

      axios
        .get(import.meta.env.VITE_BASE_URL + "/user/product", config) // Ganti dengan URL API yang sesuai
        .then((response) => {
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [token]);

  const username = `${user?.firstname} ${user?.lastname}`;

  return (
    <div className="bg-gray-200 max-h-0">
      <div>
        <Sidebar />
        <main class="p-4 md:ml-64 h-auto pt-10">
          <div className="bg-orange-700 text-white w-fit px-3 py-1 my-2 rounded-lg">
            Penjual
          </div>
          <div class="border-2 rounded-lg bg-white  mb-4">
            <p className="lg:p-9 text-2xl font-semibold sm:text-xl lg:text-3xl font-mono">
              Welcome {username}
            </p>
          </div>
          {/* <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div
              class="bg-white border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
            ></div>
            <div
              class="bg-blue-400 rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
            ></div>
            <div
              class="bg-green-400 rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
            ></div>
            <div
              class="bg-red-500 rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
            ></div>
          </div> */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div class="rounded-lg bg-white shadow-md">
              <div className="p-5  rounded-md">
                <div className="flex flex-wrap justify-between mb-4">
                  <p className="text-xl font-bold">Toko</p>
                  <button
                    className="px-4 rounded-md bg-gray-200"
                    onClick={() => navigate("/admin/market")}
                  >
                    View All
                  </button>
                </div>
                <hr />
                <div className="mt-4">
                  {market && market.dataMarket.length === 0 ? (
                    <div className="text-center">data kosong</div>
                  ) : (
                    <>
                      <div className="p-2 m-1 rounded-md">
                        {market &&
                          market.dataMarket
                            .map((item) => (
                              <div
                                className="flex bg-white rounded-lg p-2 w-fully-2 py-0"
                                key={item.id}
                              >
                                <div className="p-2">
                                  <img
                                    src={item.logo}
                                    className="border w-14 h-14 rounded-full"
                                    alt="logo-market"
                                  />
                                </div>
                                <div className="flex flex-wrap justify-between ml-3 py-2">
                                  <div className="">
                                    <p className="font-semibold text-lg">
                                      {item.nama}
                                    </p>
                                    <p className="font-serif">{item.address}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                            .slice(0, 3)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div class="rounded-lg shadow-md bg-white">
              <div className="p-5  rounded-md">
                <div className="flex flex-wrap justify-between mb-4">
                  <p className="text-xl font-bold">Produk</p>
                  <button
                    className="px-4 rounded-md bg-gray-200"
                    onClick={() => navigate("/admin/product")}
                  >
                    View All
                  </button>
                </div>
                <hr />
                <div className="mt-4">
                  {market && market.dataMarket.length === 0 ? (
                    <div className="text-center">data kosong</div>
                  ) : (
                    <>
                      <div className=" p-2 m-1 rounded-md">
                        {product &&
                          product.dataProduct
                            .map((item) => (
                              <div
                                className="flex bg-white rounded-lg p-2 w-full shadow-md my-2"
                                key={item.id}
                              >
                                <div className="border rounded-lg">
                                  <img
                                    src={item.image}
                                    className="w-32 h-full rounded-lg"
                                    alt="test"
                                  />
                                </div>
                                <div className="flex flex-wrap justify-between ml-5 w-full">
                                  <div className="w-8/12 border-r-2 my-auto">
                                    <p className="font-semibold text-lg">
                                      {item.title}
                                    </p>
                                    <p>{item?.kategori}</p>
                                    <p className="text-red-500 font-mono">
                                      {item.price === null || item.price === 0
                                        ? "Free"
                                        : `${formatRupiah(`${item.price}`)},-`}
                                    </p>
                                    <p className="font-serif">
                                      <i>stock : {item.stock}</i>
                                    </p>
                                  </div>
                                  <div className="w-4/12 my-2"></div>
                                </div>
                              </div>
                            ))
                            .slice(0, 5)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
