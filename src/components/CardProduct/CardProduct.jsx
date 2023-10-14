import React from 'react'
import PropTypes from 'prop-types'
import ButtonPriamry from '../Button/Primary'

const CardProduct = ({ id, image, title, description, price, onClick }) => {
    return (
        <>
            <div className='bg-white shadow-lg bg-inherit border-gray-300 rounded-md dark:border-gray-600 lg:flex lg:flex-wrap overflow-hidden hover:shadow-2xl ' key={id}>
                <div className='h-560 px-2 w-full'>
                    <img className='w-full lg:h-52 h-40 bg-gray-500 rounded-md object-cover' src={image} alt="gambar-product" />
                </div>
                <div className='lg:px-5 px-2'>
                    <h1 className='lg:text-xl text-sm font-semibold'>{title}</h1>
                    <p className='text-gray-500 font-thin text-xs md:text-sm mt-2 mb-5 h-16'>{description}....</p>
                    <div className='flex LG:flex-wrap flex-wrap-reverse justify-between my-5'>
                        <ButtonPriamry onClick={onClick} classname={'max-lg:w-3/5 xl:py-2 px-8 xl:w-3/6'} name={'Detail'} />
                        <p className='my-auto text-sm font-medium text-right w-3/6'>{price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

CardProduct.propTypes = {
    id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    onClick: PropTypes.func
}

export default CardProduct