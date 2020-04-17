import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from 'next-redux-wrapper';
import store from '../redux/store';
import Header from '../components/Header';
import '../styles/global.css';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas';
import rootReducer from '../redux/reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
const saga = createSagaMiddleware();
// const store = createStore(
//   rootReducer,
//   undefined,
//   applyMiddleware(saga)
// );
// saga.run(rootSaga);

const makeStore = initialState => {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(saga)
    );
    saga.run(rootSaga);
    return store;
  };

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {};
        return { pageProps: pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <>
                <Header />
                <div id="pageContent" role="main">
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </div>
            </>
        );
    }
}

// const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
