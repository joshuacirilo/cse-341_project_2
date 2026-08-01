require('dotenv').config();

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('../data/database');

const requiredEnvVars = [
  'GITHUB_CLIENT_ID',
  'GITHUB_CLIENT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
const callbackURL = process.env.CALLBACK_URL || process.env.GITHUB_CALLBACK_URL;

if (!callbackURL) {
  missingEnvVars.push('CALLBACK_URL or GITHUB_CALLBACK_URL');
}

if (missingEnvVars.length) {
  throw new Error(
    `Missing OAuth environment variables: ${missingEnvVars.join(', ')}`
  );
}

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = mongodb.getDb().collection('user');
        const githubUser = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
          photos: profile.photos,
          provider: profile.provider,
          updatedAt: new Date().toISOString(),
        };

        const result = await usersCollection.findOneAndUpdate(
          { githubId: profile.id },
          {
            $set: githubUser,
            $setOnInsert: {
              createdAt: new Date().toISOString(),
            },
          },
          {
            upsert: true,
            returnDocument: 'after',
          }
        );

        return done(null, result);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.githubId);
});

passport.deserializeUser(async (githubId, done) => {
  try {
    const user = await mongodb.getDb().collection('user').findOne({ githubId });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
