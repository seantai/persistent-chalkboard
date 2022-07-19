import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import { initContract } from './assets/js/near/utils'

import * as buffer from "buffer";
(window).Buffer = buffer.Buffer;

const container = document.querySelector('#root')
const root = createRoot(container) 

window.nearInitPromise = initContract()
  .then(() => {
    root.render(
        <App />
    );
  })

