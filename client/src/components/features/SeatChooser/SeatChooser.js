import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import io from 'socket.io-client';

import './SeatChooser.scss';

class SeatChooser extends React.Component {

  componentDidMount() {
    this.takenSeats = 0;
    const { loadSeatsData } = this.props;
    this.socket = io((process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:8000');
    this.socket.on('seatsUpdated', (seats) => {
    loadSeatsData(seats);
    });

    const { loadSeats } = this.props;
    loadSeats();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) {
      this.takenSeats += 1;
      return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    }
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  countSeats = () => {
    const seats = 50 - this.takenSeats;
    this.takenSeats = 0;

    return <p> Free Seats: {seats}/50 </p>;
  }

  render() {

    const { prepareSeat, countSeats } = this;
    const { requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        {countSeats()}
      </div>
    )
  };
}

export default SeatChooser;
