import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../store/slices/auth-slice';

const Signout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(authActions.setToken(null))
    history.push('/')
  }, [])
  return (
    <div>
       
    </div>
  )
}

export default Signout