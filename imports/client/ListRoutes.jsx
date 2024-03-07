import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { App } from './App';
import { SondageItem } from '../client/components/SondageItem';

export const ListRoutes = () => {

    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/sondage/:id" element={<SondageItem />} />
          </Route>
        </Routes>
      </Router>
    )
}
