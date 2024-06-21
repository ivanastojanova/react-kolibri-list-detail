import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { register } from "@public-ui/components";
import { defineCustomElements } from "@public-ui/components/dist/loader";
import { DEFAULT } from "@public-ui/themes";

import 'virtual:uno.css';
import './index.css';

register([DEFAULT], [defineCustomElements])
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch(console.warn);