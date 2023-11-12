import { useState } from "react";
import Card from "../../../shared/UIElements/Card";
import { Link } from "react-router-dom";
import { postSignin } from "../../../store/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormErrors from "../../../shared/UIElements/FormErrors";
const SigninForm = () => {
  const [enteredUsername, setEnteredUsername] = useState();
  const [enteredPassword, setEnteredPassword] = useState();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors.errors);
  const history = useHistory();
  const signinHandler = async (e) => {
    e.preventDefault();
    const signinData = {
      username: enteredUsername,
      password: enteredPassword,
    };
    dispatch(
      postSignin(signinData, (userData) => {
        history.push("/ownersessions");
      })
    );
  };

  return (
    <div className="p-4 mt-24">
      <Card className="max-w-lg my-auto m-auto">
        <h1 className="text-2xl text-center text-darkHard mb-6 font-medium">
          Sign into your account
        </h1>
        <FormErrors errors={errors} />
        <form onSubmit={signinHandler}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              onChange={(e) => setEnteredUsername(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              className="block py-2.5 px-0 w-full text-sm text-darkHard bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
              required
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="text-white mb-4 bg-primary hover:bg-primaryDark focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Sign in
          </button>
          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/auth/signup">
                <span className="font-semibold text-primary">
                  Create account now
                </span>
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SigninForm;
