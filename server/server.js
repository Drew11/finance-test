'use strict';

const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io');
require('events').EventEmitter.defaultMaxListeners = 0

let FETCH_INTERVAL = 2000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

let filetredTickers = [...tickers];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {

  const quotes = filetredTickers.map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));
  socket.emit('ticker', quotes);
}

function trackTickers(socket) {

  // run the first time immediately
  getQuotes(socket);

//every N seconds
  let timer = setInterval(function() {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  // getQuotes(socket);

  socket.on('filter-tickers', function(data){
    filetredTickers=tickers.filter(ticker => !data.includes(ticker));
    getQuotes(socket);
  });

  socket.on('set_delay', function(delay) {
    clearInterval(timer);
    FETCH_INTERVAL = delay;
    timer = setInterval(function() {
      getQuotes(socket);
    }, FETCH_INTERVAL);
  });

  socket.on('stop', function() {
    clearInterval(timer);
  });

  socket.on('disconnect', function() {
    clearInterval(timer);
  });

}

const socketServer = io(server, {
    cors: {
      origin: `https://git.heroku.com/finance-test-server.git`,
      methods: ["GET", "POST"],
      credentials: true
    }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});