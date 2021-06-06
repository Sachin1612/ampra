import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../utils/validations';
import FormInput from '../common/FormInput';

const EMAIL = 'email';
const PASSWORD = 'password';

const Login = () => {
  const initialState = {
    [EMAIL]: '',
    [PASSWORD]: '',
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
      case EMAIL:
        formErrors[fieldName] = !value ? 'Email is required!' :
                                !value.match(EMAIL_REGEX) ? 'Invalid email address!' : ''
        break;
      case PASSWORD:
        formErrors[fieldName] = !value ? 'Password is required!' :
                                !value.match(PASSWORD_REGEX) ? 'Password must has at least 6 characters include at least 1 number and 1 special character!' : ''
        break;
      default:
        break;
    }

    return formErrors;
  }

  const isValid = () => {
    const fieldErrors = {
      ...validateField(EMAIL, formData[EMAIL]),
      ...validateField(PASSWORD, formData[PASSWORD]),
    }
    
    setErrors(fieldErrors)
 
    return !Object.values(fieldErrors).some(x => x.length > 0)
  }

  const handleSubmit = e => {
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
          <h3 className='title'>Log in</h3>
          <hr />
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

          <div className="form-group">
            <button type='submit'>Login</button>
          </div>
          <p>
            Not a memeber yet?  <Link to='/signup'>Create your account</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default Login
