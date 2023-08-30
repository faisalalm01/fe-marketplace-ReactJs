import React from 'react'
import PropTypes from 'prop-types'
import ButtonPriamry from '../Button/Primary'

const CardProduct = ({ image, title, description, price, onClick }) => {
    return (
        <>
            <div className='w-56 max-lg:w-1/4 xl:w-1/5 max-md:w-1/3 max-sm:w-1/3 shadow-2xl rounded-md bg-white'>
                <div className='p-1.5 h-80'>
                    <img className='w-full h-full bg-gray-500 rounded-md' src={image} alt="gambar-product" />
                </div>
                <div className='lg:px-5 sm:px-2'>
                    <h1 className='text-xl font-semibold'>{title}</h1>
                    <p className='text-gray-500 font-thin text-sm mt-2 mb-5'>{description}....</p>
                    <div className='flex flex-wrap justify-between my-5'>
                        <ButtonPriamry onClick={onClick} classname={'max-lg:w-3/5 xl:py-2 px-8 xl:w-3/6'} name={'Detail'} />
                        <p className='my-auto text-sm font-medium text-right w-3/6'>{price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

CardProduct.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    onClick: PropTypes.func
}

export default CardProduct