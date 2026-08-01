const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);
// #swagger.tags = ['Auth']
// #swagger.summary = 'Start GitHub OAuth login'
// #swagger.description = 'Redirects the browser to GitHub to authenticate. Open this URL directly in the browser instead of using Swagger Execute, because OAuth redirects cannot be completed through Swagger fetch requests.'
// #swagger.responses[302] = { description: 'Redirect to GitHub OAuth' }

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login-failed',
    successRedirect: '/',
  })
);
// #swagger.tags = ['Auth']
// #swagger.summary = 'GitHub OAuth callback'
// #swagger.description = 'GitHub redirects here after login. This route is called by GitHub, not manually from Swagger. A successful login creates a session cookie and redirects to /.'
// #swagger.responses[302] = { description: 'Redirect after GitHub authentication' }
// #swagger.responses[401] = { description: 'GitHub authentication failed', schema: { $ref: '#/definitions/ErrorResponse' } }

router.get('/me', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  return res.status(200).json(req.user);
});
// #swagger.tags = ['Auth']
// #swagger.summary = 'Get current authenticated user'
// #swagger.description = 'Returns the current user from the active session.'
// #swagger.security = [{ "sessionAuth": [] }]
// #swagger.responses[200] = { description: 'Authenticated user returned successfully', schema: { $ref: '#/definitions/AuthUser' } }
// #swagger.responses[401] = { description: 'Authentication required', schema: { $ref: '#/definitions/ErrorResponse' } }

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return next(sessionErr);
      }

      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Logged out successfully.' });
    });
  });
});
// #swagger.tags = ['Auth']
// #swagger.summary = 'Log out current user'
// #swagger.description = 'Destroys the active session and clears the session cookie.'
// #swagger.security = [{ "sessionAuth": [] }]
// #swagger.responses[200] = { description: 'Logged out successfully' }

router.get('/login-failed', (req, res) => {
  res.status(401).json({ message: 'GitHub authentication failed.' });
});
// #swagger.tags = ['Auth']
// #swagger.summary = 'GitHub login failed'
// #swagger.responses[401] = { description: 'GitHub authentication failed', schema: { $ref: '#/definitions/ErrorResponse' } }

module.exports = router;
