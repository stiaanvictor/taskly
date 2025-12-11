import { Link } from "react-router-dom";

function NoTasksFound() {
  return (
    <div>
      <h1 className="text-center text-lg">No tasks found!</h1>
      <h1 className="text-center text-lg">
        Click{" "}
        <Link className="text-primary" to="/new-task">
          here
        </Link>{" "}
        to start adding tasks
      </h1>
    </div>
  );
}

export default NoTasksFound;
