const url = import.meta.env.VITE_REACT_APP_API_URL;

export const getAPI = async (path, token = "") => {
  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = token;
  }
  const finalPath = url + `/${path}`;
  const response = await fetch(finalPath, {
    method: "GET",
    headers: headers,
  });

  const main_response = await response.json();
  return main_response;
};

export const postAPI = async (path, data = {}, token = "") => {
  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = token;
  }
  const finalPath = url + `/${path}`;
  const response = await fetch(finalPath, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  const main_response = await response.json();
  return main_response;
};

export const postFormDataAPI = async (path, data, token = "") => {
  let headers = {
  };

  if (token) {
    headers.Authorization = token;
  }
  const finalPath = url + `/${path}`;
  const response = await fetch(finalPath, {
    method: "POST",
    headers: headers,
    body: data,
  });

  const main_response = await response.json();
  return main_response;
};
