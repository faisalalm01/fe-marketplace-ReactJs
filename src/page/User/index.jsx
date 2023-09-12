import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    axios.put('/api/profile', user, {
      headers: {
        'access_token': `Bearer ${token}`,
      },
    })
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Gagal menyimpan perubahan:', error);
        setIsEditing(false)
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  console.log(user);
  function Logout() {
    localStorage.removeItem('token');

    // Setelah menghapus token, Anda dapat melakukan tindakan lain yang sesuai
    // Misalnya, mengarahkan pengguna kembali ke halaman login atau beranda
    window.location.href = '/';
  }

  return (
    <>
      <div className='container mx-auto my-20 '>
        {user ? (
          <div className=''>
            <div className='flex flex-wrap mx-56 px-12 py-10 bg-white rounded-lg shadow-xl'>
              <div className='w-2/6 mt-10 '>
                <img className='ml-20 border border-green-500 w-32 rounded-full h-32' src="" alt="user-profile" />
              </div>
              <div className='w-3/5 px-2'>
                {isEditing ? (
                  <>
                    <h2 className='font-semibold text-2xl py-2 border-b-2'>Edit Profil</h2>
                    <div className='flex flex-col'>
                      <input
                        type="text"
                        name="firstname"
                        placeholder='firstname'
                        value={user.firstname}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="lastname"
                        placeholder='lastname'
                        value={user.lastname}
                        onChange={handleInputChange}
                      />
                       <input
                        type="text"
                        name="nohp"
                        placeholder='No.Telp'
                        value={user.nohp}
                        onChange={handleInputChange}
                      />
                      <textarea
                        name="address"
                        placeholder='address'
                        value={user.address}
                        onChange={handleInputChange}
                      />
                      <button onClick={handleSaveClick} className='bg-green-500 px-5 py-2 rounded-lg my-5 font-semibold text-white'>Simpan</button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className='font-semibold text-2xl py-2'>Profile Saya</h2>
                    <div className='border-t-2 py-5 font-medium text-lg'>
                      <p>Firstname: {user.firstname}</p>
                      <p>Lastname: {user.lastname}</p>
                      <p>Username: {user.username}</p>
                      <p>Email: {user.email}</p>
                      <p>Address: {user.address}</p>
                      <p>No.Telp: {user.nohp}</p>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      <button className='bg-blue-500 text-white font-serif px-6 py-2 rounded-lg' onClick={handleEditClick}>
                        Edit
                      </button>
                      <button className='bg-red-600 text-white font-serif px-4 py-2 rounded-lg' onClick={Logout}>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className=' container flex flex-wrap justify-center gap-3 my-5'>
              {user.dataMarket.length !== 0 ? (
                <>
                  {/* card product */}
                  <div className='w-4/12 h-20 border border-red-500 rounded-lg bg-red-500 hover:bg-red-300' onClick={() => navigate('/admin/dashboard')}>
                    <div>

                    </div>
                  </div>

                  {/* card market */}
                  <div className='w-4/12 h-20 border border-purple-800 rounded-lg bg-purple-800 hover:bg-purple-500' onClick={() => navigate('/admin/dashboard')}>
                    <div>

                    </div>
                  </div>
                </>
              ) : (
                <div>

                </div>
              )}
            </div>

          </div>
        ) : (
          <p>Tidak ada data pengguna.</p>
        )}
      </div>
    </>

  )
}

export default UserProfile