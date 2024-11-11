import React, {createRef} from 'react';

import StatusBarAppComponent from './StatusBarAppComponent';
import type {StatusBarAppProps} from './types';

class StatusBarAppManager {
    currentStatusBarApp: StatusBarApp | null = null;

    register(instance: StatusBarApp) {
        if (instance) this.currentStatusBarApp = instance;
    }

    getCurrent() {
        return this.currentStatusBarApp;
    }
}

const StatusBarAppMng = new StatusBarAppManager();

export const setStatusBarApp = (properties: StatusBarAppProps) => {
    const ref = StatusBarAppMng.getCurrent();
    ref?.setStatusBarProps(properties);
};

class StatusBarApp extends React.PureComponent<StatusBarAppProps, StatusBarAppProps> {
    statusBarRef: React.RefObject<any> | null;

    constructor(props: StatusBarAppProps) {
        super(props);
        this.statusBarRef = createRef();
        this.state = {...props};
    }

    componentDidMount(): void {
        StatusBarAppMng.register(this);
    }

    setStatusBarProps(properties: StatusBarAppProps) {
        this.setState({...this.state, ...properties});
    }

    render(): React.ReactNode {
        return <StatusBarAppComponent {...this.state} />;
    }
}

export default StatusBarApp;
