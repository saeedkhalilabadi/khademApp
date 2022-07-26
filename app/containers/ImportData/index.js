/**
 *
 * ImportData
 *
 */

import React, { memo, useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectImportData from './selectors';
import reducer from './reducer';
import saga from './saga';
import './index.css';
export function ImportData() {
  useInjectReducer({ key: 'importData', reducer });
  useInjectSaga({ key: 'importData', saga });
  const [data3, setdata3] = useState(0);

  const Data = (
    <Row style={{ marginTop: '100px' }}>
      <Col>
        بدهکاران
        <input
          type="file"
          onChange={e => {
            fileHandler(e);
          }}
        />
      </Col>
      <Col>بدهکاران</Col>
    </Row>
  );

  const fileHandler = event => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err, 'err');
      } else {
        setdata3({
          cols: resp.cols,
          rows: resp.rows,
        });
        console.log(resp.cols, resp.rows, 'data');
      }
    });
  };

  let data2 = [];

  const keys = item => {
    data2.push({
      id: item[21],
      ownerType: item[0] ? 2 : 1,
      owner: item[0],
      amount: item[1],
      paymentTerms: item[2],
      refrencer: item[3],
      refrencerName: item[4],
      refrencerPhone: item[1],
      broker: {
        name: item[6],
        phone: '0',
      },
      brokerNum: item[1],
      date: item[14],
      all: item[7],
      customer: item[8],
      me: item[9],
      contractStatus: item[10],
      referenceStatus: item[11],
      paymentStatus: item[12],
      paymentDate: item[14],
      paymentDateStr: item[14],
      brokeragePaymentStatus: item[13],
      type: item[15],
      location: item[16],
      desc: item[20],
      phone: item[17],
      refrencerPercentage: item[18],
      refrencerPaymentStatus: item[19],
      createDateSTR: item[22],
    });
  };

  let deptersObject = {
    id: 2,
    owner: '',
    ownerType: '2',
    amount: '123',
    paymentTerms: 'اقساطی',
    refrencer: 0,
    refrencerName: 'تست2',
    refrencerPhone: '09354481384',
    broker: {
      name: 'توانا',
      phone: ' 09015074007',
    },
    brokerNum: '2',
    all: '3',
    customer: '1.4',
    me: '1.8',
    date: '',
    contractStatus: 'شده',
    referenceStatus: 'نشده',
    paymentStatus: 'شده',
    paymentDate: {
      year: 1400,
      month: 11,
      day: 10,
    },
    paymentDateSTR: '1400/11/10',
    brokeragePaymentStatus: 'شده',
    type: 'گواهی مفاصاحساب',
    location: '10',
    desc: 'سیبب',
    phone: '',
    refrencerPercentage: '4',
    refrencerPaymentStatus: 'نشده',
    createDate: {
      year: 1400,
      month: 11,
      day: 12,
    },
    createDateSTR: '1400/11/12',
  };

  console.log('data2', data2);
  return (
    <div>
      <Helmet>
        <title>ImportData</title>
        <meta name="description" content="Description of ImportData" />
      </Helmet>

      <Button
        onClick={() => localStorage.setItem('Debtors', JSON.stringify(data2))}
      >
        ثبت
      </Button>

      {Data}

      {data3 == 0
        ? null
        : data3.rows.map((data, index) => (
            <Col sm={12}>
              {index > 0 ? keys(data) : null}
              <Row className="rowstable">
                <Col>{data[0]}</Col>
                <Col>{data[1]}</Col>
                <Col>{data[2]}</Col>
                <Col>{data[3]}</Col>
                <Col>{String(data[4])}</Col>
                <Col>{String(data[5])}</Col>
                <Col>{String(data[6])}</Col>
                <Col>{String(data[7])}</Col>
                <Col>{String(data[8])}</Col>
                <Col>{String(data[9])}</Col>
                <Col>{String(data[10])}</Col>
                <Col>{String(data[11])}</Col>
                <Col>{String(data[12])}</Col>
                <Col>{String(data[13])}</Col>
                <Col>{String(data[14])}</Col>
                <Col>{String(data[15])}</Col>
                <Col>{String(data[16])}</Col>
                <Col>{String(data[17])}</Col>
                <Col>{String(data[18])}</Col>
                <Col>{String(data[19])}</Col>
                <Col>{String(data[20])}</Col>
                <Col>{String(data[21])}</Col>
                <Col>{String(data[22])}</Col>
                <Col>{String(data[23])}</Col>
                <Col>{String(data[24])}</Col>
              </Row>
            </Col>
          ))}
    </div>
  );
}

ImportData.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  importData: makeSelectImportData(),
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
)(ImportData);
