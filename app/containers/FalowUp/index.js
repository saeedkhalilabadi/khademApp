/**
 *
 * FalowUp
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
import SouthIcon from '@mui/icons-material/South';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { SiMicrosoftexcel } from 'react-icons/si';
import { CSVLink } from 'react-csv/lib';
import AddIcon from '@mui/icons-material/Add';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectFalowUp from './selectors';
import NewBroker from './NewBroker';
import reducer from './reducer';
import saga from './saga';

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

export function FalowUp({ falowUp, dispatch, props, id, onClose }) {
  useInjectReducer({ key: 'falowUp', reducer });
  useInjectSaga({ key: 'falowUp', saga });

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
            value: JSON.parse(localStorage.getItem('FalowerUp')).filter(
              item => item.id == id,
            )[0],
          }),
        );
      }
    }, 200);
  }
  if (falowUp.localDate == null)
    dispatch(setValue({ subject: 'localDate', value: props.date }));

  //  console.log('falowUp:', falowUp);
  //console.log('end:', end);
  //console.log('start:', start);

  function holdRow(row) {
    //console.log('hello');
  }

  const handelCreate = () => {
    if (showItem == 1 && id == 0) {
      setshowItem(0);
      dispatch(addData(falowUp.newData));
    }
    if (showItem == 3 && id == 0) {
      setshowItem(0);
      dispatch(putData(falowUp.newData));
    }
    if (showItem == 3 && id != 0) {
      dispatch(putData(falowUp.newData));
      onClose();
    }
  };

  function handelSelect(e, value) {
    if (e.target.checked == true) setcheck([...check, value]);
    else setcheck(olddata => olddata.filter(item => item != value));
  }

  const handelSelectAll = e => {
    if (e.target.checked == true) {
      let data = [];
      falowUp.data.map(item => data.push(item.id));
      setcheck(data);
    } else setcheck([]);
  };

  const newForm = (
    <div style={{ margin: '0px' }}>
      <Row className="form" justify-content-center>
        <Col sx={12} sm={12} md={3} xl={3} className="title">
          اطلاعات پیگیری
        </Col>

        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">درخواست کننده </Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={falowUp.newData.ownerType}
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={falowUp.newData.ownerType}
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
        {/* مالک */}
        {falowUp.newData.ownerType != 1 ? null : (
          <Col sx={12} sm={12} md={3} xl={3} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">مالک </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={falowUp.newData.owner}
                placeholder="مالک  "
                onChange={e => {
                  dispatch(
                    setValue({ subject: 'owner', value: e.target.value }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}

        {/* معرف */}
        {falowUp.newData.ownerType == 1 ? null : (
          <Col sx={12} sm={12} md={6} xl={6} className="filde">
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Text className="text-muted">معرف </Form.Text>

              <Form.Control
                readOnly={showItem == 2}
                autoComplete="off"
                className="fildeItemInput"
                size="sm"
                type="text"
                value={falowUp.newData.refrencer}
                placeholder="معرف"
                onChange={e => {
                  dispatch(
                    setValue({ subject: 'refrencer', value: e.target.value }),
                  );
                }}
              />
            </Form.Group>
          </Col>
        )}
        {/* شماره تماس */}

        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">
              شماره تماس
              {falowUp.newData.ownerType == 1 ? ' مالک ' : ' معرف '}{' '}
            </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              className="fildeItemInput"
              style={{ direction: 'ltr' }}
              autoComplete="off"
              size="sm"
              value={falowUp.newData.phone}
              type="tel"
              placeholder="شماره تماس "
              onChange={e => {
                dispatch(setValue({ subject: 'phone', value: e.target.value }));
              }}
            />
          </Form.Group>
        </Col>

        {/* نوع درخواست */}
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted"> نوع درخواست </Form.Text>

            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={falowUp.newData.type}
                type="text"
                placeholder="نوع درخواست "
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
                    value={falowUp.newData.type}
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
                    <option value="">انتخاب کنید</option>

                    <option>سقف اضافه </option>
                    <option>پیشروی </option>
                    <option> پارکینگ</option>
                    <option> تغییر کاربری</option>
                    <option> حقوقی</option>
                    <option> صلح نامه</option>
                    <option> تجاری</option>
                    <option>مجری </option>
                    <option>ناظر </option>
                    <option>استحکام بنا </option>
                    <option> انتقالی</option>
                    <option>کارشناسی </option>

                    <option value="select"> دلخواه.... </option>
                  </Form.Control>
                ) : (
                  <Form.Control
                    autoComplete="off"
                    className="fildeItemInput"
                    size="sm"
                    type="text"
                    value={falowUp.newData.type}
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

        {/* کارگزار */}

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
                value={falowUp.newData.broker}
              />
            ) : (
              <>
                {brokerSelect == true ? (
                  <Form.Control
                    className="fildeItemInput"
                    as="select"
                    size="sm"
                    value={falowUp.newData.brokerNum}
                    custom
                    onChange={e => {
                      e.target.value == 'select'
                        ? setbrokerSelect(false)
                        : dispatch(
                            setValue({
                              subject: 'broker',
                              value: falowUp.brokers[e.target.value],
                              number: e.target.value,
                            }),
                          );
                    }}
                  >
                    <option value="">انتخاب کنید</option>
                    {falowUp.brokers.map((item, index) => (
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

        {/* قابلیت انجام */}
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">قابلیت انجام </Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={falowUp.newData.possibilityDo}
                type="text"
                placeholder="قابلیت انجام "
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={falowUp.newData.possibilityDo}
                custom
                onChange={e => {
                  dispatch(
                    setValue({
                      subject: 'possibilityDo',
                      value: e.target.value,
                    }),
                  );
                }}
              >
                <option value="">انتخاب کنید</option>
                <option>دارد </option>
                <option>ندارد </option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>

        {/* وضعیت قرارداد */}
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">وضعیت قرارداد </Form.Text>
            {showItem == 2 ? (
              <Form.Control
                readOnly
                className="fildeItemInput"
                autoComplete="off"
                size="sm"
                value={falowUp.newData.contractStatus}
                type="text"
                placeholder="وضعیت قرارداد "
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={falowUp.newData.contractStatus}
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
                <option value="">انتخاب کنید</option>
                <option>شده </option>
                <option>نشده </option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>

        {/* مبلغ کارگزاری */}
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">مبلغ کار گزاری </Form.Text>

            <NumberFormat
              readOnly={showItem == 2}
              className="fildeItemInput"
              value={falowUp.newData.brokerMony}
              placeholder="مبلغ کار گزاری"
              thousandSeparator={true}
              style={{ direction: 'ltr', width: '100%' }}
              onValueChange={e => {
                dispatch(setValue({ subject: 'brokerMony', value: e.value }));
              }}
            />
          </Form.Group>
        </Col>
        {/* وضعیت پرداخت کارگزاری */}
        <Col sx={12} sm={12} md={6} xl={6} className="filde">
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
                value={falowUp.newData.paymentStatus}
                type="text"
                placeholder="وضعیت پرداخت کارگزاری "
              />
            ) : (
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={falowUp.newData.paymentStatus}
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
                <option value="">انتخاب کنید</option>
                <option>شده </option>
                <option>نشده </option>
              </Form.Control>
            )}
          </Form.Group>
        </Col>

        {/* توضیحات */}
        <Col sx={12} sm={12} md={3} xl={3} className="filde">
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Text className="text-muted">توضیحات </Form.Text>

            <Form.Control
              readOnly={showItem == 2}
              autoComplete
              className="fildeItemInput"
              size="sm"
              type="text"
              value={falowUp.newData.desc}
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
    { label: 'مالک (معرف)', key: 'owner' },
    { label: 'نوع درخواست', key: 'type' },
    { label: 'معرف', key: 'refrencer' },
    { label: 'کارگزار', key: 'broker.name' },
    { label: 'قابلیت انجام', key: 'possibilityDo' },
    { label: 'وضعیت قرارداد', key: 'contractStatus' },
    { label: 'مبلغ کارگزاری', key: 'borokerMony' },
    { label: 'وضعیت پرداخت کارگزاری', key: 'PaymentStatus' },
    { label: 'شماره تماس', key: 'phone' },
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
                  value: falowUp.data.filter(item => item.id == check[0])[0],
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
              data={falowUp.data}
              headers={headers}
              filename={'لیست پیگیریها.csv'}
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
      </Row>

      <TableContainer component={Paper} style={{ direction: 'rtl', fontSize:"8px" }}>
        <Table sx={{ minWidth: 1500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={check.length == falowUp.data.length}
                  onChange={handelSelectAll}
                />
              </StyledTableCell>

              <StyledTableCell
              
                align="center"
                onClick={() => dispatch(sortData({ subject: 'owner' }))}
              >
                <SouthIcon />
                مالک
              </StyledTableCell>

              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'refrencer' }))}
              >
                <SouthIcon /> معرف
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'type' }))}
              >
                <SouthIcon />
                نوع درخواست
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'broker' }))}
              >
                <SouthIcon /> کارگزار
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'possibilityDo' }))}
              >
                <SouthIcon /> قابلیت انجام
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() =>
                  dispatch(sortData({ subject: 'contractStatus' }))
                }
              >
                <SouthIcon /> وضعیت قرارداد
              </StyledTableCell>
              <StyledTableCell
                align="center"
                onClick={() => dispatch(sortData({ subject: 'brokerMony' }))}
              >
                <SouthIcon /> مبلغ کارگزاری
              </StyledTableCell>
              <StyledTableCell align="center">
                {' '}
                وضعیت پرداخت کارگزاری
              </StyledTableCell>

              <StyledTableCell align="center"> توضیحات</StyledTableCell>

              <StyledTableCell>ردیف</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {falowUp.data.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <Checkbox
                    checked={check.includes(row.id)}
                    onChange={e => handelSelect(e, row.id)}
                  />
                </StyledTableCell>
                {/* مالک */}
                <StyledTableCell align="center">
                  {row.ownerType == 1 ? (
                    <a className="linkPhone" href={'tel:' + row.phone}>
                      {row.owner}
                    </a>
                  ) : (
                    '-----'
                  )}
                </StyledTableCell>

                {/*  معرف*/}
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.ownerType == 2 ? (
                    <a className="linkPhone" href={'tel:' + row.phone}>
                      {row.refrencer}
                    </a>
                  ) : (
                    '-----'
                  )}
                </StyledTableCell>
                {/* نوع درخواست */}

                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.type}
                </StyledTableCell>
                {/*  کارگزار*/}
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
                {/*  قابلیت انجام*/}
                <StyledTableCell
                  className={
                    row.possibilityDo == 'ندارد' ? 'ColorRed' : 'ColorGreen'
                  }
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.possibilityDo}
                </StyledTableCell>
                {/* وضعیت قرارداد */}
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
                {/* مبلغ کارگزاری */}
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  <NumberFormat
                    value={row.brokerMony}
                    className="foo"
                    displayType={'text'}
                    thousandSeparator={true}
                    renderText={value => <div>{value}</div>}
                  />
                </StyledTableCell>

                {/* وضعیت پرداخت */}
                <StyledTableCell
                  className={
                    row.paymentStatus == 'نشده' ? 'ColorRed' : 'ColorGreen'
                  }
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.paymentStatus}
                </StyledTableCell>

                {/* توضیحات */}
                <StyledTableCell
                  align="center"
                  onClick={() => {
                    setshowItem(2);
                    dispatch(setValue({ subject: 'newData', value: row }));
                  }}
                >
                  {row.desc}
                </StyledTableCell>
                {/* ردیف */}

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
  const [type, settype] = useState(-1);
  const [broker, setbroker] = useState(-1);
  const [possibilityDo, setpossibilityDo] = useState(-1);
  const [contractStatus, setcontractStatus] = useState(-1);
  const [paymentStatus, setpaymentStatus] = useState(-1);
  /*  */
  const filterForm = (
    <div className="modalBack">
      <Row className="modalForm">
        <Col xs={12} sm={12} md={12} xl={12} className="title">
          فیلتر ها را انتخاب کنید
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
            <Col>نوع درخواست</Col>
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
                <option>سقف اضافه </option>
                <option>پیشروی </option>
                <option> پارکینگ</option>
                <option> تغییر کاربری</option>
                <option> حقوقی</option>
                <option> صلح نامه</option>
                <option> تجاری</option>
                <option>مجری </option>
                <option>ناظر </option>
                <option>استهکام بنا </option>
                <option> انتقالی</option>
                <option>کارشناسی </option>
              </Form.Control>
            </Col>
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
                {falowUp.brokers.map(item => (
                  <option> {item.name} </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} xl={12} className="fieldItem">
          <Row>
            <Col>
              <Checkbox
                checked={possibilityDo != -1}
                onChange={e =>
                  e.target.checked == true
                    ? setpossibilityDo(0)
                    : setpossibilityDo(-1)
                }
              />
            </Col>
            <Col>قابلیت انجام</Col>
            <Col>
              <Form.Control
                className="fildeItemInput"
                as="select"
                size="sm"
                value={possibilityDo}
                custom
                onChange={e => setpossibilityDo(e.target.value)}
              >
                <option value={-1}> انتخاب کنید</option>
                <option>دارد</option>
                <option>ندارد</option>
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
            <Col>وضعیت پرداخت کارگزاری</Col>
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
          <Button
            className="btnForm"
            variant="warning"
            size="sm"
            onClick={() => {
              dispatch(
                search({
                  subject: 'filter',
                  value: {
                    type,
                    broker,
                    possibilityDo,
                    contractStatus,
                    paymentStatus,
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
        <meta name="description" content="Description of falowUp" />
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

FalowUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  falowUp: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  falowUp: makeSelectFalowUp(),
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
)(FalowUp);
