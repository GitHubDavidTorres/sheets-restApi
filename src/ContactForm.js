import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './ContacForm.css';

function ContactForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [tableData, setTableData] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    const total = tableData.reduce(
      (total, row) => (total = total + Number(row.salary)),
      0
    );

    setTotalSalary(total);
  }, [tableData]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://sheet.best/api/sheets/95b9fefc-a528-4c9f-a659-7dca1a32792c')
      .then((response) => {
        setTableData(response.data);
      });
  };

  const submitFormToGoggle = ({ name, age, salary, hobby }) => {
    axios
      .post(
        'https://sheet.best/api/sheets/95b9fefc-a528-4c9f-a659-7dca1a32792c',
        {
          name,
          age,
          salary,
          hobby,
        }
      )
      .then((response) => {
        alert('row added');
        console.log(response);
        setTableData([...tableData, { name, age, salary, hobby }]);
      });
  };

  return (
    <div className="contacForm">
      <h3>Annual salary: (salary sum) $ {totalSalary} </h3>
      <table className="tb">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Hobby</th>
          </tr>
        </thead>

        {tableData.map(({ name, age, salary, hobby }) => (
          <tbody>
            <tr>
              <td>{name} </td>
              <td>{age} </td>
              <td>{salary} </td>
              <td>{hobby} </td>
            </tr>
          </tbody>
        ))}
      </table>

      <form onSubmit={handleSubmit(submitFormToGoggle)}>
        <TextField
          name="name"
          inputRef={register({ required: true })}
          id="outlined-basic"
          variant="outlined"
          label="name"
          error={errors.name}
          helperText={errors.name && 'The name is required'}
        />
        <TextField
          name="age"
          type="number"
          error={errors.age}
          helperText={errors.age && 'The age is required'}
          inputRef={register({
            required: true,
          })}
          id="outlined-basic"
          variant="outlined"
          label="age"
        />
        <TextField
          name="salary"
          type="number"
          inputRef={register({ required: true })}
          id="outlined-basic"
          variant="outlined"
          label="salary"
          error={errors.salary}
          helperText={errors.salary && 'The salary is required'}
        />
        <TextField
          name="hobby"
          inputRef={register({ required: true })}
          id="outlined-basic"
          variant="outlined"
          label="hobby"
          error={errors.hobby}
          helperText={errors.hobby && 'The hobby is required'}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
