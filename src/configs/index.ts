import { AppENV } from '@/enums/configs';

const ENVS = import.meta.env;

const APP_ENV: string = ENVS.VITE_MODE;
const isProduction = APP_ENV === AppENV.PRODUCTION;
const TEST_PASS_WORD = ENVS.VITE_TEST_PASS;

const CDN_URL = '';
const CDN_URL_ICONS = '';

export { APP_ENV, isProduction, CDN_URL_ICONS, CDN_URL, TEST_PASS_WORD };
