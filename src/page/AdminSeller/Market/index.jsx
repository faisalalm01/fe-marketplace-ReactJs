import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { FaEllipsisV } from 'react-icons/fa'; // Gunakan ikon sesuai keinginan
import { CiTrash } from "react-icons/ci";
import { MdModeEditOutline } from "react-icons/md";

const AddMarket = () => {
  const [marketData, setMarketData] = useState({
    nama: "",
    deskripsi: "",
    logo: null,
    address: "",
    simpulrempahId: "",
  });
  const token = localStorage.getItem("token");
  const [isAdd, setIsAdd] = useState(false);
  const [simpul, setSimpul] = useState({});
  const [markets, setMarkets] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickToAdd = () => {
    setIsAdd(true);
  };
  const handleButtonCancel = () => {
    setIsAdd(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setMarketData({ ...marketData, [name]: files[0] });
    } else {
      setMarketData({ ...marketData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nama", marketData.nama);
      formData.append("deskripsi", marketData.deskripsi);
      formData.append("address", marketData.address);
      formData.append("logo", marketData.logo);

      // Kirim data ke server dengan menggunakan axios
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "market/create",
        formData,
        {
          headers: {
            access_token: `Bearer ${token}`, // Menggunakan token bearer untuk otorisasi
            "Content-Type": "multipart/form-data", // Pastikan header sesuai
          },
        }
      );

      // Proses respons dari server jika diperlukan
      console.log("Response :", response.data);
      window.location.href = window.location.href;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Setel header dengan token bearer
    const headers = {
      access_token: `Bearer ${token}`,
    };

    // Buat permintaan GET ke endpoint keranjang
    axios
      .get(import.meta.env.VITE_BASE_URL + "user/market", { headers })
      .then((response) => {
        setMarkets(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data market user:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + "simpulrempah/list")
      .then((response) => {
        setSimpul(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data titik simpul:", error);
      });
  }, []);

  
  const handleDelete = async (id) => {
    const headers = {
      access_token: `Bearer ${token}`,
    };
    axios
    .delete(import.meta.env.VITE_BASE_URL+`market/delete/${id}`, {headers})
    .then((response) => {
      setMarkets(response.data.data);
    })
    .catch((error) => {
      console.error("Gagal mengambil data titik simpul:", error);
    });
    // try {
    //   // Lakukan panggilan DELETE ke API
    //   await axios.delete(import.meta.env.VITE_BASE_URL+`market/delete/${id}`, {headers});
    //   // Hapus item dari state lokal
    //   setMarkets((prevItems) => prevItems.filter((item) => item.id !== id));
    // } catch (error) {
    //   console.error('Error deleting item:', error);
    // }
  };

  return (
    <>
      <Sidebar />
      <main class="p-4 md:ml-64 h-auto pt-20">
        <div>
          {isAdd ? (
            <div className="mx-auto container pb-10">
              <div className="bg-gray-200 mt-8 rounded-lg shadow-lg p-10">
                <form onSubmit={handleSubmit}>
                  <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
                      <h2 class="text-base font-semibold leading-7 text-gray-900">
                        Daftar Toko Mu
                      </h2>
                      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                          <label
                            for="username"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Nama Toko
                          </label>
                          <div class="mt-2">
                            <div class="px-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md bg-white">
                              <input
                                type="text"
                                name="nama"
                                value={marketData.nama}
                                onChange={handleInputChange}
                                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="nama pasar mu"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="col-span-full">
                          <label
                            for="about"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            alamat Toko
                          </label>
                          <div class="mt-2">
                            <textarea
                              type="text"
                              name="address"
                              value={marketData.address}
                              onChange={handleInputChange}
                              rows="3"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                        </div>
                        <div class="col-span-full">
                          <label
                            for="about"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Deskripsi Toko
                          </label>
                          <div class="mt-2">
                            <textarea
                              name="deskripsi"
                              value={marketData.deskripsi}
                              onChange={handleInputChange}
                              rows="5"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></textarea>
                          </div>
                        </div>

                        <div class="col-span-full">
                          <label
                            for="cover-photo"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Logo Toko
                          </label>
                          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div class="text-center">
                              <svg
                                class="mx-auto h-12 w-12 text-gray-300"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                <input
                                  type="file"
                                  name="logo"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <p class="text-xs leading-5 text-gray-600">JPG</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      class="text-sm font-semibold leading-6 text-gray-900"
                      onClick={handleButtonCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
              <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto">
                  <div class="lg:w-2/3 w-full mx-auto overflow-auto bg-white">
                    {markets && markets.dataMarket.length === 0 ? (
                      <div className="text-center font-bold text-2xl p-20 bg-white border rounded-lg shadow-xl ">
                        <div>Data Toko belum tersedia</div>
                      </div>
                    ) : (
                      <>
                        <table class="table-auto w-full text-left whitespace-no-wrap">
                          <thead>
                            <tr>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                Logo
                              </th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                Nama Toko
                              </th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                Deskripsi Toko
                              </th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                CreatedAt
                              </th>
                              <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {markets &&
                              markets.dataMarket.map((item) => (
                                <>
                                  <tr key={item.id}>
                                    <td>
                                      <img
                                        src={item.logo}
                                        alt=""
                                        className="p-3 w-40"
                                      />
                                    </td>
                                    <td>{item.nama}</td>
                                    <td>{item.deskripsi}</td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                      {/* <button
                                        className="dropdown-button"
                                        onClick={toggleDropdown}
                                      >
                                        <FaEllipsisV />{" "}
                                      </button>
                                      {isDropdownOpen && (
                                        <div className="dropdown-content rounded-md px-3 py-2">
                                        </div>
                                      )} */}
                                      <div className="gap-2 flex">
                                        <button>
                                          <MdModeEditOutline fontSize={25} color="indigo"/>
                                        </button>
                                        <button>
                                          <CiTrash fontSize={25} color="red" onClick={() => handleDelete(item.id)}/>
                                        </button>
                                      </div>
                                      {/* <MdModeEditOutline/>
                                      <CiTrash/> */}
                                    </td>
                                  </tr>
                                </>
                              ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                  <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <button
                      onClick={handleClickToAdd}
                      class="flex ml-auto text-white bg-orange-700 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default AddMarket;
