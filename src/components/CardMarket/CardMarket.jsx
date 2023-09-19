import React from 'react'
import PropTypes from 'prop-types'
import ButtonSecondary from '../Button/Secondary'

const CardMarket = ({id, logo, name, total, onClick}) => {
  return (
    <>
        <div className='my-auto mx-auto flex bg-white shadow-xl rounded-lg py-2' key={id}>
            <div>
                <img className='w-24 h-24 border-r-2' src={logo} alt="" />
            </div>
            <div className='my-auto px-5'>
                <h1 className='font-semibold'>{name}</h1>
                {/* <p>Total Produk : {total}</p> */}
            </div>
            <ButtonSecondary classname={'text-white bg-purple-900 px-2 mx-2'} name={">"} onClick={onClick}/>
        </div>
    </>
  )
}

CardMarket.propTypes = {
    id: PropTypes.string,
    logo: PropTypes.string,
    name: PropTypes.string,
    total: PropTypes.number,
    onClick: PropTypes.func
}

export default CardMarket