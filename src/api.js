import axios from 'axios';
import { origin } from './config';
axios.defaults.withCredentials = true;

export const getApiCategories = async () => {
  return axios
    .get(
      origin + '/Categories',
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

/* Professional skills */

export const getApiProfSkill = async () => {
  return axios
    .get(
      origin + '/professional-skills',
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getApiProfSkillByID = async (id) => {
  return axios
    .get(
      origin + '/professional-skills/' + id,
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};

export const getLoggedClient = async () => {
  
}
