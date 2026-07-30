const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const collectionName = 'task';
const requiredFields = [
  'projectId',
  'title',
  'description',
  'status',
  'assignedTo',
  'dueDate',
];

const getCollection = () => mongodb.getDb().collection(collectionName);

const findMissingFields = (body) => {
  return requiredFields.filter((field) => !body[field]);
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getCollection().find().toArray();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks.' });
  }
};

const getTaskById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task id.' });
    }

    const task = await getCollection().findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get task.' });
  }
};

const createTask = async (req, res) => {
  try {
    const missingFields = findMissingFields(req.body);

    if (missingFields.length) {
      return res.status(400).json({
        message: 'Missing required task fields.',
        missingFields,
      });
    }

    if (!ObjectId.isValid(req.body.projectId)) {
      return res.status(400).json({ message: 'Invalid project id.' });
    }

    const task = {
      projectId: new ObjectId(req.body.projectId),
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      createdAt: req.body.createdAt || new Date().toISOString().slice(0, 10),
    };

    const result = await getCollection().insertOne(task);

    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create task.' });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task id.' });
    }

    const missingFields = findMissingFields(req.body);

    if (missingFields.length) {
      return res.status(400).json({
        message: 'Missing required task fields.',
        missingFields,
      });
    }

    if (!ObjectId.isValid(req.body.projectId)) {
      return res.status(400).json({ message: 'Invalid project id.' });
    }

    const task = {
      projectId: new ObjectId(req.body.projectId),
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      createdAt: req.body.createdAt || new Date().toISOString().slice(0, 10),
    };

    const result = await getCollection().replaceOne(
      { _id: new ObjectId(req.params.id) },
      task
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update task.' });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task id.' });
    }

    const result = await getCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete task.' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
