import decode from 'jwt-decode';

class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if user is still logged in
    loggedIn() {
        // checks if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coersion to check if toek is NOT undefined and the token in NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reloads page to homepage
    login(idToken) {
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        localStorage.removeItem('id_token');

        window.location.assign('/');
    }
}

export default new AuthService();