import { Loader } from './Loader';

export class AsyncProvider extends React.Component {

    static contextTypes = {

        store: React.PropTypes.object.isRequired

    };

    static propTypes = {

        context: React.PropTypes.object,

        children: React.PropTypes.node

    };

    static defaultProps = {

        children: () => {}

    };

    static childContextTypes = {

        loader: React.PropTypes.instanceOf(Loader).isRequired

    };

    constructor(props, context) {

        super(props, context);

        this.loader = new Loader({
            store: context.store,
            context: this.props.context
        });

    }

    getChildContext() {

        return { loader: this.loader };

    }

    render() {

        return this.props.children;

    }

}
