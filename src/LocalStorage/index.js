export const loadJwtToken = () => {
  return localStorage.getItem('jwtToken');
};

export const saveJwtToken = jwtToken => {
  try {
    localStorage.setItem('jwtToken', jwtToken);
  } catch (e) {}
};

export const clearJwtToken = () => {
  try {
    localStorage.removeItem('jwtToken');
  } catch (e) {}
};
