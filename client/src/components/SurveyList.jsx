import { useEffect } from "react";
import { useSelector } from "react-redux";
import { dispatchFetchSurveys } from "../actions/index";

function SurveyList() {
  const surveys = useSelector((store) => store.surveys);

  useEffect(() => {
    dispatchFetchSurveys();
  }, []);

  return (
    <div>
      {surveys // Mutating the copied array via .reverse() because Redux does not allow you to mutate state directly
        .slice()
        .reverse()
        .map(({ _id, yes, no, title, body, dateSent }) => (
          <div className="card" key={_id}>
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p>{body}</p>
              <p className="right">Sent: {dateSent.split("T")[0]}</p>
            </div>
            <div className="card-action">
              <a>Yes: {yes}</a>
              <a>No: {no}</a>
            </div>
          </div>
        ))}
    </div>
  );
}
export default SurveyList;
