import "./Card.css";
import { Link } from "react-router-dom";
import crewmateOutline from "../assets/crewmate-outline.png";

const Card = (props) => {
  return (
    <div className={`Card color-${props.color}`}>
      <Link to={`/gallery/details/${props.id}`} className="card-link">
        <img
          src={crewmateOutline}
          alt="crewmate outline"
          className={`crewmate-outline ${props.type}`}
        />
        <h2 className="name">
          Name: <span className="stat">{props.name}</span>
        </h2>
        <h2 className="speed">
          Speed: <span className="stat">{props.speed} mph</span>
        </h2>
        <h2 className="color">
          Color: <span className="stat">{props.color}</span>
        </h2>
      </Link>
      <Link to={`/edit/${props.id}`}>
        <button className="edit-button">Edit Crewmate</button>
      </Link>
    </div>
  );
};

export default Card;
