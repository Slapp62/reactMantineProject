export const setToken = (token: string, rememberMe: boolean) => {
  if (rememberMe === true) {
    localStorage.setItem('rememberMe', 'true');
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
};

export const getToken = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token;
};

export const handleBeforeUnload = () => {
  const rememberMe = localStorage.getItem('rememberMe');
  if (rememberMe === null) {
    sessionStorage.removeItem('token');
  }
};
