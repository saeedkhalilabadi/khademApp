/**
 *
 * BrancheMenu
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import GroupsIcon from '@mui/icons-material/Groups';
import LayersIcon from '@mui/icons-material/Layers';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpaIcon from '@mui/icons-material/Spa';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import { ButtonGroup, Button, Col, Row, Form } from 'react-bootstrap';
import MenuList from '@mui/material/MenuList';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {
  FcSupport,
  FcServices,
  FcSms,
  FcSurvey,
  FcAddDatabase,
  FcFactory,
  FcBullish,
  FcCollaboration,
  FcConferenceCall,
  FcOpenedFolder,
  FcSportsMode,
  FcSettings,
  FcMenu,
  FcBusinessman,
} from 'react-icons/fc';
import { AiOutlinePoweroff } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import { ImExit } from 'react-icons/im';
import { FaHome, FaSms } from 'react-icons/fa';
import Hidden from '@mui/material/Hidden';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AiOutlineDesktop, AiOutlineMobile } from 'react-icons/ai';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { logOut } from '../Routes/actions';
import { setValue } from './actions';
import makeSelectBrancheMenu from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './index.css';

import PaymentIcon from '@mui/icons-material/Payment';

export function BrancheMenu({ dispatch, props, brancheMenu, subject }) {
  useInjectReducer({ key: 'brancheMenu', reducer });
  useInjectSaga({ key: 'brancheMenu', saga });
  const [getdata, setgetdata] = useState(true);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // console.log(windowDimensions, 'screen');

  const [menulist, setmenulist] = useState('-220px');

  const menulist1 = (
    <MenuList>
      <Link to="/dashbord" className="linkstyle">
        <Col className="btn1">
          <HomeIcon className="menuIcons" />
          داشبورد
        </Col>
      </Link>
    </MenuList>
  );

  const menu = <div className="pcMenu">{menulist1}</div>;

  const menumob = (
    <div>
      {menulist == '0px' ? (
        <div className="menuback" onClick={() => setmenulist('-220px')} />
      ) : null}
      <div
        className="menulist"
        style={{ marginRight: menulist, transition: '1000ms' }}
      >
        {' '}
        <Col>
          <img
            src={require('../../images/logo.png')}
            style={{
              margin: 'auto',
              width: '100%',
            }}
          />
        </Col>
        {menulist1}
      </div>
    </div>
  );
  const btnmenumob = (
    <div>
      <MenuIcon
        style={{
          zIndex: '103',
          fontSize: '40px',
          cursor: 'pointer',
          position: 'fixed',
          top: '5px',
          right: '10px',
        }}
        onClick={() => setmenulist('0px')}
      />
      {menumob}
    </div>
  );

  const navTop_pc = (
    <div className='navTop'>
      

      <img className="navbarTopLogo" src={require('../../images/logo.png')} />
    </div>
  );

  const avat = (
    <>
      <Row className="avatar">
        <Col xs={3} sm={3} md={3} xl={3}>
          <Avatar
            style={{ width: '40px' }}
            alt="Remy Sharp"
            src={require('../../images/avatar.png')}
          />
        </Col>

        <Col xs={9} sm={9} md={9} xl={9} className="profilename">
          {' تهاتر شهرداری  '}
        </Col>
      </Row>
    </>
  );

  const navigationButton =
    windowDimensions.height < 580 ? null : (
      <Row className="navigationButton">
        <Col xs={3} sm={3} md={3} xl={3}>
          <Link to="/Dashbord" style={{ textDecoration: 'none' }}>
            <Col xs={12} sm={12} md={12} xl={12}>
              <HomeIcon
                className={
                  subject == 'Dashbord'
                    ? 'homeBtnSelected'
                    : 'homeBtnUnSelected'
                }
              />
            </Col>
            <Col xs={12} sm={12} md={12} xl={12}>
              خانه
            </Col>
          </Link>
        </Col>

        <Col xs={3} sm={3} md={3} xl={3}>
          <Link to="/Contractors" style={{ textDecoration: 'none' }}>
            <Col xs={12} sm={12} md={12} xl={12}>
              <ManageAccountsIcon
                className={
                  subject == 'Contractors'
                    ? 'homeBtnSelected'
                    : 'homeBtnUnSelected'
                }
              />
            </Col>
            <Col xs={12} sm={12} md={12} xl={12}>
              مطالبات
            </Col>
          </Link>
        </Col>
        <Col xs={3} sm={3} md={3} xl={3}>
          <Link to="/Falow" style={{ textDecoration: 'none' }}>
            <Col xs={12} sm={12} md={12} xl={12}>
              <AddTaskIcon
                className={
                  subject == 'Falow' ? 'homeBtnSelected' : 'homeBtnUnSelected'
                }
              />
            </Col>
            <Col xs={12} sm={12} md={12} xl={12}>
              پیگیری
            </Col>
          </Link>
        </Col>
        <Col xs={3} sm={3} md={3} xl={3}>
          <Link to="/Debtors" style={{ textDecoration: 'none' }}>
            <Col xs={12} sm={12} md={12} xl={12}>
              <AttachMoneyIcon
                className={
                  subject == 'Debtors' ? 'homeBtnSelected' : 'homeBtnUnSelected'
                }
              />
            </Col>
            <Col xs={12} sm={12} md={12} xl={12}>
              بدهکاران
            </Col>
          </Link>
        </Col>
      </Row>
    );

  const selectDivece = (
    <div
      className="selectDevice"
      onClick={() => {
        if (brancheMenu.device == 'mob') {
          dispatch(setValue('des'));
         // document.body.style.zoom = '100%';
        } else {
          dispatch(setValue('mob'));
          window.location.reload(false);
        }
      }}
    >
      {brancheMenu.device == 'mob' ? <AiOutlineDesktop /> : <AiOutlineMobile />}
    </div>
  );

  return (
    <div className="menu">
      {brancheMenu.device == 'des' ? (
        <Helmet>
          {' '}
          <meta name="viewport" content="width=1024" initial-scale="1.00" />
        </Helmet>
      ) : null}

      {selectDivece}
      {avat}
      {navTop_pc}

      {/* {windowDimensions.width > 1000 ? menu : null}
      {windowDimensions.width < 1000 ? btnmenumob : null} */}
      {navigationButton}
    </div>
  );
}

BrancheMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  brancheMenu: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  brancheMenu: makeSelectBrancheMenu(),
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
)(BrancheMenu);
