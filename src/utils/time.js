import moment from 'moment';

export function dropTime(str, flag) {
  return flag ? str.replace(/\W*\d{1,2}:.*$/, '') : str;
}

export function dropYear(str) {
  return str.replace(/ +(19|20)\d{2}/, '');
}

export function dropCurrentYear(str) {
  const re = new RegExp(`\\W+${moment().get('year')}`);
  return str.replace(re, '');
}

export function dateString(date) {
  return date.toISOString().slice(0, 10);
}

function updateLocales() {
  moment.updateLocale('en', {
    week: { dow: 1 },
  });
  moment.updateLocale('en-gb', {
    week: { dow: 1 },
  });
  moment.updateLocale('nl', {
    week: { dow: 1 },
    weekdaysShort: 'zo_ma_di_wo_do_vr_za'.split('_'),
    monthsShort: 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_'),
    longDateFormat: {
      llll: 'dd D MMM YYYY HH:mm',
    },
  });
}

updateLocales();
