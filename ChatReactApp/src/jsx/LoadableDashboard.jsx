import React from "react";
import Loading from './Loading.jsx';
import Loadable from 'react-loadable';
//import App from './App';
const LoadableComponent = Loadable ({
    loader: () => import('./App.jsx'),
    loading: Loading,
})
export default class LoadableDashboard extends React.Component {
    render() {
        return <LoadableComponent/>
    }
}

