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
    // Load user data from cookie if it's not available and status is idle
    if (!userData && status === IDLE) {
      setLoading(true);
      dispatch(loadUserFromCookie());
    }
  }, [dispatch, userData, status]);

  useEffect(() => {
    // Set loading based on status changes
    if (status === PENDING || !userData) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, userData]);

  const userRole = userData?.data?.accounts?.role || null;

  return { userRole, loading };
};

export default useAuthen;
