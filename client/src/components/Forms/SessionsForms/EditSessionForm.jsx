import React from "react";
import { useState } from "react";
import Card from "../../../shared/UIElements/Card";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormErrors from "../../../shared/UIElements/FormErrors";
import { patchSession } from "../../../store/actions/sessions-actions";
import { RxArrowRight } from "react-icons/rx";
import { useParams } from "react-router-dom";


const EditSessionForm = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors.errors);
  const token = useSelector((state) => state.auth.token);
  const { sessionid } = useParams();
  const history = useHistory();
  const session = useSelector((state) => state.sessions.detailSession);
  const [enteredName, setEnteredName] = useState(session.name);
  const [enteredDescription, setEnteredDescription] = useState(
    session.description
  );

  const editSessionHandler = async (e) => {
    e.preventDefault();
    const sessionData = {
      name: enteredName,
      description: enteredDescription,
    };
    dispatch(
      patchSession(sessionData, sessionid, token, (sessionData) => {
        history.push(`/sessions/${sessionData.id}/editsession`);
      })
    );
  };

  return (
    <div className="p-4 mt-24">
      <Card className="max-w-lg my-auto m-auto">
        <h1 className="text-2xl text-center text-darkHard mb-6 font-medium">
          Edit your session
        </h1>
        <FormErrors errors={errors} />
        <form onSubmit={editSessionHandler}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Session name
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <label className=" text-sm text-gray-500">
              Session description
            </label>
            <textarea
              type="text"
              value={enteredDescription}
              className="w-full p-1 text-sm text-darkHard bg-transparent border rounded-lg h-40   focus:outline-none focus:ring-0 focus:border-primary"
              required
              onChange={(e) => setEnteredDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white mb-4 flex items-center gap-2 bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Save changes <RxArrowRight className="text-lg font-semibold" />
          </button>
        </form>
      </Card>
    </div>
  );
};

export default EditSessionForm;
