import TableOverview from "../TableOverview/TableOverview";
import TableForm from "../TableForm/TableForm";
import Spinner from 'react-bootstrap/Spinner';
import { getAllTables } from "../../../redux/tableRedux";
import { useSelector } from 'react-redux';

const Tables = () => {

  const tables = useSelector(getAllTables);

  if (!tables.length) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h4 className="mt-4">All Tables List</h4>
        <Spinner />
        <TableForm />
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h4 className="mt-4">All Tables List</h4>
        <ul className="col-12 d-flex flex-column align-items-start justify-content-start">
        {tables.map(table =>
                <TableOverview
                key={table.id}
                id={table.id}
                status={table.status} />
                )}
        </ul>
        <TableForm />
      </div>
    );
  }
};

export default Tables;