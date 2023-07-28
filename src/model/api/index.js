import data from '../data';

const BaseAPI = {
    all() {
        return this.querySet;
    },
    getById(id) {
        return this.querySet.find((element) => element.id === id);
    },
    hasProperty(prop) {
        if (this.querySet.length === 0 || !this.querySet[0].hasOwnProperty(prop)) return false;
        return true;
    },
    filter(props) {
        for (let key in props) {
            if (!this.hasProperty(key)) {
                throw new Error(`'${this.name}' object does not have '${key}' property`);
            }
        }

        return this.querySet.filter((element) => {
            for (let key in props) {
                if (element[key] !== props[key]) return false;
            }
            return true;
        });
    },
};

const UsersAPI = {
    name: 'Users',
    querySet: data.users,
};

Object.setPrototypeOf(UsersAPI, BaseAPI);

const LocationsAPI = {
    name: 'Locations',
    querySet: data.locations,
};

Object.setPrototypeOf(LocationsAPI, BaseAPI);

const SensorsAPI = {
    name: 'Sensors',
    querySet: data.sensors,
};

Object.setPrototypeOf(SensorsAPI, BaseAPI);

const EquipmentsAPI = {
    name: 'Equipments',
    querySet: data.equipments,
};

Object.setPrototypeOf(UsersAPI, BaseAPI);

const api = {
    users: UsersAPI,
    locations: LocationsAPI,
    sensors: SensorsAPI,
    equipments: EquipmentsAPI,
};

// export { UsersAPI, LocationsAPI, SensorsAPI, EquipmentsAPI };

export default api;
