import classNames from 'classnames/bind';
import styles from './Info.module.scss';

import * as icons from '../../icons';

const cx = classNames.bind(styles);

function Info() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info-item')}>
                <icons.OtherCallIcon className={cx('icon')} />
                <div className={cx('info-text')}>
                    <h3 className={cx('info-heading')}> Phone </h3> <p className={cx('info-value')}> 0353846079 </p>
                </div>
            </div>
            <div className={cx('info-item')}>
                <icons.EmailIcon className={cx('icon')} />
                <div className={cx('info-text')}>
                    <h3 className={cx('info-heading')}> Email </h3>
                    <p className={cx('info-value')} style={{ color: '#DD5471' }}>
                        toan.nguyenkhactoan432 @gmail.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Info;
