const getData = async (key) => {
    try {
        const value = localStorage.getItem(key);
        if (value !== null) {
            return JSON.stringify(value);
        }
    } catch (e) {
        console.log('error get localStorage: ', e);
    }
};

function getUrlParsing(onGoingParameter, value, parameter) {
    if (parameter !== null) {
        if (parameter !== undefined) {
            if (
                parameter !== 'ALL' &&
                parameter !== '' &&
                parameter !== -2 &&
                (parameter.length > 0 || parameter > 0)
            ) {
                if (
                    onGoingParameter === undefined ||
                    onGoingParameter === null ||
                    onGoingParameter === ''
                ) {
                    onGoingParameter = '?' + value + '=' + encodeURIComponent(parameter);
                } else {
                    onGoingParameter = onGoingParameter + '&' + value + '=' + encodeURIComponent(parameter);
                }
            }
        }
    }
    return onGoingParameter;
};

const objectString = (data, convert) => {
    if (!convert) {
      let newdata = [];
      for (const key in data) {
        if (typeof data[key] === 'object') {
          for (const kd in data[key]) {
            if (typeof data[key][kd] === 'object') {
              for (const kdd in data[key][kd]) {
                newdata.push(
                  encodeURIComponent(key) +
                    '[' +
                    encodeURIComponent(kd) +
                    ']' +
                    '[' +
                    encodeURIComponent(kdd) +
                    ']=' +
                    encodeURIComponent(data[key][kd][kdd]),
                );
              }
            } else {
              newdata.push(
                encodeURIComponent(key) +
                  '[' +
                  encodeURIComponent(kd) +
                  ']=' +
                  encodeURIComponent(data[key][kd]),
              );
            }
          }
        } else {
          newdata.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
      }
      return '?' + newdata.join('&');
    } else {
      if (data) {
        data = data.replace('?', '');
        if (data) {
          data = data.split('&');
          let newdata = [];
          for (const key in data) {
            let dk = data[key].split('=');
            let dkk = [];
            dkk[decodeURIComponent(dk[0])] = decodeURIComponent(dk[1]);
            newdata.push(dkk);
          }
  
          return newdata;
        } else {
          return false;
        }
      }
    }
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(money);
  };

 const storeData = async (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log('error store localStorage: ', e);
    }
  };

export {getData, getUrlParsing, objectString, formatRupiah, storeData}