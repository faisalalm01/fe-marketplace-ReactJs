import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
      const config = {
        headers: {
          'access_token': `Bearer ${token}`,
        },
      };

      axios.get('http://localhost:2024/api/user/detail', config) // Ganti dengan URL API yang sesuai
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token]);
  console.log(user);
  function Logout () {
    localStorage.removeItem('token');

    // Setelah menghapus token, Anda dapat melakukan tindakan lain yang sesuai
    // Misalnya, mengarahkan pengguna kembali ke halaman login atau beranda
    window.location.href = '/';
  }
  return (
    <div>
      {user ? (
        <div>
          <h2>Detail Pengguna</h2>
          <p>Firstname: {user.firstname}</p>
          <p>Lastname: {user.lastname}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>No.Telp: {user.nohp}</p>
          <div>
            <h1>Market Mu</h1>
            {user.dataMarket.map((item) => (
              <div key={item.id}>
                <img src={item.logo} className='w-48 border-2 border-black rounded-xl' alt="" />
                <p>{item.nama}</p>
                <p>{item.address}</p>
                <p>{item.product.length}</p>
                <div className='flex flex-wrap gap-5 justify-center mx-auto'>
                {item.product.map((product) => (
                  <div key={product.id}>
                    <div className='bg-gray-700 my-2 py-2 px-2 text-white rounded-md'>
                      <div>
                        <img src={product.image} className='w-44 rounded-2xl' alt="" />
                      </div>
                      <div>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            ))}
          </div>
          {/* Tampilkan detail pengguna lainnya */}
          <div>
            <button onClick={Logout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Tidak ada data pengguna.</p>
      )}
    </div>
  )
}

export default UserProfile