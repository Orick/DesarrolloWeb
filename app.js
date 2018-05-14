const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const statsRouter = require('./routes/stats');
const summonerRouter = require('./routes/summoner');
// const userRouter = require('./routes/user');
const matchListRouter = require('./routes/matchList');
const associatedRouter = require('./routes/associatedAccounts');
const leagueRouter = require('./routes/league');

const championsRouter = require('./routes/champions');
const spellsRouter = require('./routes/spells');
const itemsRouter = require('./routes/items');
const simuladorRouter = require('./routes/simulador')
const buildsRouter = require('./routes/builds')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/stats', statsRouter);
app.use('/summoner', summonerRouter);
// app.use('/user', userRouter);
app.use('/matchList', matchListRouter);
app.use('/assocciatedAccounts', associatedRouter);
app.use('/league', leagueRouter);


//negro pete
app.use('/champions', championsRouter);
app.use('/spells',spellsRouter);
app.use('/simulador', simuladorRouter);
app.use('/builds', buildsRouter);


//bloodwea
app.use('/items', itemsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//{
//     "profileIconId": 3379,
//     "name": "Orick",
//     "summonerLevel": 68,
//     "accountId": 118550,
//     "id": 113649,
//     "revisionDate": 1522848678000
// }
