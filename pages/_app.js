import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import Header from '../components/Header';
import '../styles/global.css';
import createStore from '../redux/store';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return { pageProps };
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

export default withRedux(createStore)(withReduxSaga(MyApp));
