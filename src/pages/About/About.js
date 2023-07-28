import classNames from 'classnames/bind';
import styles from './About.module.scss';

import Info from '../../components/Info';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-container')}>
                <h1 className={cx('title')}>
                    Vì nền nông nghiệp thông minh - Hướng tới tương lai bền vững, tối ưu hóa nguồn tài nguyên và nâng
                    cao năng suất.
                </h1>
                <p className={cx('body')}>
                    Chào mừng đến với Nông trại Thông minh, nơi mang đến một tương lai khả quan.Với sự kết hợp của
                    Internet of Things và quản lý thông minh, chúng tôi mang đến các cách làm nông nghiệp tiên tiến, có
                    khả năng tối ưu hóa năng suất và bảo vệ môi trường.Hãy cùng nhau trải qua cuộc cách mạng về nông
                    nghiệp, mang đến thực phẩm có chất lượng và có đóng góp to lớn cho sự phát triển bền vững của Trái
                    đất.
                </p>

                <div className={cx('info')}>
                    <Info />
                </div>
            </div>
        </div>
    );
}

export default About;
