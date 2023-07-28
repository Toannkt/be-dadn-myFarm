import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink, Link, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import config from '../../config';
import logo from '../../assets/images/logo.png';
import * as icons from '../../icons';
import GlobalContext from '../../context/GlobalContext';

const cx = classNames.bind(styles);

function Header() {
    const { currentUser, setCurrentUser } = useContext(GlobalContext);
    const [show, setShow] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo-container')}>
                <img className={cx('logo')} src={logo} alt="logo-img" />
            </Link>
            <div className={cx('navigations')}>
                {currentUser ? (
                    <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={config.routes.myfarm}>
                        My Farm
                    </NavLink>
                ) : (
                    <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={config.routes.home}>
                        Home
                    </NavLink>
                )}
                <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={config.routes.about}>
                    About Us
                </NavLink>
                <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={config.routes.contact}>
                    Contact
                </NavLink>
            </div>
            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <p className={cx('hello')}> {`Hello, ${currentUser.firstName}`} </p>
                        <Tippy
                            visible={show}
                            placement="bottom-end"
                            interactive
                            onClickOutside={() => setShow(false)}
                            offset={[12, 8]}
                            render={(attrs) => (
                                <div className={cx('menu-box')} tabIndex="-1" {...attrs}>
                                    <NavLink
                                        onClick={() => setShow(false)}
                                        to={config.routes.profile}
                                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                                    >
                                        <div className={cx('icon-item')}>
                                            <icons.AccountIcon />
                                        </div>
                                        <p className={cx('text-item')}> My Profile </p>
                                    </NavLink>
                                    <NavLink
                                        onClick={() => setShow(false)}
                                        to={config.routes.changepassword}
                                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                                    >
                                        <div className={cx('icon-item')}>
                                            <icons.SettingIcon />
                                        </div>
                                        <p className={cx('text-item')}> Change Password </p>
                                    </NavLink>
                                    <div
                                        className={cx('menu-item')}
                                        onClick={() => {
                                            setCurrentUser(undefined);
                                            localStorage.removeItem('currentUserId');
                                        }}
                                    >
                                        <div className={cx('icon-item')}>
                                            <icons.LogOutIcon />
                                        </div>
                                        <p className={cx('text-item')}> Log Out </p>
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('icon')} onClick={() => setShow(!show)}>
                                <icons.UserIcon width="3rem" height="3rem" />
                            </div>
                        </Tippy>
                    </>
                ) : (
                    <NavLink className={(nav) => cx('login-btn', { btnActive: nav.isActive })} to={config.routes.login}>
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
}

export default Header;
