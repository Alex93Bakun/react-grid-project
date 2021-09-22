import React from 'react';
import { Container } from '@material-ui/core';

import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App = () => {
    return (
        <Container>
            <Header />
            <Main />
        </Container>
    );
};

export default App;
