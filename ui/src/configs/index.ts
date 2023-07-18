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

const CONTRACT_ADDRESS = isProduction
  ? '0x037B7eB2B5c795Ad7E20670A792934a3DCa4b829'
  : '0x9f60A29621f5Eb8B07F8dD96069933CAAff42361';

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
};
