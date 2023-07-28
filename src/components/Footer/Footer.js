import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import image2 from '../../assets/images/anh2.png';
import * as icons from '../../icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', 'above-content')}>
                <div className={cx('container')}>
                    <img className={cx('image')} src={image2} alt="anh2" />
                    <h1 className={cx('title')}>MYFARM</h1>
                </div>
                <p className={cx('info')}>EMAIL: toan.nguyenkhactoan432@hcmut.edu.vn</p>
                <p className={cx('info')}>Phone number: 0353846079</p>
            </div>
            <div className={cx('below-content')}>
                <p className={cx('license')}>© 2023. Design by Group</p>
                <div className={cx('icon-list')}>
                    <icons.FacebookIcon className={cx('icon-item')} />
                    <icons.YoutubeIcon className={cx('icon-item')} />
                    <icons.InstagramIcon className={cx('icon-item')} />
                    <icons.ShoppingCartIcon className={cx('icon-item')} />
                    <icons.CallIcon className={cx('icon-item')} />
                </div>
            </div>
        </div>
    );
}

export default Footer;
