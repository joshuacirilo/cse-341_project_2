const { ObjectId } = require('mongodb');

const projectRequiredFields = [
  'name',
  'description',
  'status',
  'priority',
  'category',
  'ownerEmail',
  'startDate',
  'dueDate',
];

const taskRequiredFields = [
  'projectId',
  'title',
  'description',
  'status',
  'assignedTo',
  'dueDate',
];

const isBlank = (value) => {
  return value === undefined || value === null || String(value).trim() === '';
};

const findMissingFields = (body, requiredFields) => {
  return requiredFields.filter((field) => isBlank(body[field]));
};

const validateObjectIdParam = (paramName, resourceName) => {
  return (req, res, next) => {
    if (!ObjectId.isValid(req.params[paramName])) {
      return res.status(400).json({ message: `Invalid ${resourceName} id.` });
    }

    return next();
  };
};

const validateProjectBody = (req, res, next) => {
  const missingFields = findMissingFields(req.body, projectRequiredFields);

  if (missingFields.length) {
    return res.status(400).json({
      message: 'Missing required project fields.',
      missingFields,
    });
  }

  return next();
};

const validateTaskBody = (req, res, next) => {
  const missingFields = findMissingFields(req.body, taskRequiredFields);

  if (missingFields.length) {
    return res.status(400).json({
      message: 'Missing required task fields.',
      missingFields,
    });
  }

  if (!ObjectId.isValid(req.body.projectId)) {
    return res.status(400).json({ message: 'Invalid project id.' });
  }

  return next();
};

module.exports = {
  validateObjectIdParam,
  validateProjectBody,
  validateTaskBody,
};
