export const loadAuthedUser = () => {
  try {
    const authedUser = localStorage.getItem("authedUser");
    return JSON.parse(authedUser);
  } catch (err) {
    return null;
  }
};

export const saveAuthedUser = user => {
  try {
    const authedUser = JSON.stringify(user);
    localStorage.setItem("authedUser", authedUser);
    return JSON.parse(authedUser);
  } catch (err) {
    return null;
  }
};
