# [![Async-Props](/logo.png?raw=true)](https://github.com/manaflair/async-props)

> Easy React/Redux data preload

[![](https://img.shields.io/npm/v/@manaflair/async-props.svg)]() [![](https://img.shields.io/npm/l/@manaflair/async-props.svg)]()

[Check out our other OSS projects!](https://manaflair.github.io)

## Installation

```
$> npm install --save @manaflair/async-props
```

## Usage

```js
import { prepare } from '@manaflair/async-props';

@prepare((props, context) => {

    return fetch(`https://httpbin.org/ip`).then(res => {
        return res.json();
    }).then(({ origin }) => {
        return { origin };
    });

})

class Post extends React.Component {

    static propTypes = {

        origin: React.PropTypes.string.isRequired

    };

    render() {

        return <div>
            <p>Your IP is: {this.props.origin}</p>
        </div>;

    }

}
```

## Usage w/ Redux

```js
import { prepare } from '@manaflair/async-props';
import { connect } from 'react-redux';

@prepare((state, props, context, dispatch) => {

    return fetch(`https://httpbin.org/ip`).then(res => {
        return res.json();
    }).then(({ origin }) => {
        dispatch({ type: `ORIGIN_SET`, origin });
    });

})

@connect((state, props) => ({

    origin: state.origin

}))

class Post extends React.Component {

    static propTypes = {

        origin: React.PropTypes.string.isRequired

    };

    render() {

        return <div>
            <p>Your IP is: {this.props.origin}</p>
        </div>;

    }

}
```

## License (MIT)

> **Copyright © 2016 Manaflair**
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
