import React from 'react'
import PropTypes from 'prop-types'

const ButtonSecondary = ({ name, classname, onClick, disable }) => {
  return (
    <button
      disabled={disable}
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
  onClick: PropTypes.func,
  disable: PropTypes.bool
}

export default ButtonSecondary