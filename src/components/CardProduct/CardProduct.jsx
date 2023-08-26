import React from 'react'
import PropTypes from 'prop-types'
import ButtonPriamry from '../Button/Primary'

const CardProduct = ({ image, title, description, price, onClick }) => {
    return (
        <>
            {/* <div class="flex flex-wrap -m-4 items-center justify-center">
                <div class="xl:w-1/4 md:w-1/3 p-4">
                    <div class="bg-gray-100 p-6 rounded-lg">
                        <img class="h-40 rounded w-full object-cover object-center mb-6" src={image} alt="content" />
                        <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
                        <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
                        <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
                    </div>
                </div>
            </div> */}
            <div className='w-56 xl:w-1/5 md:w-1/3 sm:w-1/3 shadow-2xl rounded-md bg-white mb-16'>
                <div className='p-1.5'>
                    <img className='w-full bg-gray-500 h-44 rounded-md' src={image} alt="" />
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