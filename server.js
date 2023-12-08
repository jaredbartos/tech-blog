const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import routes, sequelize connection and helpers for handlebars
const routes = require('./controllers')
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Create session and session storage
const sess = {
  secret: 'ufPFaq4ozW4TNpNs',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is now listening at http://localhost:${PORT}`));
});