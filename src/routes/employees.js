/* eslint-disable consistent-return */
const express = require('express');
const schema = require('../db/schema');

const router = express.Router();

// In-memory employee list
let employees = [
  { _id: '1', name: 'Alice', job: 'Developer' },
  { _id: '2', name: 'Bob', job: 'Designer' },
  { _id: '3', name: 'Charlie', job: 'Manager' },
];

/* Get all employees */
router.get('/', (req, res) => {
  res.json(employees);
});

/* Get a specific employee */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp._id === id);

  if (!employee) {
    const error = new Error('Employee does not exist');
    return next(error);
  }

  res.json(employee);
});

/* Create a new employee */
router.post('/', async (req, res, next) => {
  try {
    const { name, job } = req.body;
    await schema.validateAsync({ name, job });

    const existing = employees.find(emp => emp.name === name);

    if (existing) {
      const error = new Error('Employee already exists');
      res.status(409); // conflict
      return next(error);
    }

    const newEmployee = {
      _id: (employees.length + 1).toString(), // simple incremental ID
      name,
      job,
    };

    employees.push(newEmployee);

    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

/* Update a specific employee */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, job } = req.body;
    const validatedData = await schema.validateAsync({ name, job });

    const index = employees.findIndex(emp => emp._id === id);

    if (index === -1) {
      const error = new Error('Employee does not exist');
      return next(error);
    }

    employees[index] = { ...employees[index], ...validatedData };

    res.json(employees[index]);
  } catch (error) {
    next(error);
  }
});

/* Delete a specific employee */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp._id === id);

  if (index === -1) {
    const error = new Error('Employee does not exist');
    return next(error);
  }

  employees.splice(index, 1);

  res.json({
    message: 'Employee has been deleted',
  });
});

module.exports = router;
