/**
 *
 * Routes
 *
 */

import React, { ReactDOM, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment-jalaali';
import fa from 'moment/src/locale/fa';

import { Switch, Route, Redirect } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import BrancheMenu from '../BrancheMenu/Loadable';
import Dashbord from '../Dashbord/Loadable';
import Contractors from '../Contractors/Loadable';
import Debtors from '../Debtors/Loadable';
import FalowUp from '../FalowUp/Loadable';
import ImportData from '../ImportData/Loadable';
import StartPage from '../../components/StartPage/Loadable';

import makeSelectRoutes from './selectors';
import reducer from './reducer';
import saga from './saga';
import { GetUserData } from './actions';
import './index.css';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function Routes({ dispatch, data1 }) {
  useInjectReducer({ key: 'routes', reducer });
  useInjectSaga({ key: 'routes', saga });
  const [user, setuser] = useState(false);

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

  const m = moment();
  /*  console.log('date', {
    year: m.jYear(),
    month: m.jMonth() + 1,
    day: m.jDate(),
  });
 */
  const date = {
    year: m.jYear(),
    month: m.jMonth() + 1,
    day: m.jDate(),
  };

  setTimeout(() => {
    if (!user) {
      dispatch(GetUserData());
      setuser(true);
    }
  }, 100);

  const employee = (
    <Switch>
      <Route
        exact
        path="/StartPage"
        render={substate => (
          <div>
            <StartPage
              props={{
                screen: windowDimensions,
                subject: 'StartPage',
                data1,
                date,
              }}
            />
          </div>
        )}
      />
      <Route
        exact
        path="/import"
        render={substate => (
          <div>
            <BrancheMenu subject="Dashbord" props={{ data1, date }} />
            <ImportData
              props={{
                screen: windowDimensions,
                subject: 'Dashbord',
                data1,
                date,
              }}
            />
          </div>
        )}
      />
      <Route
        exact
        path="/Dashbord"
        render={substate => (
          <div>
            <BrancheMenu subject="Dashbord" props={{ data1, date }} />
            <Dashbord
              props={{
                screen: windowDimensions,
                subject: 'Dashbord',
                data1,
                date,
              }}
            />
          </div>
        )}
      />
      <Route
        exact
        path="/Falow"
        render={substate => (
          <div>
            <BrancheMenu subject="Falow" props={{ data1, date }} />
            <FalowUp
              id={0}
              props={{
                screen: windowDimensions,
                subject: 'Falow',
                data1,
                date,
              }}
            />
          </div>
        )}
      />
      <Route
        exact
        path="/Contractors"
        render={substate => (
          <div>
            <BrancheMenu subject="Contractors" props={{ data1, date }} />
            <Contractors
              id={0}
              props={{
                screen: windowDimensions,
                subject: 'Contractors',
                data1,
                date,
              }}
            />
          </div>
        )}
      />
      <Route
        exact
        path="/Debtors"
        render={substate => (
          <div>
            <BrancheMenu subject="Debtors" props={{ data1, date }} />
            <Debtors
              id={0}
              props={{
                screen: windowDimensions,
                subject: 'Debtors',
                data1,
                date,
              }}
            />
          </div>
        )}
      />

      <Redirect to="/StartPage" />
    </Switch>
  );

  return (
    <div
      className="bodyroute"
      style={{
        marginTop: '50px',
        marginBottom: '70px',
      }}
    >
      {employee}
    </div>
  );
}

Routes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data1: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  routes: makeSelectRoutes(),
  data1: makeSelectRoutes(),
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
)(Routes);
