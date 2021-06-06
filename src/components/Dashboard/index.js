import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { LogoutIcon } from '../../assets/icons';
import { UserContext } from '../../App';
import PropTypes from 'prop-types';
import './style.css'

const Dashboard = () => {
  const { logout } = useContext(UserContext)

  const onLogout = () => {
    logout();
    return <Redirect to="/" />
  }

  return (
    <>
      <header>
        <h2 className='title'>Welcome to the gallery dashboard</h2>
        <LogoutIcon className='logout' onClick={onLogout} />
      </header>
      <div className='wrapper'>
        {Array(10).fill().map((x, i) => <Card key={`card${i}`} num={i+1} />)}
      </div>
    </>
  )
}

export default Dashboard

function Card({ num }) {
  return <div className="responsive">
    <div className="gallery">
      <a href={`/images/nature${num}.jpg`} target='blank'>
        <img src={`/images/nature${num}.jpg`} alt={`Nature ${num}`} width="600" height="400" />
      </a>
      <div className="desc">Add a description of the image here</div>
    </div>
  </div>
}

Card.propTypes = {
  num: PropTypes.number.isRequired,
}
