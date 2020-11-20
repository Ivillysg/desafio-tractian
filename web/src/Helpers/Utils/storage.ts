const EMAIL = '@user-app';
const isAuthenticated = () => localStorage.getItem(EMAIL) !== null;
const getEmail = () => localStorage.getItem(EMAIL);
const signIn = (email: string) => {
  localStorage.setItem(EMAIL, email);
};
const logout = () => {
  localStorage.removeItem(EMAIL);
};

export { EMAIL, isAuthenticated, getEmail, signIn, logout };
