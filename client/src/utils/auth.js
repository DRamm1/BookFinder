
/* Importing the decode function from the decode library. */
import decode from 'decode';


/* The AuthService class provides a method to sign in, sign out, and check if the user is signed in */
class AuthService {
  FindProfile() {
    return decode(this.getToken());
  }

  SignIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  SignIn(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  SignOut() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

/* Exporting the AuthService class as a default export. */
export default new AuthService();