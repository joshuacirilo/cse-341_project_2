const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');

const doc = {
  info: {
    title: 'Project and Task API',
    description: 'REST API for managing projects and tasks.',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
  securityDefinitions: {
    sessionAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
      description:
        'Session cookie created after successful GitHub OAuth login.',
    },
  },
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
    AuthUser: {
      _id: '66a69946860bffd379fca0000',
      githubId: '12345678',
      username: 'octocat',
      displayName: 'The Octocat',
      profileUrl: 'https://github.com/octocat',
      provider: 'github',
      createdAt: '2026-07-31T00:00:00.000Z',
      updatedAt: '2026-07-31T00:00:00.000Z',
    },
    ErrorResponse: {
      message: 'Authentication required.',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const swaggerDocument = JSON.parse(fs.readFileSync(outputFile));
  const protectedPaths = [
    '/auth/logout',
    '/projects/',
    '/projects/{id}',
    '/tasks/',
    '/tasks/{id}',
  ];

  delete swaggerDocument.paths['/auth/me'];

  protectedPaths.forEach((path) => {
    if (!swaggerDocument.paths[path]) {
      return;
    }

    Object.values(swaggerDocument.paths[path]).forEach((operation) => {
      operation.security = [{ sessionAuth: [] }];
    });
  });

  fs.writeFileSync(outputFile, `${JSON.stringify(swaggerDocument, null, 2)}\n`);
});
