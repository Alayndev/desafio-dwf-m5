type Move = "rock" | "paper" | "scissors";
type Player = "userMove" | "computerMove";
type Winner = "userWins" | "computerWins" | "tiedGame";

const state = {
  data: {
    currentGame: {
      computerMove: "none",
      userMove: "none",
    },

    history: {
      userWins: 0,
      computerWins: 0,
    },
  },

  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }

    localStorage.setItem("game-data", JSON.stringify(this.data));
  },

  initState() {
    localStorage.setItem("game-data", JSON.stringify(this.data));
    const localData = JSON.parse(localStorage.getItem("game-data"));

    this.setState(localData);
  },

  subscribe(cb: (any) => any) {
    this.listeners.push(cb);
  },

  whoWins(userMove: Move, computerMove: Move) {
    const userWins = [
      userMove === "rock" && computerMove === "scissors",
      userMove === "paper" && computerMove === "rock",
      userMove === "scissors" && computerMove === "paper",
    ].includes(true);

    const computerWins = [
      computerMove === "rock" && userMove === "scissors",
      computerMove === "paper" && userMove === "rock",
      computerMove === "scissors" && userMove === "paper",
    ].includes(true);

    let winner: Winner;

    if (userWins) {
      winner = "userWins";
    } else if (computerWins) {
      winner = "computerWins";
    } else {
      winner = "tiedGame";
    }

    return winner;
  },

  changeHistory(gameResult: Winner) {
    const currentState = this.getState();

    if (gameResult === "userWins") {
      currentState.history.userWins += 1;
    } else if (gameResult === "computerWins") {
      currentState.history.computerWins += 1;
    }

    this.setState(currentState);
  },

  setMove(move: Move, player: Player) {
    const currentState = this.getState();

    currentState["currentGame"][player] = move;

    this.setState(currentState);
  },

  getCurrentGame() {
    const currentState = this.getState();

    return currentState.currentGame;
  },

  getCurrentHistory() {
    const currentState = this.getState();

    return currentState.history;
  },

  restartGame() {
    const currentState = this.getState();

    currentState.currentGame.computerMove = "none";
    currentState.currentGame.userMove = "none";

    this.setState(currentState);
  },
};

export { state, Move };
