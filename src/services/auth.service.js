import api from "./api.js";


class AuthService {


    login(user) {
        return api
            .post( 'auth/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return api.post('auth/register', {
            name: user.username,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        });
    }
}

export default new AuthService();