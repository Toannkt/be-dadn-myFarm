import classNames from 'classnames/bind';
import styles from './MyFarm.module.scss';

import { useContext, useState, useEffect } from 'react';

import * as icons from '../../icons';
import api from '../../model/api';
import GlobalContext from '../../context/GlobalContext';

const cx = classNames.bind(styles);

function MyFarm() {
    const { currentUser } = useContext(GlobalContext);
    const [showBox, setShowBox] = useState(false);
    const locationList = api.locations.querySet.filter((location) => location.user_id === currentUser.id);
    const [currentLocation, setCurrentLocation] = useState(locationList[0]);
    const sensorList = api.sensors.querySet.filter(
        (sensor) => sensor.user_id === currentUser.id && sensor.location_id === currentLocation.id,
    );
    const equipmentList = api.equipments.querySet.filter(
        (equipment) => equipment.user_id === currentUser.id && equipment.location_id === currentLocation.id,
    );

    const renderRowValue = (element, props) => {
        const arr = [];
        for (let prop of props) {
            let comp;
            if (prop === 'status' || prop === 'autoMode') {
                comp = (
                    <th key={prop}>
                        <label className={cx('switch')}>
                            <input type="checkbox" checked={element[prop] === 'ON'} onChange={() => {}} />
                            <span className={cx('slider')}></span>
                        </label>
                    </th>
                );
            } else {
                comp = <th key={prop}>{element[prop]}</th>;
            }
            arr.push(comp);
        }
        return arr;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('location-container')}>
                    <div className={cx('add-container')}>
                        <h1>Add location</h1>
                        <div className={cx('add-btn')}>
                            <icons.PlusIcon />
                        </div>
                    </div>
                    <div className={cx('location-list')}>
                        {locationList.map((location) => (
                            <div
                                key={location.id}
                                className={cx('location-item', {
                                    'location-active': location.id === currentLocation.id,
                                })}
                                onClick={() => setCurrentLocation(location)}
                            >
                                Location {location.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('thing-container')}>
                    <div className={cx('collection-container')}>
                        <div className={cx('add-container')}>
                            <h1>Add new sensor</h1>
                            <div className={cx('add-btn')}>
                                <icons.PlusIcon />
                            </div>
                        </div>
                        <div className={cx('table-container')}>
                            <table className={cx('thing-table')}>
                                <thead className={cx('table-heading')}>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Date add</th>
                                        <th>Status</th>
                                        <th>Min</th>
                                        <th>Max</th>
                                        <th>Statistical</th>
                                        <th>Edit</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className={cx('table-body')}>
                                    {sensorList.map((sensor, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                {renderRowValue(sensor, ['name', 'addDate', 'status', 'min', 'max'])}
                                                <th>
                                                    <button className={cx('watch-btn')}>Watch</button>
                                                </th>
                                                <th>
                                                    <icons.EditIcon />
                                                </th>
                                                <th onClick={() => setShowBox(true)}>
                                                    <icons.TrashIcon />
                                                </th>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={cx('collection-container')}>
                        <div className={cx('add-container')}>
                            <h1>Add new equipment</h1>
                            <div className={cx('add-btn')}>
                                <icons.PlusIcon />
                            </div>
                        </div>
                        <div className={cx('table-container')}>
                            <table className={cx('thing-table')}>
                                <thead className={cx('table-heading')}>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Date add</th>
                                        <th>Status</th>
                                        <th>Auto mode</th>
                                        <th>Statistical</th>
                                        <th>Edit</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className={cx('table-body')}>
                                    {equipmentList.map((equipment, index) => {
                                        return (
                                            <tr key={index} className={cx('table-row')}>
                                                <th>{index + 1}</th>
                                                {renderRowValue(equipment, ['name', 'addDate', 'status', 'autoMode'])}
                                                <th>
                                                    <button className={cx('watch-btn')}>Watch</button>
                                                </th>
                                                <th>
                                                    <icons.EditIcon />
                                                </th>
                                                <th onClick={() => setShowBox(true)}>
                                                    <icons.TrashIcon />
                                                </th>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showBox && (
                <div className={cx('box')}>
                    <div className={cx('delete-validation')}>
                        <div className={cx('close-btn-container')}>
                            <div className={cx('close-btn')} onClick={() => setShowBox(false)}>
                                <icons.XmarkIcon />
                            </div>
                        </div>
                        <div className={cx('warning')}>
                            <div className={cx('close-icon-container')}>
                                <div className={cx('close-icon')}>
                                    <icons.XmarkIcon width="4rem" height="4rem" />
                                </div>
                            </div>
                            <div className={cx('content')}>
                                <h3>Are you sure you want to delete?</h3>
                                <p>Your infomation still can be recover</p>
                            </div>
                        </div>
                        <div className={cx('actions')}>
                            <button style={{ backgroundColor: 'rgba(223, 41, 16, 0.94)' }} className={cx('action-btn')}>
                                Delete
                            </button>
                            <button
                                onClick={() => setShowBox(false)}
                                style={{ backgroundColor: '#059669' }}
                                className={cx('action-btn')}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyFarm;
