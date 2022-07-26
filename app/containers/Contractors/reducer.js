/*
 *
 * Contractors reducer
 *
 */
import produce from 'immer';
import {
  SORT_DATA,
  SEARCH,
  SET_VALUE,
  GET_DATA,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  ADD_DATA,
  ADD_DATA_ERROR,
  ADD_DATA_SUCCESS,
  PUT_DATA,
  PUT_DATA_ERROR,
  PUT_DATA_SUCCESS,
  DELETE_DATA,
  DELETE_DATA_ERROR,
  DELETE_DATA_SUCCESS,
} from './constants';

var persianAlphabets = [
  'آ',
  'ا',
  'ب',
  'پ',
  'ت',
  'ث',
  'ج',
  'چ',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'ژ',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ک',
  'گ',
  'ل',
  'م',
  'ن',
  'و',
  'ه',
  'ی',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ' ',
  '',
];
function customSort(x, y) {
  var i = 0;
  var maxLen = Math.min(x.length, y.length);

  function increseIndex() {
    if (
      persianAlphabets.indexOf(x[i]) == persianAlphabets.indexOf(y[i]) &&
      i <= maxLen
    ) {
      i++;
      increseIndex();
    } else return;
  }
  increseIndex();

  if (persianAlphabets.indexOf(x[i]) < persianAlphabets.indexOf(y[i])) {
    return -1;
  }
  if (persianAlphabets.indexOf(x[i]) > persianAlphabets.indexOf(y[i])) {
    return 1;
  }
  return 0;
}

export const initialState = {
  data: [],
  data1: [],
  localDate: null,
  start: null,
  end: null,
  newData: {
    id: '',
    ownerType: 1,
    ownerOfClaims: '',
    amountOfClaims: '',
    phone: '',
    discount: '',
    typeOfClaims: '',
    conditionsOfPurity: '',
    date: null,
    dateSTR: '',
    follow_up: 'نشده',
    introduced: '',
    referralPhone: '',
    statusOfReceivables: '',
    desc: '',
    createDate: '',
    createDateSTR: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const contractorsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SEARCH:
        if (action.data.subject == 'disable') {
          draft.start = null;
          draft.end = null;
          draft.data = draft.data1;
        }
        if (action.data.subject == 'filter') {
          draft.data = draft.data1;
          if (action.data.value.amount != -1)
            draft.data = draft.data.filter(
              item =>
                Number(item.amount) >= Number(action.data.value.amount1) &&
                Number(item.amount) <= Number(action.data.value.amount2),
            );
          if (action.data.value.follow_up == 'شده')
            draft.data = draft.data.filter(item => item.follow_up == 'شده');
          if (action.data.value.follow_up == 'نشده')
            draft.data = draft.data.filter(item => item.follow_up != 'شده');

          if (
            action.data.value.typeOfClaims != 0 &&
            action.data.value.typeOfClaims != -1
          )
            draft.data = draft.data.filter(
              item => item.typeOfClaims == action.data.value.typeOfClaims,
            );
          if (
            action.data.value.statusOfReceivables != 0 &&
            action.data.value.statusOfReceivables != -1
          )
            draft.data = draft.data.filter(
              item =>
                item.statusOfReceivables ==
                action.data.value.statusOfReceivables,
            );
          if (
            action.data.value.conditionsOfPurity != 0 &&
            action.data.value.conditionsOfPurity != -1
          )
            draft.data = draft.data.filter(
              item =>
                item.conditionsOfPurity == action.data.value.conditionsOfPurity,
            );
        }
        if (action.data.subject == 'search') {
          draft.data = draft.data1.filter(
            item =>
              item.ownerOfClaims
                .toLowerCase()
                .match(new RegExp(action.data.value.toLowerCase())) ||
              item.introduced
                .toLowerCase()
                .match(new RegExp(action.data.value.toLowerCase())) ||
              item.referralPhone
                .toLowerCase()
                .match(new RegExp(action.data.value.toLowerCase())) ||
              item.phone
                .toLowerCase()
                .match(new RegExp(action.data.value.toLowerCase())),
          );
        }
        break;
      case SET_VALUE:
        if (action.data.subject == 'newData') draft.newData = action.data.value;
        if (action.data.subject == 'localDate')
          draft.localDate = action.data.value;
        if (action.data.subject == 'id')
          draft.newData = {
            id:
              draft.data1.length == 0
                ? 1
                : draft.data1[draft.data1.length - 1].id + 1,
            ownerOfClaims: '',
            ownerType: 1,
            amountOfClaims: '',
            phone: '',
            discount: '',
            typeOfClaims: '',
            conditionsOfPurity: '',
            date: null,
            dateSTR: '',
            follow_up: 'نشده',
            introduced: '',
            desc: '',
            referralPhone: '',
            statusOfReceivables: '',
            createDate: draft.localDate,
            createDateSTR:
              draft.localDate.year +
              '/' +
              draft.localDate.month +
              '/' +
              draft.localDate.day,
          };

        if (action.data.subject == 'desc')
          draft.newData.desc = action.data.value;
        if (action.data.subject == 'ownerType')
          draft.newData.ownerType = action.data.value;
        if (action.data.subject == 'ownerOfClaims')
          draft.newData.ownerOfClaims = action.data.value;
        if (action.data.subject == 'amountOfClaims')
          draft.newData.amountOfClaims = action.data.value;
        if (action.data.subject == 'phone')
          draft.newData.phone = action.data.value;
        if (action.data.subject == 'discount')
          draft.newData.discount = action.data.value;
        if (action.data.subject == 'typeOfClaims')
          draft.newData.typeOfClaims = action.data.value;
        if (action.data.subject == 'conditionsOfPurity')
          draft.newData.conditionsOfPurity = action.data.value;
        if (action.data.subject == 'date') {
          draft.newData.date = action.data.value;
          draft.newData.dateSTR =
            action.data.value.year +
            '/' +
            action.data.value.month +
            '/' +
            action.data.value.day;
        }
        if (action.data.subject == 'follow_up')
          draft.newData.follow_up = action.data.value;
        if (action.data.subject == 'introduced')
          draft.newData.introduced = action.data.value;
        if (action.data.subject == 'referralPhone')
          draft.newData.referralPhone = action.data.value;
        if (action.data.subject == 'statusOfReceivables')
          draft.newData.statusOfReceivables = action.data.value;

        break;
      case SORT_DATA:
        if (action.data.subject == 'amountOfClaims') {
          draft.data = draft.data1
            .filter(item => item[action.data.subject] != '')
            .sort((a, b) =>
              Number(a[action.data.subject]) > Number(b[action.data.subject])
                ? 1
                : -1,
            );
        } else if (action.data.subject == 'broker') {
          draft.data = draft.data1
            .filter(item => item[action.data.subject] != '')
            .sort((a, b) => customSort(a.broker.name, b.broker.name));
        } else if (action.data.subject == 'ownerOfClaims') {
          draft.data = draft.data1
            .filter(item => item.ownerType == '1')
            .sort((a, b) => customSort(a.ownerOfClaims, b.ownerOfClaims));
          break;
        } else if (action.data.subject == 'introduced') {
          draft.data = draft.data1
            .filter(item => item.ownerType == '2')
            .sort((a, b) => customSort(a.introduced, b.introduced));
          break;
        } else
          draft.data = draft.data1
            .filter(
              item =>
                item[action.data.subject] != '' &&
                item[action.data.subject] != null,
            )
            .sort((a, b) =>
              customSort(a[action.data.subject], b[action.data.subject]),
            );

        break;
      case GET_DATA:
        if (JSON.parse(localStorage.getItem('Contractors'))) {
          draft.data = JSON.parse(localStorage.getItem('Contractors'));
          draft.data1 = JSON.parse(localStorage.getItem('Contractors'));
        }

        break;
      case GET_DATA_SUCCESS:
        break;
      case GET_DATA_ERROR:
        break;
      case ADD_DATA:
        draft.data.push(action.data);
        draft.data1.push(action.data);
        localStorage.setItem('Contractors', JSON.stringify(draft.data1));
        draft.newData = {
          id: '',
          ownerType: 1,
          ownerOfClaims: '',
          amountOfClaims: '',
          phone: '',
          discount: '',
          typeOfClaims: 0,
          conditionsOfPurity: 0,
          date: null,
          follow_up: '',
          introduced: '',
          referralPhone: '',
          desc: '',
          statusOfReceivables: '',
          createDate: '',
        };
        break;
      case ADD_DATA_SUCCESS:
        break;
      case ADD_DATA_ERROR:
        break;
      case PUT_DATA:
        draft.data.map((item, index) =>
          item.id == draft.newData.id
            ? (draft.data[index] = draft.newData)
            : null,
        );
        draft.data1.map((item, index) =>
          item.id == draft.newData.id
            ? (draft.data1[index] = draft.newData)
            : null,
        );

        localStorage.setItem('Contractors', JSON.stringify(draft.data1));
        break;
      case PUT_DATA_SUCCESS:
        break;
      case PUT_DATA_ERROR:
        break;
      case DELETE_DATA:
        action.data.map(
          item => (draft.data = draft.data.filter(item2 => item2.id != item)),
        );
        action.data.map(
          item => (draft.data1 = draft.data1.filter(item2 => item2.id != item)),
        );

        localStorage.setItem('Contractors', JSON.stringify(draft.data1));
        break;
      case DELETE_DATA_SUCCESS:
        break;
      case DELETE_DATA_ERROR:
        break;
    }
  });

export default contractorsReducer;
