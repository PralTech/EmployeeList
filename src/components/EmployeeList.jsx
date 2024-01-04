import React, { useState } from 'react';
import './EmployeeList.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    contactMethods: [],
    maritalStatus: 'select',
    immediateJoiner: ' ',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'contactMethods') {
      const updatedContactMethods = checked
        ? [value]
        : [];

      setFormData({
        ...formData,
        contactMethods: updatedContactMethods,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === formData.id ? formData : employee
      );
      setEmployees(updatedEmployees);
      setIsEditing(false);
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      phoneNumber: '',
      contactMethods: [],
      maritalStatus: 'select',
      immediateJoiner: '',
    });
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setFormData(employeeToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      phoneNumber: '',
      contactMethods: [],
      maritalStatus: 'select',
      immediateJoiner: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className='heading'>Employee Form</h2>

        <form onSubmit={handleSubmit} >
          <div className="employee-form">
            <div className='form-label'>
              <label className='inputLabel'>First Name:</label>
              <label className='inputLabel'>Middle Name:</label>
              <label className='inputLabel'>Last Name:</label>
              <label className='inputLabel'>Gender:</label>
              <label className='inputLabel'>Phone Number:</label>
              <label className='inputLabel'>Mode of Contact:</label>
              <label className='inputLabel'>Immediate Joiner:</label>
              <label className='inputLabel'>Marital Status:</label>
            </div>


            <div className='form-input'>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <div className="gender-options">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    required
                  />
                  Male
                </label>
                <label  style={{marginLeft:"1rem"}}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    required
                  />
                  Female
                </label>
                <label  style={{marginLeft:"1rem"}}>
                  <input
                    type="radio"
                    name="gender"
                    value="others"
                    checked={formData.gender === 'others'}
                    onChange={handleInputChange}
                    required
                  />
                  Others
                </label>
              </div>

              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />

              <div className="contact-methods">
                <label>
                  <input
                    type="checkbox"
                    name="contactMethods"
                    value="email"
                    checked={formData.contactMethods.includes('email')}
                    onChange={handleInputChange}
                   
                  />
                  Email
                </label>

                <label  style={{marginLeft:"1rem"}}>
                  <input
                    type="checkbox"
                    name="contactMethods"
                    value="phone"
                    checked={formData.contactMethods.includes('phone')}
                    onChange={handleInputChange}
                  />
                  Phone
                </label>
              </div>

              <div className="immediate-joiner-options">
                <label>
                  <input
                    type="radio"
                    name="immediateJoiner"
                    value="Yes"
                    checked={formData.immediateJoiner === 'Yes'}
                    onChange={handleInputChange}
                    required
                  />
                  Yes
                </label>
                <label  style={{marginLeft:"1.5rem"}}>
                  <input
                    type="radio"
                    name="immediateJoiner"
                    value="No"
                    checked={formData.immediateJoiner === 'No'}
                    onChange={handleInputChange}
                    required
                  />
                  No
                </label>
              </div>

              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className='maritalStatus' required>
                <option value="select">Select</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>

            </div>

          </div>

          <div className="form-buttons">
            <button type="submit" className='btn-primary'>{isEditing ? 'Update' : 'Submit'}</button>
            <button type="button" className='btn-primary' onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="table-container">
        {
          (employees.length > 0) ?
            <table className="employees-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Contacts</th>
                  <th>Marital Status</th>
                  <th>Immediate Joiner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.middleName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.contactMethods.join(', ')}</td>
                    <td>{employee.maritalStatus}</td>
                    <td>{employee.immediateJoiner}</td>


                    <td className="action-buttons">
                      <button onClick={() => handleEdit(employee.id)}>
                        <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} />
                      </button>
                      <button onClick={() => handleDelete(employee.id)} style={{marginLeft:"1rem"}}>
                        <FontAwesomeIcon icon={faTrash} style={{ color: 'red'}}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <h3>Employee data is not available please fill the form</h3>
        }


      </div>
    </div>
  );
};

export default EmployeeList;
