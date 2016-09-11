import { isArray, isFunction, isNull, isPlainObject, zipObject } from 'lodash';
import { RouterContext }                                         from 'react-router';

import { Loader }                                                from './Loader';

function prepareComponent(component, loader, props) {

    if (isArray(component))
        return prepareArray(component, loader, props);

    if (isPlainObject(component))
        return prepareObject(component, loader, props);

    if (!isFunction(component))
        return component;

    if (!Reflect.has(component, `componentMustPrepare`))
        return component;

    // JSX conventions require upper camelcase
    let Component = component;

    return loader.load(component.componentMustPrepare.bind(component), props).then(extraProps => {
        return props => <Component {... props} {... extraProps} />;
    });

}

function prepareArray(array, loader, props) {

    return Promise.all(array.map(component => {
        return prepareComponent(component, loader, props);
    }));

}

function prepareObject(object, loader, props) {

    return Promise.all([

        Object.keys(object),
        prepareArray(Object.values(object), loader, props)

    ]).then(([ keys, values ]) => {

        return zipObject(keys, values);

    });

}

class InternalAsyncRenderer extends React.Component {

    static propTypes = {

        loader: React.PropTypes.shape({
            load: React.PropTypes.func.isRequired
        }).isRequired,

        components: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
            React.PropTypes.objectOf(React.PropTypes.func),
            React.PropTypes.func
        ])).isRequired

    };

    constructor(props) {

        super(props);

        this.state = { routerProps: null };

    }

    componentWillMount() {

        this.processProps(this.props);

    }

    componentWillReceiveProps(nextProps) {

        this.processProps(nextProps);

    }

    processProps({ components, ... props }) {

        prepareArray(components, this.props.loader, props).then(components => {
            this.setState({ routerProps: { components, ... props } });
        });

    }

    render() {

        if (isNull(this.state.routerProps))
            return null;

        return <RouterContext {... this.state.routerProps} />;

    }

}

export class AsyncRenderer extends React.Component {

    static contextTypes = {

        store: React.PropTypes.any

    };

    constructor(props, context) {

        super(props, context);

        this.loader = new Loader({ store: this.context.store, context: this.context });

    }

    render() {

        return <InternalAsyncRenderer loader={this.loader} {... this.props} />;

    }

}
