import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { patchTimeBlock } from "../../../store/actions/sessions-actions";
import Card from "../../../shared/UIElements/Card";
import FormErrors from "../../../shared/UIElements/FormErrors";

const EditTimeBlockModalForm = ({ timeBlock, onClose }) => {
  const [enteredTitle, setEnteredTitle] = useState(timeBlock.title);
  const [enteredDescription, setEnteredDescription] = useState(timeBlock.description);
  const [selectedHours, setSelectedHours] = useState(Math.floor(timeBlock.duration/3600));
  const [selectedMinutes, setSelectedMinutes] = useState((Math.floor(timeBlock.duration/60))%60);
  const [selectedSeconds, setSelectedSeconds] = useState(timeBlock.duration%60);

  const { sessionid } = useParams();

  const token = useSelector((state) => state.auth.token);
  const errors = useSelector((state) => state.errors.errors);
  const dispatch = useDispatch();

  const editTimeBlockHandler = async (e) => {
    e.preventDefault();
    const timeBlockData = {
      id: timeBlock.id,
      title: enteredTitle,
      duration:
        +selectedHours * 3600 + +selectedMinutes * 60 + +selectedSeconds,
      description: enteredDescription,
    };
    dispatch(
      patchTimeBlock(timeBlockData, sessionid, token, (sessionData) => {
        onClose();
      })
    );
  };

  return (
    <div className="fixed top-0 left-0 z-40 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.4)] p-4">
      <Card
        className={
          "relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-lg "
        }
      >
        <h1 className="text-2xl text-center text-darkHard mb-6 font-medium">
          Edit Your Time Block
        </h1>
        <FormErrors errors={errors} />
        <form onSubmit={editTimeBlockHandler}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="title"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              autoComplete="off"
              value={enteredTitle}
              onChange={(e) => setEnteredTitle(e.target.value)}
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Time block title
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="title"
                id="title"
                className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
                required
                autoComplete="off"
                value={selectedHours}
                onChange={(e) => setSelectedHours(e.target.value)}
              />
              <label
                htmlFor="title"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Hours
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="title"
                id="title"
                className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
                required
                autoComplete="off"
                value={selectedMinutes}
                onChange={(e) => setSelectedMinutes(e.target.value)}
              />
              <label
                htmlFor="title"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Minutes
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="number"
                name="title"
                id="title"
                className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
                required
                autoComplete="off"
                value={selectedSeconds}
                onChange={(e) => setSelectedSeconds(e.target.value)}
              />
              <label
                htmlFor="title"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Seconds
              </label>
            </div>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label className=" text-sm text-gray-500">
              Time block description
            </label>
            <textarea
              type="text"
              className="w-full p-1 text-sm text-darkHard bg-transparent border rounded-lg h-40   focus:outline-none focus:ring-0 focus:border-primary"
              required
              value={enteredDescription}
              onChange={(e) => setEnteredDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-primary font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Close
          </button>
        </form>
      </Card>
    </div>
  );
};
export default EditTimeBlockModalForm;