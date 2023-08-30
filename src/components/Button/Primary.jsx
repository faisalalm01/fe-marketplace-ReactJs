import React from 'react'
import PropTypes from 'prop-types'

const ButtonPrimary = ({ name, classname, onClick, disabled }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type='button'
            className={`bg-blue-800 text-white rounded-md font-semibold hover:bg-white hover:text-black border-2 border-blue-800 ${classname}`}
        >
            {name}
        </button>
    )
}

ButtonPrimary.propTypes = {
    name: PropTypes.string,
    classname: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
}

export default ButtonPrimary