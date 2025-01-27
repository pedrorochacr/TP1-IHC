import { useState } from "react";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { toast } from "react-toastify";

export const useUser = () => {
  const [uploading, setUploading] = useState(false);

  const uploadXlsx = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Adiciona o arquivo ao FormData

    setUploading(true);
    try {
      await api.post("/user/importUser", formData);
      toast.success("Usuários importados com sucesso!");
    } catch (error) {
      toastError(error);
    } finally {
      setUploading(false);
    }
  };

  const getUsers = async () => {
    
    try {
      const response = await api.get("/user/users");
      return response.data;
    } catch (error) {
      toastError(error);
    } 
  };
  const alterUnit = async (id, data) => {
    
    try {
      const response = await api.put(`/user/unit/${id}`,data);
      return response.data;
    } catch (error) {
      toastError(error);
    } 
  };
  const addProfilePic = async (id, data) => {
    
    try {
      const response = await api.put(`/user/profilepic/${id}`,data);
      return response.data;
    } catch (error) {
      toastError(error);
    } 
  };
  const editUser = async (id, data) => {
    
    try {
      const response = await api.put(`/user/edit/${id}`,data);
      return response.data;
    } catch (error) {
      toastError(error);
    } 
  };
  const findUser = async (id) => {
    
    try {
      const response = await api.get(`/user/user/${id}`);
      return response.data;
    } catch (error) {
      toastError(error);
    } 
  };
  const createUser = async (data) => {
    
    try {
      const response = await api.post("/user/register", data);
      return response.data;
    } catch (error) {
      toastError(error);
    } 
  };
  return { uploadXlsx, uploading , getUsers, createUser, findUser, editUser, addProfilePic, alterUnit};
};
