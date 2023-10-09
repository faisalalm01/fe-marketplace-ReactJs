import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/action'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kode_pos: '',
    simpulrempahId: ''
  });
  const [simpul, setSimpul] = useState([])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL + '/auth/register', formData);
      console.log(response.data);
      if (response.data.status === 200) {
        console.log(response.data.msg);
        navigate('/login')
      } else if (response.data.status === 401) {
        console.log(response.data.error);
      } else {
        console.log(response.data.error);
        console.error('Gagal melakukan registrasi.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };
  useEffect(() => {

    axios.get(import.meta.env.VITE_BASE_URL + 'simpulrempah/list')
      .then((response) => {
        setSimpul(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data titik simpul:', error);
      });
  }, []);
  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign up
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="firstname"
                className="block text-sm font-semibold text-gray-800"
              >
                firstname
              </label>
              <input
                value={formData.firstname}
                onChange={handleInputChange}
                name='firstname'
                type="firstname"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="lastname"
                className="block text-sm font-semibold text-gray-800"
              >
                lastname
              </label>
              <input
                value={formData.lastname}
                name='lastname'
                onChange={handleInputChange}
                type="lastname"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                email
              </label>
              <input
                value={formData.email}
                name='email'
                onChange={handleInputChange}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                value={formData.password}
                name='password'
                onChange={handleInputChange}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              </div>
              <div>
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Pilih simpul rempah terdekat mu :</label>
                  <div className="mt-2">
                    <select
                      name="simpulrempahId"
                      type="simpulrempahId"
                      value={formData.simpulrempahId}
                      onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 bg-white px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option value="" disabled>Pilih Sipul Rempah</option>
                      {simpul && simpul.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>

              <div className='flex flex-wrap'>
                <div className="mb-2 w-6/12">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Provinsi
                  </label>
                  <input
                    value={formData.provinsi}
                    name='provinsi'
                    onChange={handleInputChange}
                    type="provinsi"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2 w-6/12">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Kota
                  </label>
                  <input
                    value={formData.kota}
                    name='kota'
                    onChange={handleInputChange}
                    type="kota"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className='flex flex-wrap'>
                <div className="mb-2 w-6/12">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Kecamatan
                  </label>
                  <input
                    value={formData.kecamatan}
                    name='kecamatan'
                    onChange={handleInputChange}
                    type="kecamatan"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mb-2 w-6/12">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Kode Pos
                  </label>
                  <input
                    value={formData.kode_pos}
                    name='kode_pos'
                    onChange={handleInputChange}
                    type="kode_pos"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                </div>

              <div class="col-span-full">
                <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Alamat Lengkap</label>
                <div class="mt-2">
                  <textarea
                    placeholder='Jalan in aja dulu'
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange} rows="5" class=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></textarea>
                </div>
              </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Register
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            already have an account?{" "}
            <a
              onClick={() => navigate('/login')}
              href="#"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register