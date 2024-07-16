import { Range, Every, Shuffle } from "react-lodash";
import React from "react";

const layout = (
  <Range
    start={0}
    end={16}
    step={(n) => {
      const row = Math.floor(n / 4);
      const col = n % 4;
      return [80 * col, 80 * row];
    }}
  />
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: <Shuffle collection={<Range start={0} end={16} />} />,
    };
  }
  updatePosition(index) {
    let { positions } = this.state;
    let emptyIndex = positions.indexOf(0);
    let targetIndex = positions.indexOf(index);
    const dif = Math.abs(targetIndex - emptyIndex);
    if (dif == 1 || dif == 4) {
      positions[emptyIndex] = index;
      positions[targetIndex] = 0;
      this.setState({ positions });
      let win = (
        <Every
          collection={positions}
          predicate={(value, index, array) => {
            value = value || 16;
            return index === 0 || parseInt(array[index - 1]) <= parseInt(value);
          }}
        />
      );
      if (win) {
        window.alert("U Win!!!");
      }
    }
  }
  render() {
    return (
      <div className="container">
        <div className="game">
          {this.state.positions.map((key) => {
            let cellClass = key ? "cell" : "empty cell";
            let [x, y] = layout[this.state.positions.indexOf(key)];
            return (
              <div
                key={key}
                className={cellClass}
                onClick={this.updatePosition.bind(this, key)}
                style={{ transform: `translate3d(${x}px,${y}px,0) scale(1.1)` }}
              >
                {key}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}