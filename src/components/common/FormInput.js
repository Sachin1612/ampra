
import React from 'react'
import PropTypes from 'prop-types';
import './style.css'

/**
 * Form input creator to display label, input with error.
 * @param {String} param0 name
 * @param {String} param1 value
 * @param {Function} param2 callback function
 * @param {String} param3 label for input
 * @param {String} param4 error message
 * @param {Object} param5 rest parameter for input element
 */
const FormInput = ({ name, value, onChange, label, error, ...rest }) => {
  const id = `id_${name}`
  return (
    <div className={`form-group ${error.length > 0 ? 'invalid' : ''}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className='form-control'>
        <input {...{ name, id, onChange, value, placeholder: label, ...rest }} />
        <br />
        <div className="error">{error}</div>
      </div>
    </div>
  )
}

FormInput.defaultProps = {
  error: '',
  label: ''
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
}

export default FormInput