export const ERROR_CODE = {
  DECRYPT: '0',
  CREATE_WALLET: '1',
  JOIN_GAME_ERROR: '2',
  TIME_OUT: '3',
  CANCEL_MATCH_ERROR: '4',
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
  [ERROR_CODE.JOIN_GAME_ERROR]: {
    message: 'Join game error.',
    desc: 'Join game error.',
  },
  [ERROR_CODE.TIME_OUT]: {
    message: 'Time out.',
    desc: 'Time out.',
  },
  [ERROR_CODE.CANCEL_MATCH_ERROR]: {
    message: 'Cancel match error.',
    desc: 'Cancel match error.',
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
