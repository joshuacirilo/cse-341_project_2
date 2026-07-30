const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const collectionName = 'project';
const requiredFields = [
  'name',
  'description',
  'status',
  'priority',
  'category',
  'ownerEmail',
  'startDate',
  'dueDate',
];

const getCollection = () => mongodb.getDb().collection(collectionName);

const findMissingFields = (body) => {
  return requiredFields.filter((field) => !body[field]);
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await getCollection().find().toArray();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get projects.' });
  }
};

const getProjectById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project id.' });
    }

    const project = await getCollection().findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.status(200).json(project);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get project.' });
  }
};

const createProject = async (req, res) => {
  try {
    const missingFields = findMissingFields(req.body);

    if (missingFields.length) {
      return res.status(400).json({
        message: 'Missing required project fields.',
        missingFields,
      });
    }

    const project = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      category: req.body.category,
      ownerEmail: req.body.ownerEmail,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      createdAt: req.body.createdAt || new Date().toISOString().slice(0, 10),
    };

    const result = await getCollection().insertOne(project);

    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create project.' });
  }
};

const updateProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project id.' });
    }

    const missingFields = findMissingFields(req.body);

    if (missingFields.length) {
      return res.status(400).json({
        message: 'Missing required project fields.',
        missingFields,
      });
    }

    const project = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      category: req.body.category,
      ownerEmail: req.body.ownerEmail,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      createdAt: req.body.createdAt || new Date().toISOString().slice(0, 10),
    };

    const result = await getCollection().replaceOne(
      { _id: new ObjectId(req.params.id) },
      project
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update project.' });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project id.' });
    }

    const result = await getCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete project.' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
