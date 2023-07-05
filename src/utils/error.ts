export const ERROR_CODE = {
  DECRYPT: '0',
  CREATE_WALLET: '1',
};

export const ERROR_MESSAGE = {
  [ERROR_CODE.DECRYPT]: {
    message: 'Incorrect password.',
    desc: 'Incorrect password.',
  },
  [ERROR_CODE.CREATE_WALLET]: {
    message: 'Create wallet error.',
    desc: 'Create wallet error.',
  },
};

class SDKError extends Error {
  message: string;
  code: string;
  desc: string;
  constructor(code: string, desc?: string) {
    super();
    const _error = ERROR_MESSAGE[code];
    this.message = `${_error.message} (${code})` || '';
    this.code = code;
    this.desc = desc || _error?.desc;
  }
  getMessage() {
    return this.message;
  }
}

export const getErrorMessage = (error: unknown) => {
  let message = 'Something went wrong. Please try again later.';
  let desc = '';
  if (error instanceof SDKError) {
    message = error.getMessage();
    desc = error.desc + `(${error.code})`;
  } else if (error instanceof Error && error.message) {
    message = error.message;
    desc = error.message;
  }

  return {
    message: `${message}`,
    desc: `${desc}`,
  };
};

export default SDKError;
