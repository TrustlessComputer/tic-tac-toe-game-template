import { AppENV } from '@/enums/configs';

const ENVS = import.meta.env;

const APP_ENV: string = ENVS.VITE_MODE;
const isProduction = APP_ENV === AppENV.PRODUCTION;
const TEST_PASS_WORD = ENVS.VITE_TEST_PASS;
const GG_RECAPTCHA_SITE = ENVS.VITE_GG_RECAPTCHA_SITE;

const CDN_URL = 'https://cdn.trustlesswallet.io';
const CDN_URL_ICONS = CDN_URL + '/wallet-icons';
const CDN_ICONS = CDN_URL + '/nbc/icons';

const TC_NETWORK = {
  RPC: isProduction ? 'https://node.l2.trustless.computer/' : 'https://l2-node.regtest.trustless.computer/',
  CHAIN: isProduction ? 42213 : 42070,
  Name: isProduction ? 'NOS' : 'NOS (Test)',
};

const PARENT_PATH = isProduction ? 'https://alpha.dev.newbitcoincity.com/' : 'https://alpha.dev.newbitcoincity.com/';

const CONTRACT_ADDRESS = isProduction
  ? '0x5c194B1a58B60354969752628b86eee4617F17F3'
  : '0x5c194B1a58B60354969752628b86eee4617F17F3';
const CONTRACT_ERC_20 = isProduction
  ? '0x1d45c32C97707C916b350042CEAC2164fb6D00A1'
  : '0x1d45c32C97707C916b350042CEAC2164fb6D00A1';

const SLEEP_TIME = 500;
const COUNTER_TIME = 500;

const TOPUP_AMOUNT = 0.00324 * 1e18;
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
  CDN_ICONS,
  PARENT_PATH,
  CONTRACT_ERC_20,
};
