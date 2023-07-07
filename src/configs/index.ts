import { AppENV } from '@/enums/configs';

const ENVS = import.meta.env;

const APP_ENV: string = ENVS.VITE_MODE;
const isProduction = APP_ENV === AppENV.PRODUCTION;
const TEST_PASS_WORD = ENVS.VITE_TEST_PASS;

const CDN_URL = 'https://cdn.trustlesswallet.io';
const CDN_URL_ICONS = CDN_URL + '/wallet-icons';

const TC_NETWORK = {
  RPC: isProduction ? 'https://node.l2.trustless.computer/' : 'https://l2-node.regtest.trustless.computer/',
  CHAIN: isProduction ? 42213 : 42070,
  Name: isProduction ? 'NOS' : 'NOS (Test)',
};

const CONTRACT_ADDRESS = isProduction
  ? '0xE56fe77d7a69a9c633c2Bb71D6cE0807cC7452CA'
  : '0xca60017F0b969c6046B87fF3CF348145a3B13587';

const SLEEP_TIME = 500;
const COUNTER_TIME = 500;

const TOPUP_AMOUNT = 0.05 * 1e18;
const MIN_AMOUNT = 0.01 * 1e18;

const NUMBER_COLUMN = 15;

export {
  APP_ENV,
  isProduction,
  CDN_URL_ICONS,
  CDN_URL,
  TEST_PASS_WORD,
  TC_NETWORK,
  CONTRACT_ADDRESS,
  SLEEP_TIME,
  COUNTER_TIME,
  TOPUP_AMOUNT,
  NUMBER_COLUMN,
  MIN_AMOUNT,
};
