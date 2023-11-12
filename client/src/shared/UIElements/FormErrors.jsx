import React from "react";
const FormErrors = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
        <ul className="mb-6 p-4 rounded border border-red-700 bg-red-300 ">
          <h3 className="font-medium text-sm text-red-700">Oooops...</h3>
          {errors.map((err) => {
            return (
              <li
                className="font-medium text-sm text-red-700"
                key={err.message}
              >
                {err.message}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default FormErrors;
