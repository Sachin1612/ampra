import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validations';
import FormInput from '../common/FormInput';

const NAME = 'name';
const EMAIL = 'email';
const PASSWORD = 'password';
const CONFIRM_PASSWORD = 'confirmPassword';

const Registration = () => {
  const initialState = {
    [NAME]: '',
    [EMAIL]: '',
    [PASSWORD]: '',
    [CONFIRM_PASSWORD]: '',
  }

  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(initialState)
  const {user, authenticate} = useContext(UserContext)
   
  /**
   * Validate field with name and value
   * @param {String} fieldName Field name
   * @param {any} value Field value
   * @example validateField('name', 'sachin')
   * @returns Object of errors 
   */
  const validateField = (fieldName, value) => {
    const formErrors = errors;
    switch (fieldName) {
      case NAME:
        formErrors[fieldName] = !value ? 'Name is required!' : ''
        break;
      case EMAIL:
        formErrors[fieldName] = !value ? 'Email is required!' :
                                !value.match(EMAIL_REGEX) ? 'Invalid email address!' : ''
        break;
      case PASSWORD:
        formErrors[fieldName] = !value ? 'Password is required!' :
                                !value.match(PASSWORD_REGEX) ? 'Password must has at least 6 characters include at least 1 number and 1 special character!' : ''
          break;
      case CONFIRM_PASSWORD:
        formErrors[fieldName] = !value ? 'Confirm password is required!' :
                                value !== formData[PASSWORD] ? 'Not matching with password!' : ''
          break;
      default:
        break;
    }

    return formErrors;
  }
 
  const isValid = () => {
    const fieldErrors = {
      ...validateField(NAME, formData[NAME]),
      ...validateField(EMAIL, formData[EMAIL]),
      ...validateField(PASSWORD, formData[PASSWORD]),
      ...validateField(CONFIRM_PASSWORD, formData[CONFIRM_PASSWORD]),
    }
    
    setErrors(fieldErrors)
 
    return !Object.values(fieldErrors).some(x => x.length > 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      return false;
    }

    authenticate();
  }

  const onChange = e => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })

    // Set error on field
    setErrors(validateField(name, value))
  }

  return (
    <>
    {user && <Redirect to="/" />}
    <div className='container'>
      <form onSubmit={handleSubmit} >
        <h3 className='title'>Registration</h3>
        <hr />
        <FormInput
          name={NAME}
          onChange={onChange}
          value={formData[NAME]}
          error={errors[NAME]}
          label='Name'
        />
        <FormInput
          name={EMAIL}
          onChange={onChange}
          value={formData[EMAIL]}
          error={errors[EMAIL]}
          label='Email'
        />
        <FormInput
          name={PASSWORD}
          onChange={onChange}
          value={formData[PASSWORD]}
          error={errors[PASSWORD]}
          type='password'
          label='Password'
        />
        <FormInput
          name={CONFIRM_PASSWORD}
          onChange={onChange}
          value={formData[CONFIRM_PASSWORD]}
          error={errors[CONFIRM_PASSWORD]}
          type='password'
          label='Confirm Password'
        />
        <div className="form-group">
          <button type='submit'>Sign up</button>
        </div>
        <p>
          Are you a member?  <Link to='/login'>Click here to login</Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default Registration
