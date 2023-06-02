import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = s =>
  new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await resp.json();

    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);

    return data;
  } catch (e) {
    throw e;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const resp = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await resp.json();

    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);

    //console.log(resp);
    //console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const resp = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await resp.json();

    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);

    return data;
  } catch (e) {
    throw e;
  }
};
*/
