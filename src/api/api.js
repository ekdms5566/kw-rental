import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

const instanceUtil = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

const instancForm = axios.create({
  baseURL,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

// 기자재 관련 
export const getProductList = async (url) => {
  try {
    const response = await instanceUtil.get(`/equipments?${url}`);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await instanceUtil.get(`/equipments/${id}`);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
}

export const addEquipment = async (data) => {
  try {
    const response = await instanceUtil.post(`/admin/equipments`, data);

    return response.headers.get("Location");
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const deleteEquipment = async (id) => {
  try {
    const response = await instanceUtil.delete(`/admin/equipments/${id}`);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const modifyEquipment = async (id) => {
  try {
    const response = await instanceUtil.put(`/admin/equipments/${id}`);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const postImage = async (formData) => {
  try {
    const response = await instancForm.post(`/admin/equipments/images`, formData);

    return response.headers.get("Location");
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

// 담은 기자재 관련 
export const addCartEquip = async (data) => {
  try {
    const response = await instanceUtil.post(`/inventories`, data);

    return response.headers.get("Location");
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const getCartEquip = async (data) => {
  try {
    const response = await instanceUtil.get(`/inventories`, data);

    return response.data.inventories;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const deleteAllCartEquip = async () => {
try {
  const response = await instanceUtil.delete(`/inventories`);

  return response.status;
} catch (err) {
  console.error(err.message);
  return err;
}
};

export const deleteCartEquip = async (id) => {
  try {
    const response = await instanceUtil.delete(`/inventories/${id}`);

    return response.status;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const modifyCartEquip = async (id, data) => {
  try {
    const response = await instanceUtil.patch(`/inventories/${id}`, data);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

// 품목 관련
export const getItemList = async (id) => {
  try {
    const response = await instanceUtil.get(`/items?equipmentId=${id}`);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const getItem = async (id) => {
  try {
    const response = await instanceUtil.get(`/items/${id}`);

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const changeItemState = async (id, data) => {
  try {
    const response = await instanceUtil.patch(
      `/admin/items/${id}/rentalAvailable`,
      data
    );

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const changePropertyNum = async (id, data) => {
  try {
    const response = await instanceUtil.patch(
      `/admin/items/${id}/propertyNumber`,
      data
    );

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};

export const changeItems = async (id, data) => {
  try {
    const response = await instanceUtil.put(
      `/admin/items?equipmentId=${id}`,
      data
    );

    return response.data;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};