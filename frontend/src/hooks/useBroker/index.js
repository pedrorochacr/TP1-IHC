import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const useBroker = () => {
  const [loading, setLoading] = useState(false);


  const searchAccounts = async (userId) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/broker/accounts/${userId}`);
      return data
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };
  const createAccount = async (body, userId) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/broker/accounts/${userId}`, body);
      console.log("Retorno ",data)
      return data
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchAccounts,
    createAccount,
    loading
  };
};

export default useBroker;
