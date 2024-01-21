import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { removeTableRequest, editTableRequest } from '../../../redux/tableRedux';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getTableById } from '../../../redux/tableRedux';

const SingleTableForm = () => {

  const navigate = useNavigate();
  const { tableId } = useParams();
  const singleTableData = useSelector(state => getTableById(state, parseInt(tableId)));
  const dispatch = useDispatch();
  const id = singleTableData.id;
  const [status, setStatus] = useState(singleTableData.status);
  const [peopleAmount, setPeopleAmount] = useState(singleTableData.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(singleTableData.maxPeopleAmount);
  const [bill, setBill] = useState(singleTableData.bill);


  const parseAndValidateNumber = (value) => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;
  };

  const handleEditTable = event => {
    event.preventDefault();
    const thisTable = {
    id: parseInt(id),
    status: status,
    peopleAmount: parseAndValidateNumber(peopleAmount),
    maxPeopleAmount: parseAndValidateNumber(maxPeopleAmount),
    bill: parseAndValidateNumber(bill),
  };
    if (status !== "Busy") {
      thisTable.bill = 0;
    };
    if (status === "Free" || status ==="Cleaning") {
      thisTable.peopleAmount = 0;
      thisTable.maxPeopleAmount = 0;
    };
    dispatch(editTableRequest(thisTable));
    navigate('/');
  };

  const handleRemoveTable = event => {
    event.preventDefault();
    dispatch(removeTableRequest(id));
    navigate('/');
  };

  useEffect(() => {
    const peopleAmountValue = parseInt(peopleAmount);
    const maxPeopleAmountValue = parseInt(maxPeopleAmount);

    if (peopleAmountValue < 0 || isNaN(peopleAmountValue)) {
      setPeopleAmount(0);
    }

    if (maxPeopleAmountValue < 0 || isNaN(maxPeopleAmountValue) || maxPeopleAmountValue > 10) {
      setMaxPeopleAmount(0);
    }
  }, [peopleAmount, maxPeopleAmount]);

  if (bill < 0 || bill === "") {
    setBill(0);
  };

  if (status === "Busy") {
  return (
    <div>
      <Col className='col-5 d-flex flex-column align-items-start gap-2'>
        <Row className='col-12 mt-3 gap-2'>
          <strong>Status</strong>
          <select className='col-4' name="Status" value={status} onChange={event => setStatus(event.target.value)}>
            <option value="Free">Free</option>
            <option value="Busy">Busy</option>
            <option value="Reserved">Reserved</option>
            <option value="Cleaning">Cleaning</option>
          </select>
        </Row>
        <Row className='col-12 mt-3 gap-2'>
          <strong>People</strong><input className='col-1' min='0' max={maxPeopleAmount} value={peopleAmount} placeholder='Table peopleAmount...' onChange={event => setPeopleAmount(event.target.value)}></input> / <input className='col-1' max="10" value={maxPeopleAmount} placeholder='Table ImaxPeopleAmount...' onChange={event => setMaxPeopleAmount(event.target.value)}></input>
        </Row>
        <Row className='col-12 mt-3 gap-2'>
          <strong>Bill $</strong><input className='col-3' value={bill} placeholder='Table bill...' onChange={event => setBill(event.target.value)}></input>
        </Row>
        <Row className='col-12 mt-3 gap-2'>
          <Button className='col-3 mt-4' size='sm' onClick={event => handleEditTable(event)} variant="primary">UPDATE</Button>
          <Button className='col-3 mt-4' size='sm' onClick={event => handleRemoveTable(event)} variant="danger">REMOVE</Button>
        </Row>
      </Col>
    </div>
  );
  } else if (status === "Reserved") {
    return (
      <div>
        <Col className='col-5 d-flex flex-column align-items-start gap-2'>
          <Row className='col-12 mt-3 gap-2'>
            <strong>Status</strong>
            <select className='col-4' name="Status" value={status} onChange={event => setStatus(event.target.value)}>
              <option value="Free">Free</option>
              <option value="Busy">Busy</option>
              <option value="Reserved">Reserved</option>
              <option value="Cleaning">Cleaning</option>
            </select>
          </Row>
          <Row className='col-12 mt-3 gap-2'>
              <strong>People</strong><input className='col-1' value={peopleAmount} placeholder='Table peopleAmount...' onChange={event => setPeopleAmount(event.target.value)}></input> / <input className='col-1' value={maxPeopleAmount} placeholder='Table ImaxPeopleAmount...' onChange={event => setMaxPeopleAmount(event.target.value)}></input>
          </Row>
          <Row className='col-12 mt-3 gap-2'>
            <Button className='col-3 mt-4' size='sm' onClick={event => handleEditTable(event)} variant="primary">UPDATE</Button>
            <Button className='col-3 mt-4' size='sm' onClick={event => handleRemoveTable(event)} variant="danger">REMOVE</Button>
          </Row>
        </Col>
      </div>
    )
  } else {
    return (
      <div>
        <Col className='col-5 d-flex flex-column align-items-start gap-2'>
          <Row className='col-12 mt-3 gap-2'>
            <strong>Status</strong>
            <select className='col-4' name="Status" value={status} onChange={event => setStatus(event.target.value)}>
              <option value="Free">Free</option>
              <option value="Busy">Busy</option>
              <option value="Reserved">Reserved</option>
              <option value="Cleaning">Cleaning</option>
            </select>
          </Row>
          <Row className='col-12 mt-3 gap-2'>
            <Button className='col-3 mt-4' size='sm' onClick={event => handleEditTable(event)} variant="primary">UPDATE</Button>
            <Button className='col-3 mt-4' size='sm' onClick={event => handleRemoveTable(event)} variant="danger">REMOVE</Button>
          </Row>
        </Col>
      </div>
    )
  }
};

export default SingleTableForm;