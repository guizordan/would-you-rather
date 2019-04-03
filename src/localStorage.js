export const loadAuthedUser = () => {
  try {
    return localStorage.getItem("authedUser");
  } catch (err) {
    return null;
  }
};

export const saveAuthedUser = user => {
  try {
    localStorage.setItem("authedUser", user);
    return user;
  } catch (err) {
    return null;
  }
};
