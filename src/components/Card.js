import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card">
        <div className="card__section card__section--header">
          <h3 className="card__heading">{this.props.title}</h3>
        </div>
        <div className="card__section">{this.props.children}</div>
      </div>
    );
  }
}
