import { useParams } from 'react-router';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getTableById } from '../../../redux/tableRedux';
import { Navigate, Link } from 'react-router-dom';
import SingleTableForm from '../SingleTableForm/SingleTableForm';
import { Button } from 'react-bootstrap';

const SingleTableDetails = () => {

  const { tableId } = useParams();
  const singleTableData = useSelector(state => getTableById(state, parseInt(tableId)));

  if (!singleTableData) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="col-12 d-flex flex-column justify-content-center aling-items-center">
        <div className="col-8 d-flex flex-row justify-content-start aling-items-start">
          <h4 className='col-2 mt-4'>Table {tableId}</h4>
          <Link style={{ textDecoration: 'none'}}  className='col-3 d-flex flex-row justify-content-start align-items-start' to="/">
            <Button className='col-4 mt-4' variant="danger">
              Back
            </Button>
          </Link>
        </div>
        <SingleTableForm />
      </div>
    );
  }
};

export default SingleTableDetails;