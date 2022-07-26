/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import AOS from 'aos';
import Routes from '../Routes/loadable';

import GlobalStyle from '../../global-styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0 10px;
  flex-direction: column;
  font-family: 'B-Nazanin';
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="خانه - %s" defaultTitle="تهاتر شهرداری" />

      <Routes />

      <GlobalStyle />
    </AppWrapper>
  );
}
