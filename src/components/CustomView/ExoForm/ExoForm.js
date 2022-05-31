import { useState } from "react";
import { useLocation } from "react-router-dom";

import Field from "../../Field/Field";
import Modal from "../../ConfirmModal/ConfirmModal";

import "./exoform.scss";

const ExoForm = ({
  roundIndex,
  index,

  name,
  description,
  iteration,
  duration,
  reps,
  weight,

  setValue,
  putExo,
  deleteExo,
  showExoInList,
}) => {
  const location = useLocation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    putExo(roundIndex, index);
  };

  const handleInputChange = (evt) => {
    if (evt.target) return setValue(evt.target.name, evt.target.value);
    setValue(evt.name, evt.value);
  };

  const handleDelete = () => {
    setIsOpen(true);
    setAction(() => () => deleteExo(roundIndex, index));
    setText(`Confirmer la suppression de cet exercice ?`);
  };

  const [text, setText] = useState("");
  const [action, setAction] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="exoform__container">
      <Modal
        text={text}
        actionToDispatch={action}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <form className="exoform__form" onSubmit={handleSubmit}>
        <div className="exoform__input__row">
          <label>Nom:</label>
          <Field
            index={index}
            name="name"
            type="text"
            className="exoform__input exoform__input__name"
            placeholder="Nom de l'exo"
            value={name}
            onChange={handleInputChange}
          />
          <button
            className="training__button --transparent --icone --caretopen "
            type="button"
            onClick={() => {
              putExo(roundIndex, index);
              showExoInList({
                roundIndex,
                exoIndex: index,
                location: location.pathname,
              });
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="exoform__input__row">
          <label>Détails:</label>
          <textarea
            name="desc"
            type="text"
            className="exoform__input exoform__textarea"
            placeholder="Description"
            value={description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="exoform__input__row">
          <label>Nb de séries: </label>
          <Field
            name="iteration"
            className="exoform__input exoform__input__number"
            type="number"
            min={1}
            placeholder="séries"
            value={iteration}
            onChange={handleInputChange}
          />
        </div>

        <div className="exoform__input__row">
          <label>Reps: </label>
          <Field
            name="reps"
            className="exoform__input exoform__input__number"
            type="number"
            placeholder="Reps"
            min={0}
            value={reps}
            onChange={handleInputChange}
          />
        </div>

        <div className="exoform__input__row">
          <label>Tps (s): </label>
          <Field
            name="duration"
            className="exoform__input exoform__input__number"
            type="number"
            placeholder="Durée"
            min={0}
            value={duration}
            onChange={handleInputChange}
          />
        </div>

        <div className="exoform__input__row">
          <label>Pds (kg): </label>
          <Field
            name="weight"
            className="exoform__input exoform__input__number"
            type="number"
            placeholder="Poids"
            min={0}
            onChange={handleInputChange}
            value={weight}
          />
        </div>

        <div className="exoform__controls">
          <button
            type="submit"
            className="training__button  --transparent --icone"
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            type="button"
            className="training__button  --transparent --icone"
            onClick={handleDelete}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExoForm;