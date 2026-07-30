const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project and Task API',
    description: 'REST API for managing projects and tasks.',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Project: {
      _id: '6a6992cbb30c4a5036ae6086',
      name: 'Restaurant API',
      description: 'Build an API to manage menus and customer orders',
      status: 'completed',
      priority: 'medium',
      category: 'restaurant',
      ownerEmail: 'ana@example.com',
      startDate: '2026-06-01',
      dueDate: '2026-07-20',
      createdAt: '2026-06-01',
    },
    ProjectInput: {
      name: 'Restaurant API',
      description: 'Build an API to manage menus and customer orders',
      status: 'completed',
      priority: 'medium',
      category: 'restaurant',
      ownerEmail: 'ana@example.com',
      startDate: '2026-06-01',
      dueDate: '2026-07-20',
      createdAt: '2026-06-01',
    },
    Task: {
      _id: '6a69946860bffd379fca234b',
      projectId: '6a6992cbb30c4a5036ae6085',
      title: 'Create student endpoints',
      description: 'Implement CRUD endpoints for students',
      status: 'in-progress',
      assignedTo: 'carlos@example.com',
      dueDate: '2026-08-15',
      createdAt: '2026-07-28',
    },
    TaskInput: {
      projectId: '6a6992cbb30c4a5036ae6085',
      title: 'Create student endpoints',
      description: 'Implement CRUD endpoints for students',
      status: 'in-progress',
      assignedTo: 'carlos@example.com',
      dueDate: '2026-08-15',
      createdAt: '2026-07-28',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
