/* @flow */
import R from 'ramda';
import React, {Component} from 'react'; // eslint-disable-line no-unused-vars
import {XlWidgetLabel} from './xl-widget-label';

type Props = {
    /*...*/
}

type State = {
    /*...*/
}

export class XlDipEnum extends Component {
    props: Props;
    state: State;

    componentWillMount() {
        this.state = {
            pristine: true
        };
        this.notifyAboutValidityChange(valid);
    }

    isDisabled(disabled, displayMode) {
        return disabled || displayMode === 'visual';
    };

    isValid({val, disabled, displayMode, required}) {
        return !required || isDisabled(disabled, displayMode) || val !== '';
    }

    componentWillReceiveProps(nextProps: Props) {
        const valid = this.isComponentValid(nextProps.model);
        if (valid !== this.state.valid) {
            this.notifyAboutValidityChange(valid);
            this.setState({valid});
        }
    }

    @autobind
    notifyAboutValidityChange(valid: boolean) {
        if (this.state.valid !== valid) {
            this.props.onValidityChange(valid);
        }
    }

    @autobind
    isComponentValid(model: string) {
        if (!model) {
            return isValid({
                disabled: this.props.disabled,
                displayMode: this.props.displayMode,
                required: R.path(['metadata', 'required'], this.props),
                val: model
            });
        }
        return R.contains(model)(this.props.metadata.enumValues || []);
    }

    render() {
        const {disabled, displayMode, metadata, register} = this.props;
        const {onModelChange, onPristinityChange, onValidityChange} = this.props;

        const labelElement = metadata ?
            <XlWidgetLabel options={{label: metadata.label, required: metadata.required}}/> : null;

        const autocompleteHandlers = (handlerMetadata) => ({
            addCandidates: (dummy, value) =>
                new Promise((resolve) => {
                    const filteredItems = R.filter((enamValue) =>
                        R.toLower(enamValue).indexOf(R.toLower(value)) >= 0
                        , handlerMetadata.enumValues);

                    resolve(R.map((name) => ({id: name}))(filteredItems));
                })
        });

        const autocompleteMetadata = R.omit(['label'], metadata);

        const isDisabled = disabled || displayMode === 'visual';

        return <div className="xl-components xl-dip-enum">
            {labelElement}
            <div>
                <XlWidgetAutocomplete
                    disabled={isDisabled}
                    handlers={autocompleteHandlers(metadata)}
                    metadata={autocompleteMetadata}
                    model={this.props.model}
                    onModelChange={onModelChange}
                    onPristinityChange={onPristinityChange}
                    onValidityChange={onValidityChange}
                    register={register}
                />
            </div>
        </div>;
    }
}