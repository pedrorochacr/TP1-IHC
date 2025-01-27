import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const useAuth = () => {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);





  // Lógica de login para armazenar o refresh token
  const handleLogin = async (userData) => {
    setIsAuth(true);
  };

  // Lógica de logout
  const handleLogout = async () => {
    setIsAuth(false)
  };

  const handleSearchNames = async (searchParam) => {
    if (!searchParam) {
      setUsers([]); 
      return;
    }
    console.log(searchParam);
    try {
      const { data } = await api.get(`/user/search?caracter=${searchParam}`); 
      setUsers(data);
      console.log(data);
    } catch (err) {
      toastError(err);
    }
  };

  return {
    isAuth,
    user,
    loading,
    handleLogin,
    handleLogout,
    handleSearchNames,
    users
  };
};

export default useAuth;
