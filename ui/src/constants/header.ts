import { ROUTE_PATH } from '@/constants/route-path';

export const TOP_MENU_LEFT = [
  {
    name: 'GameFi',
    route: ROUTE_PATH.GAMEFI,
    activePath: 'gamefi',
  },
  {
    name: 'DeFi',
    route: ROUTE_PATH.DEFI,
    activePath: 'defi',
  },
  {
    name: 'NFTs',
    route: ROUTE_PATH.NFTS,
    activePath: 'nfts',
  },
  {
    name: 'GM & Souls',
    route: ROUTE_PATH.GM_SOULS,
    activePath: 'souls',
  },
  {
    name: 'Builders',
    route: ROUTE_PATH.BUILDER,
    activePath: 'builder',
  },
];

export const ACTIVE_PATH_WALLET_LAYER2 = ['gamefi', 'topup'];

export const MENU_MOBILE = [...TOP_MENU_LEFT];
