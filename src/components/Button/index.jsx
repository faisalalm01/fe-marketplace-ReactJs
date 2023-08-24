import React from 'react'
import PropTypes from 'prop-types'

const ButtonTest = ({ name, classname, onClick }) => {
    return (
        <button
            onClick={onClick}
            type='button'
            className={`bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-500 ${classname}`}
        >
            {name}
        </button>
    )
}

ButtonTest.propTypes = {
    name: PropTypes.string,
    classname: PropTypes.string,
    // onClick: PropTypes.func
}

export default ButtonTest