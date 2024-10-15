import axios from 'axios';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import { config } from './config/ConfigContext';

export const createUrl = (relativeUrl) => {
  const { API_URL } = config;
  return `${API_URL}/${relativeUrl}`;
}

export const convertCase = (obj, newCase='camelCase') => {
  let caseFunc = null;
  if (newCase === 'camelCase') {
    caseFunc = camelCase;
  } else if (newCase === 'snakeCase') {
    caseFunc = snakeCase;
  } else {
    return obj;
  }
  const keys = Object.keys(obj);
  const newCaseObj = {};
  keys.forEach(key => {
    const newKey = caseFunc(key);
    newCaseObj[newKey] = convertCaseObject(obj[key], newCase);
  });
  return newCaseObj;
};
  
export const convertCaseObject = (obj, newCase='camelCase') => {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      const newArray = [];
      obj.forEach(element => {
        newArray.push(convertCaseObject(element, newCase));
      });
      return newArray;
    } else {
      return convertCase(obj, newCase);
    }
  }
  return obj;
};
  
export const snakeCaseObject = (obj) => {
  return convertCaseObject(obj, 'snakeCase');
};
  
export const camelCaseObject = (obj) => {
  return convertCaseObject(obj, 'camelCase');
};  

export const sendGetRequest = (url, params=null) => {
  if (params) {
    return axios.get(url, {params});
  }
  return axios.get(url);
};
  
export const sendPostRequest = (url, data) => {
  return axios.post(url, data);
};
