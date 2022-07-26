/**
 *
 * Debtors
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Checkbox from '@mui/material/Checkbox';
import MyAlert from '../../components/MyAlert/Loadable';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NumberFormat from 'react-number-format';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { SiMicrosoftexcel } from 'react-icons/si';
import { CSVLink } from 'react-csv/lib';
import AddIcon from '@mui/icons-material/Add';
import SouthIcon from '@mui/icons-material/South';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDebtors from './selectors';
import reducer from './reducer';
import saga from './saga';
import NewBroker from './NewBroker';
import {
  getData,
  putData,
  addData,
  deleteData,
  setValue,
  search,
  sortData,
} from './actions';
import '../../src/allStyles.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function Debtors({ debtors, dispatch, props, id, onClose }) {
  useInjectReducer({ key: 'debtors', reducer });
  useInjectSaga({ key: 'debtors', saga });
  const [showItem, setshowItem] = useState(0);
  const [getdata, setgetdata] = useState(true);
  const [deleteItems, setdeleteItems] = useState([1]);
  const [modalFilter, setmodalFilter] = useState(0);
  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);
  const [alert, setalert] = useState(null);
  const [check, setcheck] = useState([]);
  const [brokerSelect, setbrokerSelect] = useState(true);
  const [selectFish, setselectFish] = useState(true);
  const [selectPaymentTerms, setselectPaymentTerms] = useState(true);

  /* 
filters Hook
 */

  const [amount, setamount] = useState(-1);
  const [amount1, setamount1] = useState(null);
  const [amount2, setamount2] = useState(null);
  const [broker, setbroker] = useState(-1);
  const [contractStatus, setcontractStatus] = useState(-1);
  const [paymentStatus, setpaymentStatus] = useState(-1);
  const [referenceStatus, setreferenceStatus] = useState(-1);
  const [brokeragePaymentStatus, setbrokeragePaymentStatus] = useState(-1);
  const [location, setlocation] = useState(-1);
  const [type, settype] = useState(-1);
  /* 
  showItem=0=>list
  showItem=1=>add
  showItem=2=>show
  showItem=3=>edit
  */
  if (getdata) {
    setTimeout(() => {
      setgetdata(false);
      dispatch(getData());
      if (id != 0) {
        setshowItem(3);
        dispatch(
          setValue({
            subject: 'newData',
            value: JSON.parse(localStorage.getItem('Debtors')).filter(
              item => item.id == id,
            )[0],
          }),
        );
      }
    }, 200);
  }
  if (debtors.localDate == null)
    dispatch(setValue({ subject: 'localDate', value: props.date }));

  // console.log('debtors:', debtors);
  // console.log('end:', end);
  // console.log('start:', start);

  function holdRow(row) {
    // console.log('hello');
  }

  const handelCreate = () => {
    if (
      debtors.data1.filter(
        item =>
          item.refrencerName == debtors.newData.refrencerName &&
          item.owner == debtors.newData.owner &&
          item.amount == debtors.newData.amount,
      ).length > 0 &&
      showItem == 1
    ) {
      setalert(
        <MyAlert
          message="اطلاعات مالک  تکراری است"
          severity="error"
          open1={() => setalert(null)}
        />,
      );
    } else {
      if (showItem == 1 && id == 0) {
        setshowItem(0);
        dispatch(addData(debtors.newData));
      }
      if (showItem == 3 && id == 0) {
        setshowItem(0);
        dispatch(putData(debtors.newData));
      }
      if (showItem == 3 && id != 0) {
        dispatch(putData(debtors.newData));
        onClose();
      }
    }
  };

  function handelSelect(e, value) {
    if (e.target.checked == true) setcheck([...check, value]);
    else setcheck(olddata => olddata.filter(item => item != value));
  }

  const handelSelectAll = e => {
    if (e.target.checked == true) {
      let data = [];
      debtors.data.map(item => data.push(item.id));
      setcheck(data);
    } else setcheck([]);
  };

  const newForm = (
    <div style={{ margin: '0px' }}>
      <Row className="form" justify-content-center>
        <Col sx={12} sm={12} md={12} xl={12} className="title">
          اطلاعات بدهکار
        </Col>
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">وضعیت مالکیت </Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={debtors.newData.ownerType}
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={debtors.newData.ownerType}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'ownerType',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value=""> انتخاب کنید</option>

                <option value={1}>مالک</option>
                <option value={2}>معرف</option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>
        {debtors.newData.ownerType == 2 ? null : (
          <Col sx={12} sm={12} md={12} xl={12} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">مالک فیش </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={debtors.newData.owner}
                placeholder="مالک فیش "
                onChange={e => {
                  dispatch(
                    setValue({ subject: 'owner', value: e.target.value }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}
        {debtors.newData.ownerType == 2 ? null : (
          <Col sx={12} sm={12} md={6} xl={6} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">شماره تماس مالک فیش </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                style={{ direction: 'ltr' }}
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={debtors.newData.phone}
                type="tel"
                placeholder="شماره تماس "
                onChange={e => {
                  dispatch(
                    setValue({ subject: 'phone', value: e.target.value }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}
        {debtors.newData.ownerType == 1 ? null : (
          <Col
            sx={12}
            sm={12}
            md={12}
            xl={12}
            className="filde"
            data-aos="zoom-in"
          >
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">نام معرف </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={debtors.newData.refrencerName}
                placeholder="نام معرف "
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'refrencerName',
                      value: e.target.value,
                    }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}
        {debtors.newData.ownerType == 1 ? null : (
          <Col
            sx={12}
            sm={12}
            md={6}
            xl={6}
            className="filde"
            data-aos="zoom-in"
          >
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">شماره تماس معرف فیش </Form.Text>

              <Form.Control
                style={{ direction: 'ltr' }}
                readOnly={showItem == 2}
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={debtors.newData.refrencerPhone}
                type="tel"
                placeholder="شماره تماس معرف "
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'refrencerPhone',
                      value: e.target.value,
                    }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}

        <Col sx={12} sm={12} md={12} xl={12} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">مبلغ(میلیون تومان) </Form.Text>

            <NumberFormat
              readOnly={showItem == 2}
              className="fildeItemInput"
              value={debtors.newData.amount}
              placeholder="مبلغ"
              thousandSeparator={true}
              style={{ direction: 'ltr', width: '100%' }}
              onValueChange={e => {
                dispatch(setValue({ subject: 'amount', value: e.value }));
              }}
            />
            {debtors.data1.filter(
              item =>
                item.amount != '' && item.amount == debtors.newData.amount,
            ).length == 0 ? null : (
              <Form.Text className="alarm-text">
                {'مبلغ وارد شده تکراری میباشد' +
                  '(' +
                  debtors.data1.filter(
                    item =>
                      item.amount != '' &&
                      item.amount == debtors.newData.amount,
                  )[0].createDateSTR +
                  ')'}
              </Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted"> نوع فیش </Form.Text>

            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={debtors.newData.type}
                type="text"
                placeholder="نوع فیش "
                onChange={e =>
                  dispatch(
                    setValue({
                      subject: 'type',
                      value: e.target.value,
                    }),
                  )
                }
              />
            ) : (
              <>
                {selectFish == true ? (
                  <Form.Control
                    className="fildeItemInput"
                    as="select"
                    size="sm"
                    value={debtors.newData.type}
                    custom
                    onChange={e => {
                      e.target.value == 'select'
                        ? setselectFish(false)
                        : dispatch(
                            setValue({
                              subject: 'type',
                              value: e.target.value,
                            }),
                          );
                    }}
                  >
                    <option value=""> انتخاب کنید</option>
                    <option>پروانه مسکونی </option>
                    <option> پروانه تجاری </option>
                    <option> پروانه مسکونی تجاری </option>
                    <option> پروانه با سهم سرانه </option>
                    <option> پایانکار </option>
                    <option> عدم خلاف </option>
                    <option>سپرده </option>
                    <option> گواهی مفاصاحساب </option>
                    <option value="select"> دلخواه.... </option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    autoComplete="off"
                    className="fildeItemInput"
                    size="sm"
                    type="text"
                    value={debtors.newData.type}
                    onChange={e => {
                      dispatch(
                        setValue({
                          subject: 'type',
                          value: e.target.value,
                        }),
                      );
                    }}
                  />
                )}
              </>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted"> فیش منطقه </Form.Text>

            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={debtors.newData.location}
                type="text"
                placeholder=" فیش منطقه  "
                onChange={e =>
                  dispatch(
                    setValue({
                      subject: 'type',
                      value: e.target.value,
                    }),
                  )
                }
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={debtors.newData.location}
                custom
                onChange={e => {
                  e.target.value == 'select'
                    ? setselectFish(false)
                    : dispatch(
                        setValue({
                          subject: 'location',
                          value: Number(e.target.value),
                        }),
                      );
                }}
              >
                <option value=""> انتخاب کنید</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted"> شرایط پرداخت</Form.Text>

            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={debtors.newData.paymentTerms}
                type="text"
                placeholder="شرایط پرداخت "
                onChange={e =>
                  dispatch(
                    setValue({
                      subject: 'paymentTerms',
                      value: e.target.value,
                    }),
                  )
                }
              />
            ) : (
              <>
                {selectPaymentTerms == true ? (
                  <Form.Control
                    className="fildeItemInput"
                    as="select"
                    size="sm"
                    value={debtors.newData.paymentTerms}
                    custom
                    onChange={e => {
                      e.target.value == 'select'
                        ? setselectPaymentTerms(false)
                        : dispatch(
                            setValue({
                              subject: 'paymentTerms',
                              value: e.target.value,
                            }),
                          );
                    }}
                  >
                    <option value=""> انتخاب کنید</option>
                    <option>نقدی </option>
                    <option>اقساطی</option>
                    <option>با ملک</option>
                    <option>خودرو</option>

                    <option value="select"> دلخواه.... </option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    autoComplete="off"
                    className="fildeItemInput"
                    size="sm"
                    type="text"
                    value={debtors.newData.paymentTerms}
                    onChange={e => {
                      dispatch(
                        setValue({
                          subject: 'paymentTerms',
                          value: e.target.value,
                        }),
                      );
                    }}
                  />
                )}
              </>
            )}
          </Form.Group>
        </Col>

        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">کارگزار </Form.Text>

            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={debtors.newData.broker}
              />
            ) : (
              <>
                {brokerSelect == true ? (
                  <Form.Control
                    className="fildeItemInput"
                    as="select"
                    size="sm"
                    value={debtors.newData.brokerNum}
                    custom
                    onChange={e => {
                      e.target.value == 'select'
                        ? setbrokerSelect(false)
                        : dispatch(
                            setValue({
                              subject: 'broker',
                              value: debtors.brokers[e.target.value],
                              number: e.target.value,
                            }),
                          );
                    }}
                  >
                    <option value=""> انتخاب کنید </option>
                    {debtors.brokers.map((item, index) => (
                      <option value={index}>{item.name} </option>
                    ))}

                    <option value="select"> جدید.... </option>
                  </Form.Control>
                ) : (
                  <NewBroker
                    open={true}
                    onClose={() => setbrokerSelect(true)}
                    selectBroker={e => {
                      dispatch(
                        setValue({ subject: 'broker', value: e, number: -1 }),
                      );
                    }}
                  />
                )}
              </>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">وضعیت ارجاع </Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={debtors.newData.referenceStatus}
                type="text"
                placeholder="وضعیت ارجاع "
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={debtors.newData.referenceStatus}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'referenceStatus',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value=""> انتخاب کنید</option>
                <option>شده </option>
                <option>نشده </option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">وضعیت قرارداد </Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={debtors.newData.contractStatus}
                type="text"
                placeholder="وضعیت قرارداد "
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={debtors.newData.contractStatus}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'contractStatus',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value=""> انتخاب کنید</option>
                <option>شده </option>
                <option>نشده </option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>

        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">کل(%) </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              autoComplete="off"
              className="fildeItemInput"
              size="sm"
              type="number"
              value={debtors.newData.all}
              placeholder=" درصد"
              onChange={e => {
                if (e.target.value < 100)
                  dispatch(
                    setValue({
                      subject: 'all',
                      value: e.target.value,
                    }),
                  );
              }}
            />
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">مشتری(%) </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              autoComplete="off"
              className="fildeItemInput"
              size="sm"
              type="number"
              value={debtors.newData.customer}
              placeholder=" درصد"
              onChange={e => {
                if (e.target.value < 100)
                  dispatch(
                    setValue({
                      subject: 'customer',
                      value: e.target.value,
                    }),
                  );
              }}
            />
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">من(%) </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              autoComplete="off"
              className="fildeItemInput"
              size="sm"
              type="number"
              value={debtors.newData.me}
              placeholder=" درصد"
              onChange={e => {
                if (e.target.value < 100)
                  dispatch(
                    setValue({
                      subject: 'me',
                      value: e.target.value,
                    }),
                  );
              }}
            />
          </Form.Group>
        </Col>
        {debtors.newData.ownerType == 1 ? null : (
          <Col sx={12} sm={12} md={3} xl={3} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">معرف(%) </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="number"
                value={debtors.newData.refrencerPercentage}
                placeholder=" درصد"
                onChange={e => {
                  if (e.target.value < 100)
                    dispatch(
                      setValue({
                        subject: 'refrencerPercentage',
                        value: e.target.value,
                      }),
                    );
                }}
              />
            </Form.Group>
          </Col>
        )}

        {debtors.newData.contractStatus != 'شده' ? null : (
          <Col
            sx={12}
            sm={12}
            md={6}
            xl={6}
            className="filde"
            data-aos="zoom-in"
          >
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">وضعیت تسویه </Form.Text>
              {showItem == 2 ? (
                <Form.Control
                  readOnly
                  className="fildeItemInput"
                  autoComplete="off"
                  size="sm"
                  value={debtors.newData.paymentStatus}
                  type="text"
                  placeholder="وضعیت تسویه "
                />
              ) : (
                <Form.Control
                  className="fildeItemInput"
                  as="select"
                  size="sm"
                  value={debtors.newData.paymentStatus}
                  custom
                  onChange={e => {
                    dispatch(
                      setValue({
                        subject: 'paymentStatus',
                        value: e.target.value,
                      }),
                    );
                  }}
                >
                  <option value=""> انتخاب کنید</option>
                  <option>شده </option>
                  <option>نشده </option>
                </Form.Control>
              )}
            </Form.Group>
          </Col>
        )}
        {debtors.newData.contractStatus != 'شده' ? null : (
          <Col
            sx={12}
            sm={12}
            md={6}
            xl={6}
            className="filde"
            data-aos="zoom-in"
          >
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">
                وضعیت پرداخت کارگزاری من{' '}
              </Form.Text>
              {showItem == 2 ? (
                <Form.Control
                  readOnly
                  className="fildeItemInput"
                  autoComplete="off"
                  size="sm"
                  value={debtors.newData.brokeragePaymentStatus}
                  type="text"
                  placeholder="وضعیت پرداخت کارگزار "
                />
              ) : (
                <Form.Control
                  className="fildeItemInput"
                  as="select"
                  size="sm"
                  value={debtors.newData.brokeragePaymentStatus}
                  custom
                  onChange={e => {
                    dispatch(
                      setValue({
                        subject: 'brokeragePaymentStatus',
                        value: e.target.value,
                      }),
                    );
                  }}
                >
                  <option value=""> انتخاب کنید</option>
                  <option>شده </option>
                  <option>نشده </option>
                </Form.Control>
              )}
            </Form.Group>
          </Col>
        )}

        {debtors.newData.contractStatus != 'شده' ? null : (
          <Col
            sx={12}
            sm={12}
            md={3}
            xl={3}
            className="filde"
            data-aos="zoom-in"
          >
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">تاریخ تسویه</Form.Text>
              {showItem == 2 ? (
                <Form.Control
                  readOnly
                  autoComplete="off"
                  className="fildeItemInput"
                  size="sm"
                  type="text"
                  value={
                    debtors.newData.paymentDate == null
                      ? null
                      : debtors.newData.paymentDate.year +
                        '/' +
                        debtors.newData.paymentDate.month +
                        '/' +
                        debtors.newData.paymentDate.day
                  }
                />
              ) : (
                <DatePicker
                  className="fildeItemInput"
                  calendarPopperPosition="auto"
                  value={debtors.newData.paymentDate}
                  onChange={e =>
                    dispatch(
                      setValue({
                        subject: 'paymentDate',
                        value: { year: e.year, month: e.month, day: e.day },
                      }),
                    )
                  }
                  shouldHighlightWeekends
                  locale="fa" // add this
                />
              )}
            </Form.Group>
          </Col>
        )}

        {debtors.newData.ownerType == 1 ||
        debtors.newData.contractStatus != 'شده' ? null : (
          <Col
            sx={12}
            sm={12}
            md={3}
            xl={3}
            className="filde"
            data-aos="zoom-in"
          >
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">وضعیت پرداخت معرف </Form.Text>

              {showItem == 2 ? (
                <Form.Control
                  readOnly
                  className="fildeItemInput"
                  autoComplete="off"
                  size="sm"
                  value={debtors.newData.refrencerPaymentStatus}
                  type="text"
                  placeholder="وضعیت پرداخت کارگزار "
                />
              ) : (
                <Form.Control
                  className="fildeItemInput"
                  as="select"
                  size="sm"
                  value={debtors.newData.refrencerPaymentStatus}
                  custom
                  onChange={e => {
                    dispatch(
                      setValue({
                        subject: 'refrencerPaymentStatus',
                        value: e.target.value,
                      }),
                    );
                  }}
                >
                  <option value=""> انتخاب کنید</option>
                  <option>شده </option>
                  <option>نشده </option>
                </Form.Control>
              )}
            </Form.Group>
          </Col>
        )}
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">توضیحات </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              autoComplete
              className="fildeItemInput"
              size="sm"
              type="text"
              value={debtors.newData.desc}
              placeholder=" توضیحات"
              onChange={e => {
                dispatch(setValue({ subject: 'desc', value: e.target.value }));
              }}
            />
          </Form.Group>
        </Col>

        {showItem == 2 ? null : (
          <Col sx={12} sm={12} md={6} xl={6} className="filde">
            <Button
              style={{ margin: 'auto', marginTop: '30px', width: '100%' }}
              variant="warning"
              onClick={handelCreate}
            >
              {showItem == 1 ? 'ثبت' : null}
              {showItem == 3 ? 'ویرایش' : null}
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
  const headers = [
    { label: 'مالک فیش', key: 'owner' },
    { label: '(میلیون تومان)مبلغ', key: 'amount' },
    { label: 'شرایط پرداخت', key: 'paymentTerms' },
    { label: 'معرف', key: 'refrencer' },
    { label: 'نام معرف', key: 'refrencerName' },
    { label: 'شماره تماس معرف', key: 'refrencerPhone' },
    { label: 'کارگزار', key: 'broker.name' },
    { label: 'کل(%)', key: 'all' },
    { label: 'مشتری(%)', key: 'customer' },
    { label: 'من(%)', key: 'me' },
    { label: 'وضعیت قرارداد', key: 'contractStatus' },
    { label: 'وضعیت ارجاع', key: 'referenceStatus' },
    { label: 'وضعیت تسویه', key: 'paymentStatus' },
    { label: 'وضعیت پرداخت کارگزاری', key: 'brokeragePaymentStatus' },
    { label: 'تاریخ تسویه', key: 'paymentDateSTR' },
    { label: 'نوع فیش ', key: 'type' },
    { label: ' فیش منطقه ', key: 'location' },
    { label: 'شماره تماس صاحب فیش', key: 'phone' },
    { label: 'معرف(%)', key: 'refrencerPercentage' },
    { label: 'وضعیت پرداخت معرف ', key: 'refrencerPaymentStatus' },
    { label: 'توضیحات ', key: 'desc' },
    { label: 'id', key: 'id' },
    { label: 'تاریخ ثبت', key: 'createDateSTR' },
  ];

  const back = (
    <Button
      size="sm"
      variant="warning"
      className="backBtn"
      onClick={() => (id == 0 ? setshowItem(0) : onClose())}
    >
      <KeyboardBackspaceIcon />
    </Button>
  );
  const newBtn = (
    <Button
      className="addBtn"
      onClick={() => {
        setshowItem(1);
        setbrokerSelect(true);
        setselectFish(true);
        dispatch(setValue({ subject: 'id', value: '' }));
      }}
    >
      <AddIcon />
    </Button>
  );
  const deleteForm = (
    <Row className="deleteForm">
      <Col>{check.length}</Col>
      <Col>
        <Button
          size="sm"
          variant="warning"
          style={{ backgroundColor: 'red', width: '60px' }}
          onClick={() => {
            dispatch(deleteData(check));
            setcheck([]);
          }}
        >
          <DeleteIcon style={{ fontSize: '40px' }} />
        </Button>
      </Col>
      {check.length > 1 ? null : (
        <Col>
          <Button
            size="sm"
            variant="warning"
            style={{ width: '60px' }}
            onClick={() => {
              setshowItem(3);
              dispatch(
                setValue({
                  subject: 'newData',
                  value: debtors.data.filter(item => item.id == check[0])[0],
                }),
              );
              setcheck([]);
            }}
          >
            <EditIcon style={{ fontSize: '40px' }} />
          </Button>
        </Col>
      )}
      <Col>
        <Button
          size="sm"
          style={{ width: '60px' }}
          variant="warning"
          onClick={() => {
            setcheck([]);
          }}
        >
          <CloseIcon style={{ fontSize: '40px' }} />
        </Button>
      </Col>
    </Row>
  );
  const list = (
    <>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col xs={2} sm={2} md={2} xl={2}>
          <Button size="sm" variant="warning">
            <CSVLink
              data={debtors.data}
              headers={headers}
              filename={'لیست بدهکاران.csv'}
            >
              <SiMicrosoftexcel
                title="خروجی فایل اکسل"
                style={{ fontSize: '25px', color: '#f9fafb' }}
              />
            </CSVLink>
          </Button>
        </Col>
        <Col xs={2} sm={2} md={2} xl={2}>
          <Button
            size="sm"
            variant="warning"
            onClick={() => {
              setmodalFilter(1);
            }}
          >
            <FilterAltSharpIcon />
          </Button>
        </Col>

        <Col xs={8} sm={8} md={8} xl={8}>
          <Paper
            component="form"
            sx={{
              direction: 'rtl',
              margin: 'auto',

              marginBottom: '10px',
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="نام یا شماره تلفن(مالک یا معرف)"
              type="text"
              inputProps={{ 'aria-label': 'جستجو' }}
              onChange={e =>
                dispatch(search({ subject: 'search', value: e.target.value }))
              }
            />

            <SearchIcon />
          </Paper>
        </Col>
        {debtors.start == null || debtors.end == null ? null : (
          <Col className="filterItem">
            <CloseIcon
              style={{
                color: 'red',
                borderRadius: '50%',
                border: 'solid 1px red',
                marginRight: '30px',
              }}
              onClick={() => dispatch(search({ subject: 'disable' }))}
            />
            {' فیلتر تاریخ ' +
              debtors.start.year +
              '/' +
              debtors.start.month +
              '/' +
              debtors.start.day +
              ' تا ' +
              debtors.end.year +
              '/' +
              debtors.end.month +
              '/' +
              debtors.end.day}
          </Col>
        )}
      </Row>

      <TableContainer component={Paper} style={{ direction: 'rtl' }}>
        <Table sx={{ minWidth: 3000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={check.length == debtors.data.length}
                  onChange={handelSelectAll}
                />
              </StyledTableCell>

              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'owner' }))}
              >
                <SouthIcon />
                مالک فیش{' '}
              </StyledTableCell>

              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'refrencerName' }))}
              >
                <SouthIcon />
                معرف
              </StyledTableCell>

              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'amount' }))}
              >
                <SouthIcon />
                مبلغ ( میلیون تومان )
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'type' }))}
              >
                {' '}
                <SouthIcon />
                نوع فیش
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'location' }))}
              >
                {' '}
                <SouthIcon />
                فیش منطقه
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'paymentTerms' }))}
              >
                <SouthIcon />
                شرایط پرداخت
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'broker' }))}
              >
                {' '}
                <SouthIcon />
                کارگزار
              </StyledTableCell>

              <StyledTableCell align="center"> وضعیت ارجاع</StyledTableCell>

              <StyledTableCell align="center"> وضعیت قرارداد</StyledTableCell>

              <StyledTableCell align="center">وضعیت تسویه </StyledTableCell>
              <StyledTableCell align="center">
                {' '}
                وضعیت پرداخت کارگزاری من
              </StyledTableCell>
              <StyledTableCell align="center">تاریخ تسویه </StyledTableCell>

              <StyledTableCell align="center">
                {' '}
                وضعیت پرداخت معرف
              </StyledTableCell>
              <StyledTableCell align="center"> کل(%)</StyledTableCell>
              <StyledTableCell align="center"> مشتری(%)</StyledTableCell>
              <StyledTableCell align="center"> من(%)</StyledTableCell>
              <StyledTableCell align="center"> معرف(%)</StyledTableCell>
              <StyledTableCell>توضیحات</StyledTableCell>
              <StyledTableCell
                onClick={() => dispatch(sortData({ subject: 'id' }))}
              >
                <SouthIcon />
                ردیف
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {debtors.data.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <Checkbox
                    checked={check.includes(row.id)}
                    onChange={e => handelSelect(e, row.id)}
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  <a className="linkPhone" href={'tel:' + row.phone}>
                    {' '}
                    {row.owner}
                  </a>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <a className="linkPhone" href={'tel:' + row.refrencerPhone}>
                    {' '}
                    {row.refrencerName}
                  </a>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <NumberFormat
                    value={row.amount}
                    className="foo"
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <div>{value}</div>}
                  />
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.type}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.location}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {row.paymentTerms}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {row.broker.phone == '-1' ? (
                    row.broker.name
                  ) : (
                    <a className="linkPhone" href={'tel:' + row.broker.phone}>
                      {' '}
                      {row.broker.name}
                    </a>
                  )}
                </StyledTableCell>

                <StyledTableCell
                  className={
                    row.referenceStatus == 'نشده' ? 'ColorRed' : 'ColorGreen'
                  }
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.referenceStatus}
                </StyledTableCell>

                <StyledTableCell
                  className={
                    row.contractStatus == 'نشده' ? 'ColorRed' : 'ColorGreen'
                  }
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.contractStatus}
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                  className={
                    row.paymentStatus == 'نشده' ? 'ColorRed' : 'ColorGreen'
                  }
                >
                  {row.paymentStatus}
                </StyledTableCell>
                <StyledTableCell
                  className={
                    row.brokeragePaymentStatus == 'نشده'
                      ? 'ColorRed'
                      : 'ColorGreen'
                  }
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.brokeragePaymentStatus}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.paymentDateSTR}
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                  className={
                    row.refrencerPaymentStatus == 'نشده'
                      ? 'ColorRed'
                      : 'ColorGreen'
                  }
                >
                  {row.refrencerPaymentStatus}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.all}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.customer}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.me}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.refrencerPercentage}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.desc}
                </StyledTableCell>

                <StyledTableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {index + 1}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  const filterForm = (
    <div className="modalBack">
      <Row className="modalForm">
        <Col xs={12} sm={12} md={12} xl={12} className="title">
          فیلتر ها را انتخاب کنید
        </Col>

        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col xs={4} sm={4} md={4} xl={4}>
              <Checkbox
                checked={amount != -1}
                onChange={e =>
                  e.target.checked == true ? setamount(0) : setamount(-1)
                }
              />
            </Col>
            <Col xs={8} sm={8} md={8} xl={8}>
              مبلغ فیش(میلیون تومان)
            </Col>
            {amount == -1 ? null : (
              <Col
                sx={12}
                sm={12}
                md={12}
                xl={12}
                style={{ marginTop: '20px' }}
              >
                کمترین
                <NumberFormat
                  className="fildeItemInput"
                  value={amount1}
                  placeholder="مبلغ"
                  thousandSeparator={true}
                  style={{ direction: 'ltr', width: '60%' }}
                  onValueChange={e => setamount1(e.value)}
                />
              </Col>
            )}
            {amount == -1 ? null : (
              <Col
                sx={12}
                sm={12}
                md={12}
                xl={12}
                style={{ marginTop: '20px' }}
              >
                بیشترین
                <NumberFormat
                  className="fildeItemInput"
                  value={amount2}
                  placeholder="مبلغ"
                  thousandSeparator={true}
                  style={{ direction: 'ltr', width: '60%' }}
                  onValueChange={e => setamount2(e.value)}
                />
              </Col>
            )}
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={broker != -1}
                onChange={e =>
                  e.target.checked == true ? setbroker(0) : setbroker(-1)
                }
              />
            </Col>
            <Col>کارگزار</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={broker}
                custom
                onChange={e => setbroker(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                {debtors.brokers.map(item => (
                  <option>{item.name} </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={contractStatus != -1}
                onChange={e =>
                  e.target.checked == true
                    ? setcontractStatus(0)
                    : setcontractStatus(-1)
                }
              />
            </Col>
            <Col>وضعیت قرارداد </Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={contractStatus}
                custom
                onChange={e => setcontractStatus(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>

                <option>شده</option>
                <option>نشده</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>

        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={paymentStatus != -1}
                onChange={e =>
                  e.target.checked == true
                    ? setpaymentStatus(0)
                    : setpaymentStatus(-1)
                }
              />
            </Col>
            <Col>وضعیت تسویه</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={paymentStatus}
                custom
                onChange={e => setpaymentStatus(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option>شده</option>
                <option>نشده</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={brokeragePaymentStatus != -1}
                onChange={e =>
                  e.target.checked == true
                    ? setbrokeragePaymentStatus(0)
                    : setbrokeragePaymentStatus(-1)
                }
              />
            </Col>
            <Col>پرداخت کارگزاری</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={brokeragePaymentStatus}
                custom
                onChange={e => setbrokeragePaymentStatus(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option>شده</option>
                <option>نشده</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={referenceStatus != -1}
                onChange={e =>
                  e.target.checked == true
                    ? setreferenceStatus(0)
                    : setreferenceStatus(-1)
                }
              />
            </Col>
            <Col>وضعیت ارجاع</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={referenceStatus}
                custom
                onChange={e => setreferenceStatus(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option>شده</option>
                <option>نشده</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={type != -1}
                onChange={e =>
                  e.target.checked == true ? settype(0) : settype(-1)
                }
              />
            </Col>
            <Col>نوع فیش</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={type}
                custom
                onChange={e => settype(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option>پروانه مسکونی </option>
                <option> پروانه تجاری </option>
                <option> پروانه مسکونی تجاری </option>
                <option> پروانه با سهم سرانه </option>
                <option> پایانکار </option>
                <option> عدم خلاف </option>
                <option>سپرده </option>
                <option> گواهی مفاصاحساب </option>
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={location != -1}
                onChange={e =>
                  e.target.checked == true ? setlocation(0) : setlocation(-1)
                }
              />
            </Col>
            <Col>منطقه</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={location}
                custom
                onChange={e => setlocation(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option>1 </option>
                <option>2 </option>
                <option>3 </option>
                <option>4 </option>
                <option>5 </option>
                <option>6 </option>
                <option>7 </option>
                <option>8 </option>
                <option>9 </option>
                <option>10 </option>
                <option>11</option>
                <option>12 </option>
              </Form.Control>
            </Col>
          </Row>
        </Col>

        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Button
            className="btnForm"
            variant="warning"
            size="sm"
            onClick={() => {
              dispatch(
                search({
                  subject: 'filter',
                  value: {
                    amount,
                    amount1,
                    amount2,
                    broker,
                    contractStatus,
                    paymentStatus,
                    referenceStatus,
                    brokeragePaymentStatus,
                    type,
                    location,
                  },
                }),
              );
              setmodalFilter(0);
            }}
          >
            تایید
          </Button>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Button
            className="btnForm"
            variant="outline-warning"
            size="sm"
            onClick={() => setmodalFilter(0)}
          >
            برگشت
          </Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <div
      onKeyDown={e => {
        if (e.key === 'Enter') {
          const fields =
            Array.from(e.currentTarget.querySelectorAll('input')) || [];
          const position = fields.indexOf(
            e.target, // as HTMLInputElement (for TypeScript)
          );
          fields[position + 1] && fields[position + 1].focus();
        }
      }}
    >
      <Helmet>
        <title>بدهکاران</title>
        <meta name="description" content="Description of Debtors" />
      </Helmet>
      {alert}

      {check.length == 0 ? null : deleteForm}
      {modalFilter == 0 ? null : filterForm}
      {showItem == 3 ? newForm : null}
      {showItem == 1 ? newForm : null}

      {showItem == 2 ? newForm : null}

      {showItem != 0 ? back : null}
      {showItem == 0 ? newBtn : null}

      {showItem == 0 ? list : null}
    </div>
  );
}

Debtors.propTypes = {
  dispatch: PropTypes.func.isRequired,
  debtors: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  debtors: makeSelectDebtors(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Debtors);
