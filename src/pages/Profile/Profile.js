import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import { useContext, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import femaleImage from '../../assets/images/female.jpg';
import maleImage from '../../assets/images/male.jpg';

const cx = classNames.bind(styles);

function Profile() {
    const { currentUser } = useContext(GlobalContext);
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
    const [address, setAddress] = useState(currentUser.address);

    //********Can xu ly*********
    const handleInfoChange = () => {};

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
                <form className={cx('info-container')} onSubmit={handleInfoChange}>
                    <h1 className={cx('title')}>My Profile</h1>
                    <div className={cx('info-item')}>
                        <label htmlFor="firstName" className={cx('label')}>
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('info-item')}>
                        <label htmlFor="lastName" className={cx('label')}>
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('info-item')}>
                        <label htmlFor="email" className={cx('label')}>
                            Email
                        </label>
                        <input className={cx('disabled')} id="email" disabled value={currentUser.email} />
                    </div>
                    <div className={cx('info-item')}>
                        <label htmlFor="phone" className={cx('label')}>
                            Phone number
                        </label>
                        <input
                            id="phone"
                            value={phoneNumber}
                            required
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('info-item')}>
                        <label htmlFor="address" className={cx('label')}>
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('info-item')}>
                        <label htmlFor="farm" className={cx('label')}>
                            Farm
                        </label>
                        <input className={cx('disabled')} id="farm" disabled value={currentUser.farm} />
                    </div>
                    <button className={cx('btn')}>Save Change</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
