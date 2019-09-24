import React from 'react';
import UserProfileHeader from './UserProfileHeader'
import UserProfileDetails from './UserProfileDetails'
import UserProfileRoles from './UserProfileRoles';
import UserProfileFooter from './UserProfileFooter';

import { DataProvider } from '../common/Provider/DataProvider'
import { api } from '../../mock-data/api'
import { toast } from 'react-toastify';



export default class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            profileMode: { edit: false, addUserForm: true }, // the state of the profile form.
            // if addUserForm is set to false, its an add user form
            status: { deactivated: false, locked: false }, //the status of the user in the database. 
            userData: {
                details: {
                    id: +id ? id : undefined,
                    firstName: { value: '', errors: [], validations: { required: true } },
                    lastName: { value: '', errors: [], validations: { required: true } },
                    employeeNumber: { value: '', errors: [], validations: { required: true } },
                    workSite: { value: '', errors: [], validations: { required: true } },
                    country: { value: '', errors: [], validations: { required: true } },
                    managerName: { value: '', errors: [], validations: { required: true } },
                    manager: { value: '', errors: [], validations: { required: true } },
                    phone: { value: '', errors: [], validations: { required: true, isPhone:true, pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ } },
                    email: { value: '', errors: [], validations: { required: true, isEmail:true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ } },
                    department: { value: '', errors: [], validations: { required: true } },
                    lastLogin: undefined,
                },
                roles: [],
                non_userRoles: [],
                img: 'x'
            }
        }
        const allRoles = [];
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.unlockUser = this.unlockUser.bind(this)
        this.toggleRole = this.toggleRole.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.addUser = this.addUser.bind(this)
        this.deactivateUser = this.deactivateUser.bind(this)
        this.editUser = this.editUser.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
    }

    async componentDidMount() {
        await api.getRoles().then(result => {
            this.allRoles = result
        });


        if (this.state.userData.details.id) {
            api.getUserById(this.state.userData.details.id).then(({ employee, managerName, lastLogin, roles }) => {

                const non_userRoles = this.allRoles.filter((elem) => !roles.find(({ name }) => elem.name === name))


                this.setState({
                    profileMode: { edit: false, addUserForm: false },
                    status: { deactivated: employee.deactivated, locked: employee.locked }, // fix status values according to the backend
                    userData: {
                        details: {
                            id: +this.state.userData.details.id,
                            firstName: { ...this.state.userData.details.firstName, value: employee.firstName },
                            lastName: { ...this.state.userData.details.lastName, value: employee.lastName },
                            employeeNumber: { ...this.state.userData.details.employeeNumber, value: employee.number },
                            workSite: { ...this.state.userData.details.workSite, value: employee.workSite },
                            country: { ...this.state.userData.details.country, value: employee.country },
                            manager: { ...this.state.userData.details.manager, value: employee.managerId },
                            managerName: { ...this.state.userData.details.managerName, value: managerName },
                            phone: { ...this.state.userData.details.phone, value: employee.phone },
                            email: { ...this.state.userData.details.email, value: employee.email },
                            department: { ...this.state.userData.details.department, value: employee.department },
                            lastLogin: lastLogin,
                        },
                        roles: roles,
                        non_userRoles,
                        img: 'x'
                    }
                })
            })
        } else {
            this.setState({
                profileMode: { edit: true, addUserForm: true },
                userData: { ...this.state.userData, non_userRoles: this.allRoles }
            })


        }
    }

    toggleEditMode() {
        this.setState({
            profileMode: { edit: !this.state.profileMode.edit, addUserForm: false }
        })

    }

    unlockUser() {
        api.unlockUser(this.state.userData.details.id)
            .then(() => {
                this.setState({
                    status: { deactivated: false, locked: false },
                    profileMode: { edit: false, addUserForm: false },
                })
            })
    }

    addRoles(rolesSelected) {
        this.setState({
            userData: {
                ...this.state.userData,
                roles: [...this.state.userData.roles, ...rolesSelected],
            },
        }, () => {
            this.setState({
                userData: {
                    ...this.state.userData,
                    non_userRoles: this.allRoles.filter((elem) => !this.state.userData.roles.find(({ name }) => elem.name === name))
                }
            })
        })
    }

    removeRoles(rolesSelected) {
        this.setState({
            userData: {
                ...this.state.userData,
                roles: this.state.userData.roles.filter((elem) => !rolesSelected.find(({ name }) => elem.name === name))
            },
        }, () => {
            this.setState({
                userData: {
                    ...this.state.userData,
                    non_userRoles: this.allRoles.filter((elem) => !this.state.userData.roles.find(({ name }) => elem.name === name))
                }
            })
        })
    }

    toggleRole(rolesSelected) { //rolesSelected is an array of Roles. innerText to access the values
        if (!this.state.userData.roles.map(el => el.id).includes(rolesSelected[0].id)) {
            this.addRoles(rolesSelected);
        } else {
            this.removeRoles(rolesSelected);
        }
    }

    addUser() {
        api.addUser(this.state.userData)
            .then(res => {
                if (res.ok)
                   toast.success('User Successfully added')
                else {
                    toast.error('unable to add the user')
                }
            })
            .catch(err => console.error(err));
    }

    editUser() {
        api.updateUserDetails(this.state.userData)
            .then(res => {
                if (res.ok)
                    toast.success(`User ${this.state.firstName+' '+this.state.lastName } Successfully updated`)
                else {
                    toast.error(`Unable to update user ${this.state.firstName+' '+this.state.lastName }`)
                }
            })
            .catch(err => console.error(err));
    }

    handleRequiredValidation(name, value) {
        if (!value) {
            return `*${name} is required`;
        }
    }

    handlePatternValidation(name, value, pattern) {
        if (pattern) {
            // const pattern = new RegExp(pattern)
            if (!pattern.test(value)) {
                return `*invalid ${name}`;
            }
        }
    }

    handleInputChange({ target: { name, value } }) {
        const { validations } = this.state.userData.details[name];
        const errors = [];

        {/** required input validation */ }
        if (validations.required) {
            errors.push(this.handleRequiredValidation(name, value))
        }
        {/** Valid email input */ }
        if (validations.isEmail) {
            errors.push(this.handlePatternValidation(name, value, validations.pattern))
        }
        {/** Valid phone number  */ }
        if (validations.isPhone) {
            errors.push(this.handlePatternValidation(name, value, validations.pattern))
        }


        {/** Update the state with the errors if exist*/ }
        this.setState({
            userData: {
                ...this.state.userData,
                details: {
                    ...this.state.userData.details,
                    [name]: {
                        ...this.state.userData.details[name],
                        value,
                        errors
                    }
                }
            }
        });
    }

    deactivateUser() {
        api.deactivateUser(this.state.userData.details.id)
            .then(this.setState({
                status: { deactivated: true, locked: true },
                profileMode: { edit: false, addUserForm: false },
            }))
    }

    sendEmail(title, body) {
        toast.success('mail successfully sent')
        console.log('sending email to email: ' + this.state.userData.details.email.value)
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row p-0 m-0">
                        <div className="col-12 mb-2 mr-3 ml-3 p-0 mt-5">
                            <UserProfileHeader imgURL={this.state.userData.img}
                                employeeName={this.state.userData.details.firstName.value + " " + this.state.userData.details.lastName.value}
                                userState={this.state.status}
                                id={this.state.userData.details.id}
                                name={`${this.state.userData.details.firstName.value} ${this.state.userData.details.lastName.value}`}
                                employeeNumber={this.state.userData.details.employeeNumber.value}
                                edit={this.state.profileMode.edit}
                                toggleEditMode={this.toggleEditMode}
                            />
                            <DataProvider>
                                <UserProfileDetails editMode={!this.state.profileMode.edit}
                                    addUserForm={this.state.profileMode.addUserForm}
                                    details={this.state.userData.details}
                                    handleInputChange={this.handleInputChange}
                                    managerId={this.state.userData.details.manager.value} />

                                <UserProfileRoles editMode={!this.state.profileMode.edit}
                                    userRoles={this.state.userData.roles}
                                    non_userRoles={this.state.userData.non_userRoles}
                                    toggleRole={this.toggleRole} />
                            </DataProvider>
                            <UserProfileFooter editMode={!this.state.profileMode.edit}
                                name={`${this.state.userData.details.firstName.value} ${this.state.userData.details.lastName.value}`}
                                isLocked={this.state.status.locked}
                                unlockUser={this.unlockUser}
                                addUserForm={this.state.profileMode.addUserForm}
                                printRoles={this.printRoles}
                                addUser={this.addUser}
                                editUser={this.editUser}
                                deactivateUser={this.deactivateUser}
                                sendEmail={this.sendEmail} />


                        </div>
                    </div>
                </div>





            </>
        )
    }
}