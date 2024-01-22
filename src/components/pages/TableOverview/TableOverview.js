import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getTableById } from '../../../redux/tableRedux';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Container } from "react-bootstrap";
import PropTypes from "prop-types";

const TableOverview = props => {

  const singleTableData = useSelector(state => getTableById(state, props.id));
  const [id] = useState(singleTableData.id);
  const [status] = useState(singleTableData.status);

  return (
    <Container>
      <li className="mb-2 col-12 d-flex align-items-center justify-content-center">
        <Row className="col-12 d-flex align-items-between justify-content-between mb-2">
          <Col className="col-9 d-flex flex-row align-items-center justify-content-start">
            <Col className="col-2">
              <h4>Table {id}</h4>
            </Col>
            <Col className="col-2 d-flex flex-row align-items-center justify-content-center">
              <h5>{status}</h5>
            </Col>
          </Col>
          <Col className="col-3 d-flex flex-row align-items-center justify-content-end">
            <Link to={`/table/${props.id}`}>
              <Button variant="primary">
                See More
              </Button>
            </Link>
          </Col>
        </Row>
      </li>
      <hr  style={{ color: '#000000', backgroundColor: '#000000', height: .5, borderColor : '#000000' }}/>
    </Container>
  );
};

TableOverview.propTypes = {
  id: PropTypes.number.isRequired,
};

export default TableOverview;