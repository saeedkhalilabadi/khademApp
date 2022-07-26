/*
 *
 * FalowUp reducer
 *
 */
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

export const initialState = {
  brokers: [],
  data: [],
  data1: [],
  localDate: null,
  newData: {
    id: null,
    ownerType: '',
    owner: '',
    type: '',
    desc: '',
    refrencer: '',
    broker: '',
    brokerNum: '',
    possibilityDo: '',
    contractStatus: '',
    brokerMony: '',
    paymentStatus: '',
    phone: '',
    createDateSTR: '',
  },
};

// function for sorting an array of persian words
var persianAlphabets = [
  ' ',
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

/* eslint-disable default-case, no-param-reassign */
const falowUpReducer = (state = initialState, action) =>
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
          if (action.data.value.type != 0 && action.data.value.type != -1)
            draft.data = draft.data.filter(
              item => item.type == action.data.value.type,
            );
          if (action.data.value.broker != 0 && action.data.value.broker != -1)
            draft.data = draft.data.filter(
              item => item.broker.name == action.data.value.broker,
            );
          if (
            action.data.value.possibilityDo != 0 &&
            action.data.value.possibilityDo != -1
          )
            draft.data = draft.data.filter(
              item => item.possibilityDo == action.data.value.possibilityDo,
            );
          if (
            action.data.value.contractStatus != 0 &&
            action.data.value.contractStatus != -1
          )
            draft.data = draft.data.filter(
              item => item.contractStatus == action.data.value.contractStatus,
            );
          if (
            action.data.value.paymentStatus != 0 &&
            action.data.value.paymentStatus != -1
          )
            draft.data = draft.data.filter(
              item => item.paymentStatus == action.data.value.paymentStatus,
            );
        }
        if (action.data.subject == 'search') {
          draft.data = draft.data1.filter(
            item =>
              item.owner
                .toLowerCase()
                .match(new RegExp(action.data.value.toLowerCase())) ||
              item.refrencer
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
            owner: '',
            ownerType: 1,
            type: '',
            refrencer: '',
            broker: '',
            brokerNum: '',
            possibilityDo: '',
            contractStatus: '',
            brokerMony: '',
            paymentStatus: '',
            phone: '',
            desc: '',
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
        if (action.data.subject == 'owner')
          draft.newData.owner = action.data.value;
        if (action.data.subject == 'ownerType')
          draft.newData.ownerType = action.data.value;
        if (action.data.subject == 'phone')
          draft.newData.phone = action.data.value;
        if (action.data.subject == 'broker') {
          draft.newData.broker = action.data.value;
          if (action.data.number == -1) {
            draft.newData.brokerNum = draft.brokers.length;
            draft.brokers.push(action.data.value);
            localStorage.setItem('brokers2', JSON.stringify(draft.brokers));
          } else draft.newData.brokerNum = action.data.number;
        }

        if (action.data.subject == 'refrencer')
          draft.newData.refrencer = action.data.value;
        if (action.data.subject == 'type')
          draft.newData.type = action.data.value;
        if (action.data.subject == 'paymentStatus')
          draft.newData.paymentStatus = action.data.value;
        if (action.data.subject == 'possibilityDo')
          draft.newData.possibilityDo = action.data.value;
        if (action.data.subject == 'contractStatus')
          draft.newData.contractStatus = action.data.value;
        if (action.data.subject == 'brokerMony') {
          draft.newData.brokerMony = action.data.value;

          draft.newData.paymentDateSTR =
            action.data.value.year +
            '/' +
            action.data.value.month +
            '/' +
            action.data.value.day;
        }

        if (action.data.subject == 'brokeragePaymentStatus')
          draft.newData.brokeragePaymentStatus = action.data.value;
        if (action.data.subject == 'refrencer')
          draft.newData.refrencer = action.data.value;
        if (action.data.subject == 'refrencerPercentage')
          draft.newData.refrencerPercentage = action.data.value;
        if (action.data.subject == 'type')
          draft.newData.type = action.data.value;
        break;
      case SORT_DATA:
        if (action.data.subject == 'brokerMony') {
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
        } else if (action.data.subject == 'owner') {
          draft.data = draft.data1
            .filter(item => item.ownerType == '1')
            .sort((a, b) => customSort(a.owner, b.owner));
          break;
        } else if (action.data.subject == 'refrencer') {
          draft.data = draft.data1
            .filter(item => item.ownerType == '2')
            .sort((a, b) => customSort(a.refrencer, b.refrencer));
          break;
        } else
          draft.data = draft.data1
            .filter(item => item[action.data.subject] != '')
            .sort((a, b) =>
              customSort(a[action.data.subject], b[action.data.subject]),
            );

        break;
      case GET_DATA:
        if (JSON.parse(localStorage.getItem('FalowerUp'))) {
          draft.data = JSON.parse(localStorage.getItem('FalowerUp'));

          draft.data1 = JSON.parse(localStorage.getItem('FalowerUp'));
        }

        if (JSON.parse(localStorage.getItem('brokers2')))
          draft.brokers = JSON.parse(localStorage.getItem('brokers2'));
        else {
          draft.brokers = [
            { name: 'مظفری', phone: '09155001792' },
            { name: 'بزرگوار', phone: '09154466484' },
            { name: 'خجسته', phone: '09158015523' },
            { name: 'یاسری فر', phone: '09154006915' },
            { name: 'خانم عبدالهی', phone: '09153241269' },
          ];
        }

        break;
      case GET_DATA_SUCCESS:
        break;
      case GET_DATA_ERROR:
        break;
      case ADD_DATA:
        draft.data.push(action.data);
        draft.data1.push(action.data);
        localStorage.setItem('FalowerUp', JSON.stringify(draft.data1));

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

        localStorage.setItem('FalowerUp', JSON.stringify(draft.data1));
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

        localStorage.setItem('FalowerUp', JSON.stringify(draft.data1));
        break;
      case DELETE_DATA_SUCCESS:
        break;
      case DELETE_DATA_ERROR:
        break;
    }
  });

export default falowUpReducer;
