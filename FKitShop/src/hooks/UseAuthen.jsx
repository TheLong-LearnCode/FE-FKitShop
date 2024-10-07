import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUserFromCookie } from '../service/authUser';
import { IDLE, PENDING } from '../redux/constants/status';

const useAuthen = () => {
  const dispatch = useDispatch();
  const { data: userData, status } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  console.log("user data in useAuthen:", userData);
  
  useEffect(() => {
    // If there's no user data in the state, try loading from cookie
    if (!userData) {
      dispatch(loadUserFromCookie());
    } else {
      setLoading(false);
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (status === IDLE || status === PENDING) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const userRole = userData ? userData.role : null; // Assuming `userData` contains a `role` field

  return { userRole, loading };
};

export default useAuthen;