import { Link } from "react-router-dom";
import SurveyList from "./SurveyList";

function Dashboard() {
  return (
    <div>
      <SurveyList />

      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className="btn-floating btn-large waves-effect waves-light red"
        >
          <i className="material-icons">&#43;</i>
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;
