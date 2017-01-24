/* @flow */
import React, {Component} from 'react'; // eslint-disable-line no-unused-vars

type Props = {
    options: {
        label?: string,
        required?: boolean
    }
}

export class XlWidgetLabel extends Component {
    props: Props;

    createRequired() {
        return this.props.options.required ? <span className="required">*</span> : null;
    }

    render() {
        return (
            <div className="xl-components-label">
                <label>
                    {this.props.options.label}
                    {this.createRequired()}
                </label>
            </div>
        );
    }
}