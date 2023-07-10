import { AppENV } from '@/enums/configs';

const ENVS = import.meta.env;

const APP_ENV: string = ENVS.VITE_MODE;
const isProduction = APP_ENV === AppENV.PRODUCTION;
const TEST_PASS_WORD = ENVS.VITE_TEST_PASS;
const GG_RECAPTCHA_SITE = ENVS.VITE_GG_RECAPTCHA_SITE;

const CDN_URL = 'https://cdn.trustlesswallet.io';
const CDN_URL_ICONS = CDN_URL + '/wallet-icons';

const TC_NETWORK = {
  RPC: isProduction ? 'https://node.l2.trustless.computer/' : 'https://l2-node.regtest.trustless.computer/',
  CHAIN: isProduction ? 42213 : 42070,
  Name: isProduction ? 'NOS' : 'NOS (Test)',
};

const CONTRACT_ADDRESS = isProduction
  ? '0x3471f367ee30029124Aa5d6F4A58cCb21CAF760f'
  : '0x7Be083a722c428e6FF42c891a4315436609D6cc1';

const SLEEP_TIME = 500;
const COUNTER_TIME = 500;

const TOPUP_AMOUNT = 0.03 * 1e18;
const MIN_AMOUNT = 0.003 * 1e18;

const NUMBER_COLUMN = 15;

const GAS_PRICE = 21 * 1e9;

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
  GG_RECAPTCHA_SITE,
  GAS_PRICE,
};
