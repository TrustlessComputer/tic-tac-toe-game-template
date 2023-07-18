import SvgInset from '@/components/SvgInset';
import { CDN_URL } from '@/configs';
import { MENU_MOBILE } from '@/constants/header';
import { ROUTE_PATH } from '@/constants/route-path';
import cs from 'classnames';
import React from 'react';
import s from './styles.module.scss';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<IProps> = ({ isOpen, onClose }): React.ReactElement => {
  // const router = useRouter();
  const router: any = {};
  const activePath = router?.pathname?.split('/')[1];

  return (
    <div
      className={cs(s.mobileMenu, {
        [`${s.mobileMenu__show}`]: isOpen,
      })}
    >
      <div className={s.menuHeader}>
        <button onClick={onClose}>
          <img src={`${CDN_URL}/icons/close-menu-ic-24.svg`} alt="close-menu-ic" />
        </button>
      </div>
      <div className={s.menuList}>
        <ul className={s.navBar}>
          {MENU_MOBILE.map(menu => {
            return (
              <li className={s.navItem} key={`header-${menu.activePath}`}>
                <a
                  className={cs(s.navLink, {
                    [`${s.navLink__active}`]: activePath === menu.activePath,
                    [`${s.navLink__builder}`]: menu.route === ROUTE_PATH.PIONEERS,
                  })}
                  href={menu.route}
                >
                  {menu.name}
                </a>
              </li>
            );
          })}

          <div className={s.socialShare}>
            <a className={s.navSocial} href={'https://discord.gg/yNbatuGMDG'} target="_blank">
              <SvgInset size={24} svgUrl={`${CDN_URL}/icons/ic-discord-18x18.svg`} />
            </a>
            <a className={s.navSocial} href={'https://twitter.com/NewBitcoinCity'} target="_blank">
              <SvgInset size={24} svgUrl={`${CDN_URL}/icons/ic-twitter-18x18.svg`} />
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
