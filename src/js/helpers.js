import { async } from 'regenerator-runtime';

export const getJSON = async function (url) {
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);

    //console.log(resp);
    //console.log(data);
    return data;
  } catch (e) {
    throw e;
  }
};
