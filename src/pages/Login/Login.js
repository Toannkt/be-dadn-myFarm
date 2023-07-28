import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState } from 'react';

import * as icons from '../../icons';
import image from '../../assets/images/image.png';
import { handleLogInSubmit } from '../../controller';

const cx = classNames.bind(styles);

function Login() {
    const [isForget, setIsForget] = useState(false);
    const [failLogin, setFailLogin] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleToggleEye = () => {
        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
    };

    const renderLoginForm = () => {
        return (
            <form
                className={cx('form')}
                onSubmit={(e) => {
                    const isSuccess = handleLogInSubmit(email, password);
                    if (!isSuccess) {
                        setFailLogin(true);
                        e.preventDefault();
                    }
                }}
            >
                <h1 className={cx('heading')}> LOGIN </h1>
                <div className={cx('input-field')}>
                    <div className={cx('icon')}>
                        <icons.MailIcon />
                    </div>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cx('input')}
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className={cx('input-field')}>
                    <div className={cx('icon')}>
                        <icons.LockIcon />
                    </div>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={cx('input')}
                        type={inputType}
                        placeholder="Password"
                        required
                    />
                    <div className={cx('eye-icon')} onClick={handleToggleEye}>
                        {inputType === 'password' ? <icons.SlashEyeIcon /> : <icons.EyeIcon />}
                    </div>
                </div>

                {failLogin && (
                    <div className={cx('login-fail')}>
                        <icons.WarningIcon />
                        <p className={cx('warning-content')}>Make sure you type your email and password correctly.</p>
                    </div>
                )}

                <div className={cx('remember-container')}>
                    <input className={cx('checkbox')} type="checkbox" />
                    <p> Remember Me </p>
                </div>
                <h3 className={cx('forget')} onClick={() => setIsForget(true)}>
                    Forget Password ?
                </h3>
                <button className={cx('btn')}>Login</button>
            </form>
        );
    };

    const renderForgetForm = () => {
        return (
            <form
                className={cx('form')}
                onSubmit={(e) => {
                    alert('Please check your email to get new password!!!');
                    setIsForget(false);

                    e.preventDefault();
                }}
            >
                <h1 className={cx('heading')}>
                    Forgot Password
                    <div className={cx('back-btn')} onClick={() => setIsForget(false)}>
                        <icons.ArrowLeftIcon />
                    </div>
                </h1>
                <div className={cx('input-field')}>
                    <div className={cx('icon')}>
                        <icons.MailIcon />
                    </div>
                    <input className={cx('input')} type="email" placeholder="Enter your email" required />
                </div>
                <button className={cx('btn')}> Send new password to email </button>
            </form>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {!isForget ? renderLoginForm() : renderForgetForm()}
                <div className={cx('image-container')}>
                    <h1 className={cx('title')}>
                        Vì nền nông nghiệp thông minh - Hướng tới tương lai bền vững, tối ưu hóa nguồn tài nguyên và
                        nâng cao năng suất.
                    </h1>
                    <p className={cx('content')}>
                        Chào mừng đến với Nông trại Thông minh, nơi mang đến một tương lai khả quan.Với sự kết hợp của
                        Internet of Things và quản lý thông minh, chúng tôi mang đến các cách làm nông nghiệp tiên tiến,
                        có khả năng tối ưu hóa năng suất và bảo vệ môi trường.Hãy cùng nhau trải qua cuộc cách mạng về
                        nông nghiệp, mang đến thực phẩm có chất lượng và có đóng góp to lớn cho sự phát triển bền vững
                        của Trái đất.
                    </p>
                    <img className={cx('image')} src={image} alt="anh" />
                </div>
            </div>
        </div>
    );
}

export default Login;
