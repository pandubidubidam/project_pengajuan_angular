import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export const credential = {
    storage: {
        set: (key: string, data: any) => {
            localStorage.setItem(key, lockdata.encrypt(data));
        },
        get: (key: string) => {
            return lockdata.decrypt(localStorage.getItem(key));
        },
        delete: (key?: string) => {
            if (!key) localStorage.clear();
            else localStorage.removeItem(key)
        }
    }
}

export let lockdata = {
    encrypt: (d: any) => {
        if (!d) return d;
        return CryptoJS.AES.encrypt(d, environment.SECRET_KEY).toString();
    },
    decrypt: (d: any) => {
        if (!d) return d;
        try {
            return CryptoJS.AES.decrypt(d, environment.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Error while decrypting data:", error);
            return null;
        }
    }
}

export const authorized = {
    check: (d: any) => {
        let authUser = JSON.parse((credential.storage.get(d) == null) ? '{}' : credential.storage.get(d));
        if(Object.keys(authUser).length == 0) {
            return false;
        }else {
            return true;
        }
    }
}