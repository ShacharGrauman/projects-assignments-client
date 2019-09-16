import React, { Component } from 'react'
import Select from 'react-select';
import countryList from 'react-select-country-list';

export class AddWorkSite extends Component {
    constructor(props) {
        super(props);
        this.options = countryList().getData()

        this.state = {
            country: '', region: '', city: { value: '', errors: [], validations: { required: true } }, worksite: { value: '', errors: [], validations: { required: true } },
            options: this.options,
            value: null,
        };
        this.inputChange = this.inputChange.bind(this);
    }
    changeHandler(value) {
        this.setState({ value })
    }
    inputChange({ target: { name, value } }) {
        const { validations } = this.state[name];
        const errors = [];
        if (validations.required) {
            if (!value) {
                errors.push(`${name} is required`);
            }
        }
        this.setState({
            [name]: {
                ...this.state[name],
                value: value,
                errors
            }
        });
    }
    onSubmit(e) {

        for (const key in this.state) {
            this.inputChange({ target: { value: this.state[key].value, name: key } })
        }
        e.preventDefault();
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }

    render() {
        const { country, region } = this.state;
        return (
            <>
                <div className="" role="">


                    <div className="row justify-content-center mt-2">
                        <h3>Work Site</h3>
                    </div>
                    <div className="d-flex flex-column align-items-center">

                        <p>Add new work site:</p>
                        <form onSubmit={this.onSubmit}>
                        <div>
                            <label>Work site name:</label>

                            <input type="text" className="form-control " placeholder="work site name" aria-label="worksite" aria-describedby="basic-addon1"
                                name="worksite"
                                defaultValue={this.state.worksite.value}
                                onBlur={this.inputChange} />
                        </div>
                        <div>
                            <label>City Name:</label>

                            <input type="text" className="form-control" placeholder="City name" aria-label="city" aria-describedby="basic-addon1"
                                name="city"
                                defaultValue={this.state.city.value}
                                onBlur={this.inputChange} />
                        </div>
                        <div>
                            <Select className=" mt-2" placeholder="Select Country"
                                options={this.state.options}
                                value={this.state.value}
                                onChange={this.changeHandler}
                            />
                            <div className="d-flex justify-content-around ">
                                <button type="submit" className="btn btn-primary mt-3 mr-1">Save</button>
                                <button type="submit" className="btn btn-primary mt-3">Cancel</button>
                            </div>

                        </div>
                        </form>
                    </div>

                    {/*
                     <form onSubmit={this.onSubmit}>
                        <div className="  d-flex flex-column align-items-center">
                            <div className=" mt-2">
                                <label>Work site name:</label>

                                <input type="text" className="form-control " placeholder="work site name" aria-label="worksite" aria-describedby="basic-addon1"
                                    name="worksite"
                                    defaultValue={this.state.worksite.value}
                                    onBlur={this.inputChange} />
                            </div>
                            <div className=" mt-2">
                                <div className="">
                                    <label>City Name:</label>
                                </div >
                                <input type="text" className="form-control" placeholder="City name" aria-label="city" aria-describedby="basic-addon1"
                                    name="city"
                                    defaultValue={this.state.city.value}
                                    onBlur={this.inputChange} />
                            </div>


                            <Select className=" mt-2" placeholder="Select Country"
                                options={this.state.options}
                                value={this.state.value}
                                onChange={this.changeHandler}
                            />

                        <div className="d-flex justify-content-around col-4">
                            <button type="submit" className="btn btn-primary mt-3 mr-1">Save</button>
                            <button type="submit" className="btn btn-primary mt-3">Cancel</button>

                        </div>
                        </div>
                    </form> */}
                </div>


            </>

        );
    }
}

export default AddWorkSite
