/**
 *
 * AlarmModal
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import DangerousIcon from '@mui/icons-material/Dangerous';
//import { AppsOutageIcon } from '@mui/icons-material';
import RuleIcon from '@mui/icons-material/Rule';
import { Col, Row, form, Button } from 'react-bootstrap';


import '../../src/allStyles.css';
import './index.css';

function AlarmModal({ follow_up, unpaid, falows, props, onClose }) {
 

  return (
    <div className="modalBack">
      <Row className="modalForm">
        <Col xs={12} sm={12} md={12} xl={12} className="title1">
          <RuleIcon className="title1Icons" />
          یاد آوری ها
        </Col>
        {follow_up > 0 ? (
          <Col xs={12} sm={12} md={12} xl={12} className="alarmItems">
            <DangerousIcon className="alarmIcons" />

            {follow_up + ' مورد پیگیری عقب افتاده دارید '}
          </Col>
        ) : null}
        {falows > 0 ? (
          <Col xs={12} sm={12} md={12} xl={12} className="alarmItems">
            <DangerousIcon className="alarmIcons" />

            {falows + ' مورد کار ارجاع نشده دارید '}
          </Col>
        ) : null}
        {unpaid > 0 ? (
          <Col xs={12} sm={12} md={12} xl={12} className="alarmItems">
            <DangerousIcon className="alarmIcons" />
            {unpaid + ' مورد تسویه نشده دارید '}
          </Col>
        ) : null}

        <Col xs={12} sm={12} md={12} xl={12}>
          <Button
            variant="warning"
            style={{ width: '80%', marginTop: '30px' }}
            onClick={() => onClose()}
          >
            تایید
          </Button>{' '}
        </Col>
      </Row>
    </div>
  );
}

AlarmModal.propTypes = {};

export default memo(AlarmModal);
