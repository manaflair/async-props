import hoistNonReactStatic from 'hoist-non-react-statics';
import React               from 'react';

export function prepare(loadCb) {

    return function wrapWithAsync(WrappedComponent) {

        return hoistNonReactStatic(class PrepareDecorator extends React.Component {

            static componentMustPrepare = loadCb;

            render() {

                return <WrappedComponent {... this.props} />;

            }

        }, WrappedComponent);

    };

}
