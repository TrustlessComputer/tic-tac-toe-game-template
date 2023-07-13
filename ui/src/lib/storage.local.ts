export class StorageService {
  private _getKey = (key: string) => key;

  getCustomKey(prefix: string, suffix: string) {
    return `${prefix}-${suffix}`;
  }

  set(key: string, data: unknown) {
    const _key = this._getKey(key);
    return localStorage.setItem(_key, data as any);
  }

  get(key: string) {
    const _key = this._getKey(key);
    const dataStr = localStorage.getItem(_key);
    if (dataStr && isJsonString(dataStr)) {
      return JSON.parse(dataStr);
    } else {
      return dataStr;
    }
  }

  remove(key: string) {
    const _key = this._getKey(key);
    return localStorage.removeItem(_key);
  }

  allKeys = (): string[] => {
    return Object.keys(localStorage);
  };

  removeKeys = (key: string) => {
    const keys = this.allKeys();
    keys.forEach(_key => {
      if (_key.toLowerCase().includes(key.toLowerCase())) {
        this.remove(_key);
      }
    });
  };

  removeAll = () => {
    localStorage.clear();
  };
}

function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const storageLocal = new StorageService();

export default storageLocal;
