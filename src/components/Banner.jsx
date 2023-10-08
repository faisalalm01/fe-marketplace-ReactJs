import React from 'react'

const Banner = () => {
  return (
    <div className='rounded-lg w-full shadow-xl flex flex-col lg:flex-row flex-wrap py-5 px-5 lg:px-20 justify-between'>
      <div className='w-full lg:w-5/12 my-auto space-y-5'>
        <p className='font-semibold font-sans text-4xl lg:text-6xl text-gray-600'>
          Virtual Tour
          <div>
            <p className='text-orange-700'>
              Jejak Jalur Rempah
            </p>
          </div>
          Nusantara
        </p>
        <p className='text-gray-600'>Menyusuri Warisan Budaya dan Petualangan Aromatik di Jalan Rempah-Rempah</p>
        <div className=''>
          <a href="https://jejakrempah.com/">
            <button className='w-52 bg-orange-700 text-white font-sans p-3 rounded-full hover:bg-orange-600 mb-5'>Eksplore Jalur Rempah</button>
          </a>
        </div>
      </div>
      <div className='w-full lg:w-6/12 '>
        <img className='w-full' src="https://app.tegaltourism.com/rempahtour/static/img/landingpage/hero.png" alt="" />
      </div>
    </div>
  )
}

export default Banner