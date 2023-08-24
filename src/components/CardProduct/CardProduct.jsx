import React from 'react'
import PropTypes from 'prop-types'
import ButtonTest from '../Button'

const CardProduct = ({ image, title, description, price, onClick }) => {
    return (
        <div className='w-1/5 shadow-2xl rounded-md bg-white mb-16'>
            <div className='p-1.5'>
                <img className='w-full bg-gray-500 h-44 rounded-md' src={image} alt="" />
            </div>
            <div className='px-5'>
                <h1 className='text-xl font-semibold'>{title}</h1>
                <p className='text-gray-500 font-thin text-sm mt-2 mb-5'>{description}....</p>
                <div className='flex flex-wrap justify-between'>
                    <ButtonTest onClick={onClick} classname={'w-3/5 py-2 mb-5'} name={'Detail'} />
                    <p className='mt-2 text-sm font-medium'>Rp{price} ,-</p>
                </div>
            </div>
        </div>
    )
}

CardProduct.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    onClick: PropTypes.func
}

export default CardProduct