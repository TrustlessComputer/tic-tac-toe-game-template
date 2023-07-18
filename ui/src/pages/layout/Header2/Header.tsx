import SvgInset from '@/components/SvgInset';
import { CDN_URL } from '@/configs';
import { TOP_MENU_LEFT } from '@/constants/header';
import { ROUTE_PATH } from '@/constants/route-path';
import useWindowSizes from '@/hooks/useWindowSizes';
import cs from 'classnames';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonWalletConnectL2 from '../WalletConnectL2';
import s from './styles.module.scss';
// import { useAppDispatch } from '@/state/hooks';
import MobileMenu from '../MobileMenu';

const Header = ({
  isHideMenu,
  isWallet,
  subHeader,
  isLight,
  isGame,
}: {
  isHideMenu?: boolean;
  isWallet?: boolean;
  subHeader?: React.ReactNode;
  isLight?: boolean;
  isGame?: boolean;
}) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { xSMobileScreen } = useWindowSizes();
  const router: any = {};

  const activePath = router?.pathname?.split('/')[1];

  const onOpenMobileMenu = () => {
    setOpenMobileMenu(true);
  };

  const onCloseMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cs(s.container, {
        [`${s.container__light}`]: isLight,
        [`${s.container__dark}`]: !isLight && !isGame,
        [`${s.container__game}`]: isGame && scrollPosition > 20,
      })}
    >
      <header className={`${s.header}`}>
        <a
          className={cs(s.navbarBrand, {
            [`${s.navbarBrand__light}`]: isLight,
          })}
          href={ROUTE_PATH.HOME}
        >
          NBC
        </a>
        <div
          className={cs(s.leftContent, {
            [`${s.leftContent__light}`]: isLight,
          })}
        >
          {!isHideMenu && (
            <div className={s.leftMenu}>
              <ul className={cs(s.navBar)}>
                {TOP_MENU_LEFT.map(menu => {
                  return (
                    <li className={s.navItem} key={`header-${menu.activePath}`}>
                      <a
                        className={cs(s.navLink, {
                          [`${s.navLink__active}`]: activePath === menu.activePath,
                          [`${s.navLink__builder}`]: menu.activePath === 'builder',
                        })}
                        href={menu.route}
                      >
                        {menu.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div
          className={cs(s.rightContent, {
            [`${s.rightContent__light}`]: isLight,
          })}
        >
          <div className={s.rightMenu}>
            <ul className={s.navBarRight}>
              <li className={s.navItem}>
                <Link
                  className={cs(s.navLink, {
                    [`${s.navLink__active}`]: activePath === 'story',
                  })}
                  to={`${ROUTE_PATH.STORY}`}
                >
                  Our Story
                </Link>
              </li>
              {!xSMobileScreen && (
                <div
                  className={cs(s.socialShare, {
                    [`${s.socialShare__light}`]: isLight,
                  })}
                >
                  <a className={s.link} href={'https://discord.gg/yNbatuGMDG'} target="_blank">
                    <SvgInset size={20} svgUrl={`${CDN_URL}/icons/ic-discord-18x18.svg`} />
                  </a>
                  <a className={s.link} href={'https://twitter.com/NewBitcoinCity'} target="_blank">
                    <SvgInset size={20} svgUrl={`${CDN_URL}/icons/ic-twitter-18x18.svg`} />
                  </a>
                </div>
              )}
              {isWallet && <ButtonWalletConnectL2 isLight={isLight} />}

              <li className={s.mobileMenuBtn}>
                <button onClick={onOpenMobileMenu}>
                  <img src={`${CDN_URL}/icons/${isLight ? 'menu-ic-24' : 'menu-ic-24-white'}.svg`} alt="menu-ic" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={openMobileMenu} onClose={onCloseMobileMenu} />
      {subHeader && subHeader}
    </div>
  );
};

export default Header;
