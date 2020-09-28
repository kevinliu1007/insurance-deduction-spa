/* eslint-disable require-jsdoc */
import './app/paylocity/assets/App.scss';
import React from 'react';
import { Provider } from './app/paylocity/context/InsuranceDeductionContext';
import InsuranceDeductionComponent from './app/paylocity/components/InsuranceDeductionComponent';
import TopNavComponent from './app/paylocity/components/TopNavComponent';
import ScrollToTopComponent from './app/paylocity/components/ScrollToTopComponent';

function App() {
  return (
    <div className="App">
      <Provider>
        <TopNavComponent />
        <InsuranceDeductionComponent />
        <ScrollToTopComponent />
      </Provider>
    </div>
  );
}

export default App;
