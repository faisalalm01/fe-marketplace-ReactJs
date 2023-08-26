import React from 'react'
import PropTypes from 'prop-types'

const ButtonSecondary = ({ name, classname, onClick }) => {
  return (
    <button
            onClick={onClick}
            type='button'
            className={`rounded-md border-2 border-purple-800 ${classname}`}
        >
            {name}
    </button>
  )
}

ButtonSecondary.prototypetotype = {
    name: PropTypes.string,
    classname: PropTypes.string,
    onClick: PropTypes.func
}

export default ButtonSecondary