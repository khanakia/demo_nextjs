import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import isBlank from 'packages/string-fns/isBlank';

export function getLoginUrl(redirect? : string): string {
	if(isBlank(redirect)) redirect='/profile'

	const url = `${process.env.NEXT_PUBLIC_DOMAIN}/auth/login?redirect=${redirect}`
	return url
}

export function getTokenName(): string {
	return process.env.NEXT_PUBLIC_COOKIE_TOKEN_NAME || "pttoken"
}

export function getToken(): string | undefined {
	return Cookies.get(getTokenName());
}

// export function login(token = null) {
// 	if (!token) return 'Cannot Login';
// 	Cookies.set(getTokenName(), token);
// }

export function getTokenDecoded(): any {
	var token = getToken();
	if (!token) return {};
	const decoded = jwtDecode(token);
	return decoded;
}

export function isTokenExpired(): boolean {
	const decoded = getTokenDecoded();
	if (!decoded) return true;
	if (Date.now() <= decoded.exp * 1000) {
		return false;
	} else {
		return true;
	}
}

export function getTokenExpirationDate() {
	const decoded = getTokenDecoded();
	if (!decoded) return null;
	return new Date(decoded.exp * 1000);
}

// do not call this function anywhere that is supposed to use only in useAuth hook.
export function isLoggedIn(): boolean {
	if (getToken() && !isTokenExpired()) return true;
	return false;
}

// export function logout() {
// 	Cookies.remove(getTokenName());
// }

export function getUserID() {
	const data = getTokenDecoded();
	return data.sub;
}

export function getUserEmail(): string {
	const data = getTokenDecoded();
	return data.email;
}

