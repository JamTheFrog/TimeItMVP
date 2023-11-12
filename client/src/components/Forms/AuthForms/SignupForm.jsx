import { useState } from "react";
import Card from "../../../shared/UIElements/Card";
import { useDispatch, useSelector } from "react-redux";
import { postSignup } from "../../../store/actions/auth-actions";
import { useHistory } from "react-router-dom";
import FormErrors from "../../../shared/UIElements/FormErrors";

const SignupForm = () => {
  const [enteredUsername, setEnteredUsername] = useState();
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPassword, setEnteredPassword] = useState();
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState();
  const [enteredFirstName, setEnteredFirstName] = useState();
  const [enteredLastName, setEnteredLastName] = useState();

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors.errors);
  const history = useHistory();
  const signupHandler = async (e) => {
    e.preventDefault();
    const signupData = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      firstName: enteredFirstName,
      lastName: enteredLastName,
    };
    dispatch(
      postSignup(signupData, () => {
        history.push("/");
      })
    );
  };

  return (
    <div className="p-4">
      <Card className="max-w-lg mb-20 m-auto">
        <h1 className="text-2xl text-center text-darkHard mb-6 font-medium">
          Register new account
        </h1>
        <FormErrors errors={errors} />
        <form onSubmit={signupHandler}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              onChange={(e) => setEnteredUsername(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
                required
                onChange={(e) => setEnteredFirstName(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Name
              </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
                required
                onChange={(e) => setEnteredLastName(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Surename
              </label>
            </div>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="email"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Email
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              onChange={(e) => setEnteredConfirmPassword(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirm password
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Register
          </button>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
