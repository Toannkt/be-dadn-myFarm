import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

import Info from '../../components/Info';

import mapImage from '../../assets/images/map.png';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content-container')}>
                    <h1 className={cx('heading')}> Contact </h1>
                    <form className={cx('form')}>
                        <input className={cx('input-field')} type="text" placeholder="Title" required />
                        <input className={cx('input-field')} type="text" placeholder="Your phone number" required />
                        <textarea
                            className={cx('text-area')}
                            rows="10"
                            cols="50"
                            required
                            defaultValue="Hiện tại thiết bị A tại vị trí LA đang gặp trục trặc, thiết bị C không hoạt động mua thêm thiết bị, ..."
                        ></textarea>
                        <button className={cx('submit-btn')}> submit </button>
                    </form>
                    <div className={cx('info')}>
                        <Info />
                    </div>
                </div>
                <div className={cx('image-container')}>
                    <img className={cx('img')} src={mapImage} alt="map" />
                    <div className={cx('shape')}></div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
