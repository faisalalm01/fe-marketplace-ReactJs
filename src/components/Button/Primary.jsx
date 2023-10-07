import React from 'react'
import PropTypes from 'prop-types'

const ButtonPrimary = ({ name, classname, onClick, disabled }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type='button'
            className={`bg-green-600 text-white rounded-md font-semibold hover:bg-green-500 border-2 ${classname}`}
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