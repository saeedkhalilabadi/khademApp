/**
 *
 * Dashbord
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import { Col, Row, Form, Button } from 'react-bootstrap';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';


import NumberFormat from 'react-number-format';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Dbtors from '../Debtors/Loadable';
import FalowUp from '../FalowUp/Loadable';
import Contractors from '../Contractors/Loadable';

import makeSelectDashbord from './selectors';
import { getData, setCloseAlarm } from './actions';
import reducer from './reducer';
import saga from './saga';

import MyAlert from '../../components/MyAlert/Loadable';
import './index.css';
import '../../src/allStyles.css';

export function Dashbord({ dashbord, props, dispatch }) {
  useInjectReducer({ key: 'dashbord', reducer });
  useInjectSaga({ key: 'dashbord', saga });

  const [value, setValue] = React.useState(1);
  const [getdata, setgetdata] = React.useState(true);
  const [showItem, setshowItem] = React.useState(null);

  /* play audio */

  if (getdata) {
    setTimeout(() => {
      setgetdata(false);
      dispatch(getData(props.date));
    }, 200);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const follow_upList = (
    <Row style={{ textAlign: 'center' }}>
      {dashbord.follow_up.length == 0 ? (
        <Col xs={12} sm={12} md={12} xl={12} className="ownerCreate">
          هیچ موردی یافت نشد
        </Col>
      ) : (
        dashbord.follow_up.map(item => (
          <Col
            xs={12}
            sm={12}
            md={12}
            xl={12}
            className="back3 dashboardlist"
            onClick={() =>
              setshowItem(
                <Contractors
                  id={item.id}
                  props={props}
                  onClose={() => {
                    setshowItem(null);
                    dispatch(getData(props.date));
                  }}
                />,
              )
            }
          >
            <Row>
              <Col xs={3} sm={3} md={2} xl={2} className="ownertype">
                {item.ownerType == 1 ? 'مالک' : null}
                {item.ownerType == 2 ? 'معرف' : null}
              </Col>
              <Col xs={6} sm={6} md={3} xl={2} className="ownerName">
                {item.ownerType == 1 ? item.ownerOfClaims : null}
                {item.ownerType == 2 ? item.introduced : null}
              </Col>

              <Col xs={4} sm={4} md={2} xl={2} className="ownerAmont">
                <NumberFormat
                  value={item.amountOfClaims}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={value => <div>{' مبلغ:' + value}</div>}
                />
              </Col>
              <Col xs={4} sm={4} md={2} xl={2} className="ownerAmont">
                {item.statusOfReceivables}
              </Col>
              <Col xs={4} sm={4} md={2} xl={2} className="ownerAmont">
                {item.dateSTR}
              </Col>
            </Row>
          </Col>
        ))
      )}
    </Row>
  );
  const unpaidList = (
    <Row style={{ textAlign: 'center' }}>
      {dashbord.unpaid.length == 0 ? (
        <Col xs={12} sm={12} md={12} xl={12} className="ownerCreate">
          هیچ موردی تسویه نشده یافت نشد
        </Col>
      ) : (
        dashbord.unpaid.map(item => (
          <Col
            xs={12}
            sm={12}
            md={12}
            xl={12}
            className="back3 dashboardlist"
            onClick={() =>
              setshowItem(
                <Dbtors
                  id={item.id}
                  props={props}
                  onClose={() => {
                    setshowItem(null);
                    dispatch(getData(props.date));
                  }}
                />,
              )
            }
          >
            <Row>
              <Col xs={6} sm={6} md={3} xl={2} className="ownerName">
                {item.ownerType == 1 ? item.owner : null}
                {item.ownerType == 2 ? item.refrencerName : null}
              </Col>
              <Col xs={6} sm={6} md={3} xl={2} className="ownerCreate">
                <NumberFormat
                  value={item.amount}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={value => <div>{'مبلغ: ' + value}</div>}
                />
              </Col>

              <Col xs={4} sm={4} md={2} xl={2} className="ownerAmont">
                {item.type}
              </Col>
              <Col xs={4} sm={4} md={2} xl={2} className="ownerdate">
                {'منطقه:' + item.location}
              </Col>
              <Col xs={4} sm={4} md={2} xl={2} className="ownerdate">
                {item.broker.name}
              </Col>
            </Row>
          </Col>
        ))
      )}
    </Row>
  );
  const falowsList = (
    <Row style={{ textAlign: 'center' }}>
      {dashbord.falows.length == 0 ? (
        <Col xs={12} sm={12} md={12} xl={12} className="ownerCreate">
          هیچ موردی برای پیگیری یافت نشد
        </Col>
      ) : (
        dashbord.falows.map(item => (
          <Col
            xs={12}
            sm={12}
            md={12}
            xl={12}
            className="back3 dashboardlist"
            onClick={() =>
              setshowItem(
                <FalowUp
                  id={item.id}
                  props={props}
                  onClose={() => {
                    setshowItem(null);
                    dispatch(getData(props.date));
                  }}
                />,
              )
            }
          >
            <Row>
              <Col xs={6} sm={6} md={3} xl={2} className="ownerName">
                {item.ownerType == 2 ? item.refrencer : null}
                {item.ownerType == 1 ? item.owner : null}
              </Col>

              <Col xs={3} sm={3} md={2} xl={2} className="ownertype">
                {item.type}
              </Col>
              <Col xs={3} sm={3} md={2} xl={2} className="ownertype">
                {item.createDateSTR}
              </Col>
              <Col xs={6} sm={6} md={2} xl={2} className="ownerAmont">
                {'کارگزار: ' + item.broker.name}
              </Col>
              <Col xs={4} sm={4} md={2} xl={2} className="ownerAmont">
                <NumberFormat
                  value={item.brokerMony}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={value => <div>{'مبلغ کارگزاری: ' + value}</div>}
                />
              </Col>
            </Row>
          </Col>
        ))
      )}
    </Row>
  );

  const dashboardTabs = (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      <Badge color="warning" badgeContent={dashbord.unpaid.length}>
        <Tab
          onClick={() => setValue(0)}
          className={value == 0 ? 'tabs' : 'tabsSelected'}
          label="بدهکاران"
        />
      </Badge>
      <Badge color="warning" badgeContent={dashbord.falows.length}>
        <Tab
          onClick={() => setValue(1)}
          className={value == 1 ? 'tabs' : 'tabsSelected'}
          label=" پیگیری ها"
        />
      </Badge>
      <Badge color="warning" badgeContent={dashbord.follow_up.length}>
        <Tab
          onClick={() => setValue(2)}
          className={value == 2 ? 'tabs' : 'tabsSelected'}
          label="مطالبات"
        />
      </Badge>
    </Tabs>
  );
 
  return (
    <div
      className={
        props.screen.width > 1000
          ? 'mainBodyDashbord'
          : 'mainBodyDashbordMobile'
      }
    >
      <Helmet>
        <title>داشبورد</title>
        <meta name="description" content="Description of Dashbord" />
       
      </Helmet>
    

      {showItem == null ? (
        <>
          {dashbord.closeAlarm1 == false && dashbord.falows.length > 0 ? (
            <MyAlert
              message={
                dashbord.falows.length + ' مورد پیگیری عقب افتاده دارید '
              }
              severity="error"
              open1={() => dispatch(setCloseAlarm(1))}
            />
          ) : null}
          {dashbord.closeAlarm2 == false && dashbord.follow_up.length > 0 ? (
            <MyAlert
              message={
                dashbord.follow_up.length + ' مورد کار ارجاع نشده دارید '
              }
              severity="error"
              open1={() => dispatch(setCloseAlarm(2))}
            />
          ) : null}
          {dashbord.closeAlarm3 == false && dashbord.unpaid.length > 0 ? (
            <MyAlert
              message={dashbord.unpaid.length + ' مورد تسویه نشده دارید '}
              severity="error"
              open1={() => dispatch(setCloseAlarm(3))}
            />
          ) : null}

          {dashboardTabs}
          {value == 2 ? follow_upList : null}
          {value == 1 ? falowsList : null}
          {value == 0 ? unpaidList : null}
        </>
      ) : (
        showItem
      )}
    </div>
  );
}

Dashbord.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashbord: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashbord: makeSelectDashbord(),
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
)(Dashbord);
