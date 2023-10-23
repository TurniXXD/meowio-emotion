import Cookies from 'js-cookie';
import { create } from 'zustand';

export enum EnumCookies {
  Auth = 'auth',
}

interface CookieStore {
  cookies: Record<EnumCookies, string | undefined>;
  setCookie: (
    name: EnumCookies,
    value: string,
    options?: Cookies.CookieAttributes
  ) => void;
  removeCookie: (name: EnumCookies) => void;
}

const useCookieStore = create<CookieStore>((set) => ({
  cookies: {
    [EnumCookies.Auth]: Cookies.get(EnumCookies.Auth),
  },
  setCookie: (name, value, options = {}) => {
    Cookies.set(name, value, options);
    set((state) => ({
      cookies: { ...state.cookies, [name]: value },
    }));
  },
  removeCookie: (name) => {
    Cookies.remove(name);
    set((state) => ({
      cookies: { ...state.cookies, [name]: undefined },
    }));
  },
}));

export default useCookieStore;
