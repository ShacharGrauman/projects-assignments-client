import React, { Component } from 'react'
import Select from 'react-select';
import countryList from 'react-select-country-list';
import InputErrors from '../shared-components/InputErrors'
import { DataProvider } from '../common/Provider/DataProvider';
import { DataContext } from '../common/Provider/DataProvider'
import { toast } from 'react-toastify'
import { api } from '../../mock-data/api'


export class AddWorkSite extends Component {
    constructor(props) {
        super(props);
        this.options = countryList().getData()

        this.state = {
            country: { value: '', errors: [], validations: { required: true } },
            city: { value: '', errors: [], validations: { required: true, pattern: /^[A-Za-z . ,'-]+$/ } },
            worksite: { value: '', errors: [], validations: { required: true } },
            countryList: {
                options: this.options,
                value: null,
                validations: { required: false }
            }
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    changeHandler(value) {
        this.setState({
            countryList: { ...this.state.countryList, value: value },
            country: { ...this.state.country, value: value.label }
        });
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

            if (this.state[name] && this.state[name].hasOwnProperty('value')) {
                const { value, validations } = this.state[name];
                console.log(name)
                if (this.handleRequiredValidation(name, value) ||
                    this.handlePatternValidation(name, value, validations.pattern)) {
                    errors = true
                }
            }
        })

        if (!errors) {
            const finalResulr = {
                country: this.state.country,
                worksite: this.state.worksite,
                city: this.state.city
            }
            const result = api.addworksite({
                country: this.state.country.value,
                city: this.state.city.value,
                worksite: this.state.worksite.value
            })

            console.log(result)
            if (result.Ok) {
                toast.success("Successfully added new Work Site")
            }
            else {
                toast.error("Unable to add this work site")
            }
        }
        else {
            toast.error("Please fill the missing")

        }
    }


    render() {
        const { country, region } = this.state;
        return (
            <>
                <div className=" mt-2">
                    <h5 className="text-center">Work Site</h5>
                </div>
                <div className="d-flex justify-content-around flex-xs-column col-12 ">

                    <div className="d-flex flex-column align-items-center ">

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
                                        options={this.state.countryList.options}
                                        value={this.state.countryList.value}
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

                                <div className="d-flex justify-content-around ">
                                    <button type="submit" className="btn btn-primary mt-3 mr-1">Save</button>                                </div>

                            </div>
                        </form>
                    </div>
                </div>
                    <div className="col-9 mx-auto mt-3" style={{ maxHeight: '40vh', overflow: 'scroll' }} >
                        <ul className="list-group">
                            <DataProvider>
                                <DataContext.Consumer>
                                    {({ worksites }) => worksites.map(worksite => <li className="list-group-item">{worksite.name+ ' ,' + worksite.country.name}</li>)}
                                </DataContext.Consumer>
                            </DataProvider>
                        </ul>
                    </div>



            </>

        );
    }
}

export default AddWorkSite
