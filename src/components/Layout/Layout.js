import styles from './Layout.module.scss';
import classNames from 'classnames/bind';

import Header from '../Header';
import Footer from '../Footer';

const cx = classNames.bind(styles);

function Layout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
