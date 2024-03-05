import axios, { AxiosRequestConfig } from 'axios';
import fetchAdapter from "@haverstack/axios-fetch-adapter";

import { wikiError } from './errors';

function MAKE_URL(strings: TemplateStringsArray, defaultLang: string) {
    const str0 = strings[0]; // "https://"
    const str1 = strings[1]; // rest of url

    // We can even return a string built using a template literal
    return (param?: string) => {

        return  `${str0}${param || defaultLang}${str1}`
    };
}
const API_URL = MAKE_URL`https://${'en'}.wikipedia.org/w/api.php?`
const REST_API_URL = MAKE_URL`https://${'en'}.wikipedia.org/api/rest_v1/`

let USER_AGENT = 'wikipedia (https://github.com/dopecodez/Wikipedia/)';

const client = axios.create({ adapter: fetchAdapter });
async function callAPI(url: string) {
  const options: AxiosRequestConfig = {
    headers: {
      "Api-User-Agent": USER_AGENT,
    },
  };

  console.log("WIKI API MAKING REQ: ", url);
  try {
    const { data } = await client.get(url, options);
    return data;
  } catch (error) {
    throw new wikiError(error);
  }
}

// Makes a request to legacy php endpoint
async function makeRequest(params: any, lang?: string, redirect = true): Promise<any> {
    const search = { ...params };
    search['format'] = 'json';
    if (redirect) {
        search['redirects'] = '';
    }
    if (!params.action) {
        search['action'] = "query";
    }
    search['origin'] = '*';
    let searchParam = '';
    Object.keys(search).forEach(key => {
        searchParam += `${key}=${search[key]}&`;
    });

    return await callAPI(encodeURI(API_URL(lang) + searchParam));
}

// Makes a request to rest api endpoint
export async function makeRestRequest(path: string, lang?: string, redirect = true): Promise<any> {
    if (!redirect) {
        path += '?redirect=false';
    }

    return await callAPI(encodeURI(REST_API_URL(lang) + path));
}

//return rest uri
export function returnRestUrl(path: string, lang?: string): string {
    return encodeURI(REST_API_URL(lang) + path);
}

//change language of both urls
export function setAPIUrl() : string {
    // API_URL = 'https://' + prefix.toLowerCase() + '.wikipedia.org/w/api.php?';
    // REST_API_URL = 'https://' + prefix.toLowerCase() + '.wikipedia.org/api/rest_v1/';
    return API_URL();
}

//change user agent
export function setUserAgent(userAgent: string) {
  USER_AGENT = userAgent;
}

export default makeRequest;




