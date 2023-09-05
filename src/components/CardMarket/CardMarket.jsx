import React from 'react'
import PropTypes from 'prop-types'
import ButtonSecondary from '../Button/Secondary'

const CardMarket = ({id, logo, name, total, onClick}) => {
  return (
    <>
        <div className='my-auto mx-auto flex flex-wrap' key={id}>
            <div>
                <img className='' src={logo} alt="" />
            </div>
            <div className=''>
                <h1>{name}</h1>
                <p>Total Produk : {total}</p>
            </div>
            <ButtonSecondary classname={'text-white bg-purple-900'} name={">"} onClick={onClick}/>
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