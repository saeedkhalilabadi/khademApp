/**
 *
 * Contractors
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import NumberFormat from 'react-number-format';
import InputBase from '@mui/material/InputBase';
import { CSVLink } from 'react-csv/lib';
import SearchIcon from '@mui/icons-material/Search';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import { SiMicrosoftexcel } from 'react-icons/si';
import AddIcon from '@mui/icons-material/Add';
import SouthIcon from '@mui/icons-material/South';

import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectContractors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
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

export function Contractors({ dispatch, contractors, props, id, onClose }) {
  useInjectReducer({ key: 'contractors', reducer });
  useInjectSaga({ key: 'contractors', saga });
  const [showItem, setshowItem] = useState(0);
  const [getdata, setgetdata] = useState(true);
  const [deleteItems, setdeleteItems] = useState([1]);
  const [modalFilter, setmodalFilter] = useState(0);
  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);
  const [alert, setalert] = useState(null);
  const [check, setcheck] = useState([]);
  /* filters */
  const [follow_up, setfollow_up] = useState(-1);
  const [statusOfReceivables, setstatusOfReceivables] = useState(-1);
  const [typeOfClaims, settypeOfClaims] = useState(-1);
  const [conditionsOfPurity, setconditionsOfPurity] = useState(-1);
  const [amount, setamount] = useState(-1);
  const [amount1, setamount1] = useState(null);
  const [amount2, setamount2] = useState(null);

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
            value: JSON.parse(localStorage.getItem('Contractors')).filter(
              item => item.id == id,
            )[0],
          }),
        );
      }
    }, 50);
  }
  if (contractors.localDate == null)
    dispatch(setValue({ subject: 'localDate', value: props.date }));

  //console.log('contractors:', contractors);
  //console.log('start:', start);

  const handelCreate = () => {
    if (
      contractors.newData.ownerType == 1 &&
      contractors.newData.ownerOfClaims.length < 3
    ) {
      setalert(
        <MyAlert
          message="نام صاحب مطالبات به درستی وارد نشده است"
          severity="error"
          open1={() => setalert(null)}
        />,
      );
    } else {
      if (showItem == 1 && id == 0) {
        setshowItem(0);
        dispatch(addData(contractors.newData));
      }
      if (showItem == 3 && id == 0) {
        setshowItem(0);
        dispatch(putData(contractors.newData));
      }
      if (showItem == 3 && id != 0) {
        dispatch(putData(contractors.newData));
        onClose();
      }
    }
  };

  function holdRow(row) {
    // console.log('hello');
  }

  function handelSelect(e, value) {
    if (e.target.checked == true) setcheck([...check, value]);
    else setcheck(olddata => olddata.filter(item => item != value));
  }

  const handelSelectAll = e => {
    if (e.target.checked == true) {
      let data = [];
      contractors.data.map(item => data.push(item.id));
      setcheck(data);
    } else setcheck([]);
  };

  const headers = [
    { label: 'ردیف ', key: 'id' },
    { label: 'صاحب مطالبات', key: 'ownerOfClaims' },
    { label: 'مبلغ مطالبات(تومان)', key: 'amountOfClaims' },
    { label: 'شماره تماس', key: 'phone' },

    { label: 'درصد تخفیف', key: 'discount' },
    { label: 'نوع مطالبات', key: 'typeOfClaims' },
    { label: 'شرایط تهاتر', key: 'conditionsOfPurity' },
    { label: 'تاریخ اعلام', key: 'dateSTR' },
    {
      label: 'پیگیری',
      key: 'follow_up',
    },
    { label: 'معرف', key: 'introduced' },
    { label: 'شماره تماس معرف', key: 'referralPhone' },
    { label: 'وضعیت مطالبات ', key: 'statusOfReceivables' },
    { label: 'توضیحات ', key: 'desc' },
    { label: 'تاریخ ثبت ', key: 'createDateSTR' },
  ];

  const newForm = (
    <div style={{ margin: '0px' }}>
      <Row className="form" justify-content-center>
        <Col sx={12} sm={12} md={3} xl={3} className="title">
          اطلاعات پیمانکار
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
                value={contractors.newData.ownerType}
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={contractors.newData.ownerType}
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

        {contractors.newData.ownerType == 2 ? null : (
          <Col sx={12} sm={12} md={3} xl={3} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">صاحب مطالبات </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                autoComplete
                className="fildeItemInput"
                size="sm"
                type="text"
                value={contractors.newData.ownerOfClaims}
                placeholder=" صاحب مطالبات"
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'ownerOfClaims',
                      value: e.target.value,
                    }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}
        {contractors.newData.ownerType == 1 ? null : (
          <Col sx={12} sm={12} md={3} xl={3} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">معرف</Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={contractors.newData.introduced}
                placeholder=" معرف"
                onChange={e => {
                  dispatch(
                    setValue({ subject: 'introduced', value: e.target.value }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}

        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">مبلغ مطالبات </Form.Text>

            <NumberFormat
              readOnly={showItem == 2}
              className="fildeItemInput"
              value={contractors.newData.amountOfClaims}
              placeholder="مبلغ"
              thousandSeparator={true}
              style={{ direction: 'ltr', width: '100%' }}
              onValueChange={e => {
                dispatch(
                  setValue({ subject: 'amountOfClaims', value: e.value }),
                );
              }}
            />
          </Form.Group>
        </Col>

        {contractors.newData.ownerType == 2 ? null : (
          <Col sx={12} sm={12} md={6} xl={6} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">شماره تماس </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                className="fildeItemInput"
                style={{ direction: 'ltr' }}
                autoComplete="off"
                size="sm"
                value={contractors.newData.phone}
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

        {contractors.newData.ownerType == 1 ? null : (
          <Col sx={12} sm={12} md={6} xl={6} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted"> شماره تماس معرف </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                style={{ direction: 'ltr' }}
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={contractors.newData.referralPhone}
                type="number"
                placeholder=" شماره تماس معرف"
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'referralPhone',
                      value: e.target.value,
                    }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">تخفیف(%) </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              className="fildeItemInput"
              autoComplete="off"
              size="sm"
              value={contractors.newData.discount}
              type="number"
              placeholder="تخفیف "
              onChange={e =>
                dispatch(
                  setValue({ subject: 'discount', value: e.target.value }),
                )
              }
            />
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">نوع مطالبات</Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={contractors.newData.typeOfClaims}
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={contractors.newData.typeOfClaims}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'typeOfClaims',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value=""> انتخاب کنید</option>

                <option value="صلح ملک">صلح ملک</option>
                <option value="پیمانکاری">پیمانکاری</option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">شرایط تهاتر</Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={contractors.newData.conditionsOfPurity}
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={contractors.newData.conditionsOfPurity}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'conditionsOfPurity',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value=""> انتخاب کنید</option>

                <option value="نقدی">نقدی</option>
                <option value="با ملک">با ملک</option>
                <option value="قسطی">قسطی</option>
                <option value="همه موارد">همه موارد</option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">تاریخ اعلام</Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={
                  contractors.newData.date == null
                    ? null
                    : contractors.newData.date.year +
                      '/' +
                      contractors.newData.date.month +
                      '/' +
                      contractors.newData.date.day
                }
              />
            ) : (
              <DatePicker
                className="fildeItemInput"
                calendarPopperPosition="bottom"
                value={contractors.newData.date}
                onChange={e =>
                  dispatch(
                    setValue({
                      subject: 'date',
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
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">پیگیری </Form.Text>

            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={contractors.newData.follow_up}
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={contractors.newData.follow_up}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'follow_up',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value=""> انتخاب کنید</option>
                <option> شده</option>
                <option>1 </option>
                <option> 2</option>
                <option> 3</option>
                <option> 4</option>
                <option> 5</option>
                <option> 6</option>
                <option> 7</option>
                <option> 8</option>
                <option> 9</option>
                <option> 10</option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>

        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted"> وضعیت مطالبات </Form.Text>

            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={contractors.newData.statusOfReceivables}
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={contractors.newData.statusOfReceivables}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'statusOfReceivables',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value=""> انتخاب کنید</option>

                <option>موجود</option>
                <option>غیر موجود</option>
                <option>درحال پیگیری</option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">توضیحات </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              autoComplete
              className="fildeItemInput"
              size="sm"
              type="text"
              value={contractors.newData.desc}
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
                  value: contractors.data.filter(
                    item => item.id == check[0],
                  )[0],
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
              data={contractors.data}
              headers={headers}
              filename={'لیست مطالبات.csv'}
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
        {contractors.start == null || contractors.end == null ? null : (
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
              contractors.start.year +
              '/' +
              contractors.start.month +
              '/' +
              contractors.start.day +
              ' تا ' +
              contractors.end.year +
              '/' +
              contractors.end.month +
              '/' +
              contractors.end.day}
          </Col>
        )}
      </Row>

      <TableContainer component={Paper} style={{ direction: 'rtl' }}>
        <Table sx={{ minWidth: 2500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={check.length == contractors.data.length}
                  onChange={handelSelectAll}
                />
              </StyledTableCell>

              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'ownerOfClaims' }))}
              >
                <SouthIcon />
                صاحب مطالبات
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'introduced' }))}
              >
                <SouthIcon />
                معرف
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() =>
                  dispatch(sortData({ subject: 'amountOfClaims' }))
                }
              >
                <SouthIcon />
                مبلغ مطالبات ( تومان )
              </StyledTableCell>
              <StyledTableCell align="center"> تخفیف(%)</StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'typeOfClaims' }))}
              >
                <SouthIcon />
                نوع مطالبات
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() =>
                  dispatch(sortData({ subject: 'conditionsOfPurity' }))
                }
              >
                <SouthIcon />
                شرایط تهاتر
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'dateSTR' }))}
              >
                <SouthIcon />
                تاریخ اعلام
              </StyledTableCell>
              <StyledTableCell align="center">پیگیری</StyledTableCell>

              <StyledTableCell align="center">وضعیت مطالبات</StyledTableCell>
              <StyledTableCell align="center">توضیحات</StyledTableCell>
              <StyledTableCell>ردیف</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractors.data.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <Checkbox
                    checked={check.includes(row.id)}
                    onChange={e => handelSelect(e, row.id)}
                  />
                </StyledTableCell>

                <StyledTableCell align="center">
                  {row.ownerType == 1 ? (
                    <a className="linkPhone" href={'tel:' + row.Phone}>
                      {' '}
                      {row.ownerOfClaims}
                    </a>
                  ) : (
                    '-----'
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.ownerType == 2 ? (
                    <a className="linkPhone" href={'tel:' + row.referralPhone}>
                      {' '}
                      {row.introduced}
                    </a>
                  ) : (
                    '-----'
                  )}
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  <NumberFormat
                    value={row.amountOfClaims}
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
                  {row.discount}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.typeOfClaims}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.conditionsOfPurity}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.date == null
                    ? null
                    : row.date.year + '/' + row.date.month + '/' + row.date.day}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                  className={row.follow_up == 'شده' ? 'ColorGreen' : 'ColorRed'}
                >
                  {row.follow_up == 'شده' ? 'شده' : 'نشده'}
                </StyledTableCell>

                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.statusOfReceivables}
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
                checked={follow_up != -1}
                onChange={e =>
                  e.target.checked == true ? setfollow_up(0) : setfollow_up(-1)
                }
              />
            </Col>
            <Col>پیگیری</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={follow_up}
                custom
                onChange={e => setfollow_up(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option> شده</option>

                <option> نشده</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={statusOfReceivables != -1}
                onChange={e =>
                  e.target.checked == true
                    ? setstatusOfReceivables(0)
                    : setstatusOfReceivables(-1)
                }
              />
            </Col>
            <Col>وضعیت مطالبات </Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={statusOfReceivables}
                custom
                onChange={e => setstatusOfReceivables(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>

                <option>موجود</option>
                <option>غیر موجود</option>
                <option>درحال پیگیری</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>

        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={typeOfClaims != -1}
                onChange={e =>
                  e.target.checked == true
                    ? settypeOfClaims(0)
                    : settypeOfClaims(-1)
                }
              />
            </Col>
            <Col>نوع مطالبات</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={typeOfClaims}
                custom
                onChange={e => settypeOfClaims(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option value="صلح ملک">صلح ملک</option>
                <option value="پیمانکاری">پیمانکاری</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={conditionsOfPurity != -1}
                onChange={e =>
                  e.target.checked == true
                    ? setconditionsOfPurity(0)
                    : setconditionsOfPurity(-1)
                }
              />
            </Col>
            <Col>شرایط تهاتر</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={conditionsOfPurity}
                custom
                onChange={e => setconditionsOfPurity(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option value="نقدی">نقدی</option>
                <option value="با ملک">با ملک</option>
                <option value="قسطی">قسطی</option>
                <option value="همه موارد">همه موارد</option>
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
                    follow_up,
                    statusOfReceivables,
                    typeOfClaims,
                    conditionsOfPurity,
                    amount,
                    amount1,
                    amount2,
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
        <title>مطالبات</title>
        <meta name="description" content="Description of Contractors" />
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

Contractors.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contractors: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contractors: makeSelectContractors(),
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
)(Contractors);
