export const loadAuthedUser = () => {
  try {
    return localStorage.getItem("authedUser");
  } catch (err) {
    return null;
  }
};

export const saveAuthedUser = user => {
  if (user) localStorage.setItem("authedUser", user);
};

export const removeAuthedUser = () => localStorage.removeItem("authedUser");
