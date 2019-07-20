const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;

app.use('/', express.static(path.resolve(__dirname, '../src/main/resources/public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/main/resources/public/index.html'));
});

http.listen(port, () => {
    console.log('listening on *:' + port);
});

const candidates = [];

io.on('connection', socket => {
    socket.on('interview_attached', playerAnswersSummary => {
        const index = candidates.findIndex(c => c.name === playerAnswersSummary.name);
        if (index !== -1) {
            candidates[index] = playerAnswersSummary;
        } else {
            candidates.push(playerAnswersSummary);
        }
        io.emit('interview_candidates', candidates);
    });

});
