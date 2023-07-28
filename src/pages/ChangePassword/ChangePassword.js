import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';

import { useContext, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import femaleImage from '../../assets/images/female.jpg';
import maleImage from '../../assets/images/male.jpg';
import * as icons from '../../icons';

const cx = classNames.bind(styles);

function Profile() {
    const { currentUser } = useContext(GlobalContext);
    const [newPassword_1, setNewPassword_1] = useState('');
    const [newPassword_2, setNewPassword_2] = useState('');
    const [type_1, setType_1] = useState('password');
    const [type_2, setType_2] = useState('password');
    const [type_3, setType_3] = useState('password');

    const [warningContent, setWarningContent] = useState();

    //********Can xu ly*********
    const handlePasswordChange = (e) => {
        if (currentUser.password === newPassword_1) {
            setWarningContent('New password must be different from old password!!!');
            e.preventDefault();
        } else {
            if (newPassword_1 !== newPassword_2) {
                setWarningContent('Password incorrect!!!');
                e.preventDefault();
            } else {
                alert('Change password successfully!!!');
                //****Xy ly sau********
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('image-container')}>
                    <img
                        className={cx('image')}
                        src={currentUser.gender === 'male' ? maleImage : femaleImage}
                        alt="farmer"
                    />
                    <h3 className={cx('name-heading')}>
                        {currentUser.firstName} {currentUser.lastName}
                    </h3>
                </div>
                <form className={cx('info-password')} onSubmit={handlePasswordChange}>
                    <h1 className={cx('title')}> Change Password </h1>
                    <div className={cx('info-item')}>
                        <label className={cx('label')}>Current Password</label>
                        <div className={cx('field', 'disabled')}>
                            <input className={cx('input')} type={type_1} value={currentUser.password} disabled />
                            <div
                                className={cx('eye-icon')}
                                onClick={() => {
                                    if (type_1 === 'password') {
                                        setType_1('text');
                                    } else {
                                        setType_1('password');
                                    }
                                }}
                            >
                                {type_1 === 'password' ? <icons.SlashEyeIcon /> : <icons.EyeIcon />}
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-item')}>
                        <label htmlFor="new_1" className={cx('label')}>
                            New Password
                        </label>
                        <div className={cx('field')}>
                            <input
                                className={cx('input')}
                                id="new_1"
                                type={type_2}
                                required
                                value={newPassword_1}
                                onChange={(e) => {
                                    setNewPassword_1(e.target.value);
                                }}
                            />
                            <div
                                className={cx('eye-icon')}
                                onClick={() => {
                                    if (type_2 === 'password') {
                                        setType_2('text');
                                    } else {
                                        setType_2('password');
                                    }
                                }}
                            >
                                {type_2 === 'password' ? <icons.SlashEyeIcon /> : <icons.EyeIcon />}
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-item')}>
                        <label htmlFor="new_2" className={cx('label')}>
                            Retype Password
                        </label>

                        <div className={cx('field')}>
                            <input
                                className={cx('input')}
                                id="new_2"
                                type={type_3}
                                required
                                value={newPassword_2}
                                onChange={(e) => {
                                    setNewPassword_2(e.target.value);
                                }}
                            />
                            <div
                                className={cx('eye-icon')}
                                onClick={() => {
                                    if (type_3 === 'password') {
                                        setType_3('text');
                                    } else {
                                        setType_3('password');
                                    }
                                }}
                            >
                                {type_3 === 'password' ? <icons.SlashEyeIcon /> : <icons.EyeIcon />}
                            </div>
                        </div>
                    </div>

                    {warningContent && (
                        <div className={cx('change-fail')}>
                            <icons.WarningIcon />
                            <p className={cx('warning-content')}>{warningContent}</p>
                        </div>
                    )}

                    <button className={cx('btn')}> Save Change </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
