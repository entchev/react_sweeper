import React from 'react';
import Board from './board';
import * as Minesweeper from './minesweeper';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    const board = new Minesweeper.Board(12, 20);
    this.restartGame = this.restartGame.bind(this);
    this.state = {board: board};
    this.updateGame = this.updateGame.bind(this); 
  }

  restartGame() {
    const board = new Minesweeper.Board(12, 20);
    this.setState({ board: board });
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({ board: this.state.board });
  }

  render () {
    let modal;
    if (this.state.board.lost() || this.state.board.won()) {
      const text = this.state.board.won() ? "You won! Congrats!" : "Unlucky! You lost.";
      modal =
        <div className='modal-screen'>
          <div className='modal-content'>
            <p>{text}</p>
            <button onClick={this.restartGame}>Go Again?</button>
          </div>
        </div>;
    }

    return (
      <div>
        {modal}
        <Board board={this.state.board} updateGame={this.updateGame} />
      </div>
    );
  }
};
