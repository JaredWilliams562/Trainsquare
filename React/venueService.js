import axios from 'axios';
import _logger from '../components/venues/Venues';
import * as helper from './serviceHelpers';

const endpoint = `${helper.API_HOST_PREFIX}/api/venues`;

const getById = (id) => {
    _logger('Venue id is', id);
    const config = {
        method: 'GET',
        url: `${endpoint}/${id}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then((response) => {
        return response.data.item;
    });
};

const getAll = () => {
    const config = {
        method: 'GET',
        url: endpoint,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getAllPaginated = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const create = (payload) => {
    const config = {
        method: 'POST',
        url: endpoint,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config);
};

const update = (id, payload) => {
    _logger('updated venue', payload, id);
    const config = {
        method: 'PUT',
        url: `${endpoint}/${id}`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config)
        .then(() => {
            return { ...payload, id };
        })
        .catch(helper.onGlobalError);
};

const deleteById = (id) => {
    const config = {
        method: 'DELETE',
        url: `${endpoint}/${id}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config);
};

const getByCreatedBy = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate?createdBy=1&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const venuesServ = { getById, getAll, create, update, deleteById, getByCreatedBy, getAllPaginated };

export default venuesServ;
