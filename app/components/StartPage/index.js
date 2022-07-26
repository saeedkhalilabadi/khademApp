/**
 *
 * StartPage
 *
 */


import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './index.css';

function StartPage() {
  return (
    <Row className='startPage'>
      <Col xs={12} sm={12} md={12} xl={12} className='startPagePic'>
        <img src={require('../../images/logo.png')}></img>
      </Col>
      <Col xs={12} sm={12} md={12} xl={12} className='startPageText'>
        تهاتر شهرداری
      </Col>
      <Col xs={12} sm={12} md={12} xl={12} className='startPagePutton'>


        <Link to="/dashbord" >
          <Button variant='warning' style={{ width: "100%" }}>
            ورود
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

StartPage.propTypes = {};

export default memo(StartPage);
