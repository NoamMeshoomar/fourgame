const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
});
const io = new Server(httpServer, {cors: "*"});


const COL_LENGTH = 6;
const ROW_LENGTH = 7;

const games = {};

io.on("connection", (socket) => {
    socket.on("CREATE_GAME", () => {
        if(games[socket.id])
            return;
        games[socket.id] = {
            grid: createGrid()
        }
        socket.emit("GAME_CREATED", games[socket.id].grid);
    });

    socket.on("TURN", (row) => {
        if(!games[socket.id])
            return;
        if(typeof row !== "number")
            return;
            
        const player = drawCircle(games[socket.id].grid, row, 1);
        if(!player || !player?.pos)
            return;

        socket.emit("TURN", player.pos, 1);

        if(player.isWon) {
            delete games[socket.id];
            return socket.emit("WON", player.isWon);
        }

        const randomRowPos = Math.floor(Math.random() * ROW_LENGTH);
        const bot = drawCircle(games[socket.id]?.grid, randomRowPos, 2);
        if(!bot?.pos)
            return;

        socket.emit("TURN", bot.pos, 2);

        if(bot.isWon) {
            delete games[socket.id];
            return socket.emit("WON", bot.isWon);
        }
    });

    socket.on("disconnected", () => {
        if(games[socket.id])
            delete games[socket.id];
    });

    socket.on("error", () => {return});
});

function createGrid() {
    const grid = [];

    for(let i = 0; i < COL_LENGTH; i++) {
        grid[i] = [];
        for(let j = 0; j < ROW_LENGTH; j++) {
            grid[i].push(0);
        }
    }

    return grid;
}

function drawCircle(grid, rowPos, color) {
    const pos = dropAvailability(grid, rowPos, color);
    if(pos && pos.col >= 0 && pos.row >= 0) {
        grid[pos.col][pos.row] = color;

        const isWon = checkWin(grid, [pos.col, pos.row], color);
        if(isWon) {
            return {pos: [pos.col, pos.row], isWon};;
        } else {
            return {pos: [pos.col, pos.row], isWon};
        }
    } else {
        return null;
    }
}

function dropAvailability(grid, row, color) {
    let col = COL_LENGTH-1;

    while(col >= 0) {
        if(!grid[col][row]) {
            return {col, row};
        } else if(col == 0) {
            if(color == 2)
                return dropAvailability(grid, Math.floor(Math.random() * ROW_LENGTH));
            else
                return null;
        }
        col--;
    }
}

function checkWin(grid, pos, color) {
    const [col, row] = pos;

    // Column check
    for(let i = COL_LENGTH-1; i >= 0; i--) {
        if(checkLine(grid[i][row], grid[i-1] && grid[i-1][row], grid[i-2] && grid[i-2][row], grid[i-3] && grid[i-3][row])) {
            return color;
        }
    }
    // // Row check
    for(let i = 0; i < ROW_LENGTH; i++) {
        if(checkLine(grid[col][i], grid[col][i+1], grid[col][i+2], grid[col][i+3])) {
            return color;
        }
    }
    // Diagonal check
    // Down right
    for(let i = COL_LENGTH-1; i >= 0; i--) {
        for(let j = 0; j < 4; j++) {
            if(checkLine(grid[i][row-j], grid[i-1] && grid[i-1][(row-j)+1], grid[i-2] && grid[i-2][(row-j)+2], grid[i-3] && grid[i-3][(row-j)+3])) {
                return color;
            }
        }
    }
    // Down left
    for(let i = COL_LENGTH-1; i >= 0; i--) {
        for(let j = 0; j < 4; j++) {
            if(checkLine(grid[i][row+j], grid[i-1] && grid[i-1][(row+j)-1], grid[i-2] && grid[i-2][(row+j)-2], grid[i-3] && grid[i-3][(row+j)-3])) {
                return color;
            }
        }
    }

    return 0;
}

function checkLine(cell1, cell2, cell3, cell4) {
    if((cell1 && cell2 && cell3 && cell4) && (cell1 != 0 && cell2 != 0 && cell3 != 0 && cell4 != 0)) {
        if(cell1 == cell2 && cell1 == cell3 && cell1 == cell4) {
            return cell1;
        }
    }
    return 0;
}

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));