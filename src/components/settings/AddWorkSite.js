import React, { Component } from 'react'
import Select from 'react-select';
import countryList from 'react-select-country-list';
import InputErrors from '../shared-components/InputErrors'
import {DataProvider} from '../common/Provider/DataProvider';
import {DataContext} from '../common/Provider/DataProvider'


export class AddWorkSite extends Component {
    constructor(props) {
        super(props);
        this.options = countryList().getData()

        this.state = {
            country: { value: '', errors: [], validations: { required: true } },
            city: { value: '', errors: [], validations: { required: true, pattern: /^[A-Za-z . ,'-]+$/ } },
            worksite: { value: '', errors: [], validations: { required: true } },
            options: this.options,
            value: null,
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    changeHandler(value) {
        this.setState({ value: value, country: {...this.state.country, value: value.label} });
    }
    handleRequiredValidation(name, value) {
        if (!value) {
            return `*${name} is required`;
        }
    }

    handlePatternValidation(name, value, pattern) {
        if (pattern) {
            if (!pattern.test(value)) {
                return `*invalid ${name}`;
            }
        }
    }

    handleInputChange({ target: { name, value } }) {
        console.log(this.state)
        const { validations } = this.state[name];
        const errors = [];

        {/** required input validation */ }
        if (validations.required) {
            errors.push(this.handleRequiredValidation(name, value));
        }

        {/** Valid email input */ }
        errors.push(this.handlePatternValidation(name, value, validations.pattern))


        {/** Update the state with the errors if exist*/ }
        this.setState({
            [name]: {
                ...this.state[name],
                value: value,
                errors
            }
        });
    }


    submit(e) {
        e.preventDefault();
        let errors;
        // Test each field of the form for errors
        Object.keys(this.state).forEach(name => {
            
            if(this.state[name] && this.state[name].hasOwnProperty('value')){
                const {value, validations} = this.state[name];

                if (this.handleRequiredValidation(name, value) ||
                    this.handlePatternValidation(name, value, validations.pattern)) {
                    errors = true
                }
            }
        })

        if (!errors) {
            api.validatesubmit(this.state.city.value, this.state.worksite.value, this.state.country.value)
                .then(res => {
                    if (res.ok)
                        this.props.history.push('/')
                    else {
                        console.log('Error Logging in')
                    }
                })
                .catch(err => console.error(err));
        }
        else{
            alert('Please fill the missing')

        }
    }


    render() {
        const { country, region } = this.state;
        return (
            <>
                    <div className=" mt-2">
                        <h3 className="text-center">Work Site</h3>
                    </div>
                <div className="d-flex justify-content-around">




                    <div className="d-flex flex-column align-items-center col-9">

                        <p>Add new work site:</p>
                        <form onSubmit={this.submit}>
                            <div>
                                <label>Work site name:</label>
                                <div>
                                    <input type="text" className="form-control " placeholder="work site name" aria-label="worksite" aria-describedby="basic-addon1"
                                        name="worksite"
                                        defaultValue={this.state.worksite.value}
                                        onBlur={this.handleInputChange} />
                                </div>
                                <InputErrors errors={this.state.worksite.errors} />
                            </div>
                            <div>
                                <div>
                                <Select className=" mt-2" placeholder="Select Country"
                                    name="country"
                                    options={this.state.options}
                                    value={this.state.value}
                                    onChange={this.changeHandler}

                                />
                                <InputErrors errors={this.state.country.errors} />
                                </div>

                                <div>
                                    <label>City Name:</label>

                                    <input type="text" className="form-control" placeholder="City name" aria-label="city" aria-describedby="basic-addon1"
                                        name="city"
                                        defaultValue={this.state.city.value}
                                        onBlur={this.handleInputChange} />
                                </div>
                                <InputErrors errors={this.state.city.errors} />
                            </div>
                            <div>
                                
                                <Select className=" mt-2" placeholder="Select Country"
                                    name="country"
                                    options={this.state.options}
                                    value={this.state.value}
                                    onChange={this.changeHandler}

                               />

                                <InputErrors errors={this.state.country.errors} />
                                <div className="d-flex justify-content-around ">
                                    <button type="submit" className="btn btn-primary mt-3 mr-1">Save</button>
                                    <button type="button" className="btn btn-primary mt-3">Cancel</button>
                                </div>

                            </div>
                        </form>
                    </div>
                <div className="col-3">
                    <ul className="list-group">
                        <DataProvider>
                            <DataContext.Consumer>
                                {({worksites})=>worksites.map(worksite=><li class="list-group-item">{worksite.name}</li>)}
                            </DataContext.Consumer>
                        </DataProvider>
                    </ul>
                </div>

                </div>


            </>

        );
    }
}

export default AddWorkSite
