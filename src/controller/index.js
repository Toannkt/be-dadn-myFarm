import api from '../model/api';

export const getLoggedInUser = () => {
    const user_id = localStorage.getItem('currentUserId');
    return user_id ? api.users.getById(user_id) : undefined;
};

export const handleLogInSubmit = (email, password) => {
    const user = api.users.filter({ email, password })[0];
    if (!user) return false;
    localStorage.setItem('currentUserId', user.id);
    return true;
};
