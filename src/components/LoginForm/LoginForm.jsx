import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import css from "./LoginForm.module.scss";
import sprite from "./icons/login-icons.svg";

import { useDispatch } from "react-redux";
import { authOperations } from "components/redux/auth";

const MyTextInput = ({ label, icon, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={css.MyText}>
      <div className={css.MyText__container}>
        <input className={css.MyText__input} {...field} {...props} />
        <svg className={css.MyText__icon} width="24" height="24">
          <use href={icon}></use>
        </svg>
      </div>
      {meta.touched && meta.error ? (
        <div className={css.MyText__error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

// And now we can use these
export const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(authOperations.login(values));
          setSubmitting(false);
        }}
      >
        <Form className={css.RegistrationForm}>
          <MyTextInput
            name="email"
            type="email"
            placeholder="E-mail"
            icon={sprite + "#email"}
          />

          <MyTextInput
            name="password"
            type="password"
            placeholder="Password"
            icon={sprite + "#lock"}
          />

          <button className={css.RegistrationForm__button} type="submit">
            LOGIN
          </button>
          <NavLink className={css.RegistrationForm__Navlink} to="/register">
            REGISTER
          </NavLink>
        </Form>
      </Formik>
    </>
  );
};
