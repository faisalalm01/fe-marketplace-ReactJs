import React from 'react'
import Banner from '../../../components/Banner'
import Product from '../Product';

const Main = () => {
  return (
    <div className='mx-auto mt-16'>
      <header className='container mx-auto'>
        <Banner/>
        <div className='text-center mt-20'>
          <h1 className='text-3xl font-bold'>About Us</h1>
          <p className='mt-5 md:px-36 sm:px-4 lg:px-56 xl:px-56'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nemo molestiae, tenetur eaque, quod sequi quisquam quidem perspiciatis enim dolore nisi repellendus vitae amet sapiente recusandae. Blanditiis nisi sint dignissimos?</p>
        </div>
      </header>
      <main className=''>
        <Product/>
      </main>
    </div>
  )
}

export default Main