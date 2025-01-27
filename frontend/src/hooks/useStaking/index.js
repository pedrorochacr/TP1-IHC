import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const useStaking = () => {
  const [loading, setLoading] = useState(false);

  const create = async (body) => {
    setLoading(true);
    try {
      const { data } = await api.post(`/extraBets`,body);
      return data
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };
  const findExtraBets = async (userId) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/extraBets/${userId}`);
      return data
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };
  const search = async (userId,searchFilter) => {
    const {startDate, endDate, sportName} = searchFilter;
    setLoading(true);
    try {
      const { data } = await api.get(`/staking/${userId}?startDate=${startDate}&endDate=${endDate}&sportName=${sportName}`);
      return data
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };
  const remove = async (body) => {
    
    setLoading(true);
    try {
      const { data } = await api.post(`/removeBet`,body);
      return data
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    search,
    loading,
    create,
    findExtraBets,
    remove
  };
};

export default useStaking;
