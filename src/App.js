import React, { Component } from 'react';
import AnAutoRefreshingAPCCardWithSomeTips from './tryout-instances/a-configured-apc-card'

class App extends Component {
    render() {
        return (
            <div className="app">
                <AnAutoRefreshingAPCCardWithSomeTips fetchingDataIntervalTime="2000" />
            </div>
        );
    }
}

export default App;
