import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

import css from "./RegistrationForm.module.scss";
import sprite from "./icons/register-icons.svg";

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
export const RegistrationForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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

          <MyTextInput
            name="password"
            type="password"
            placeholder="Confirm password"
            icon={sprite + "#lock"}
          />

          <MyTextInput
            name="firstName"
            type="text"
            placeholder="First name"
            icon={sprite + "#user"}
          />

          <button className={css.RegistrationForm__button} type="submit">
            Register
          </button>
          <NavLink className={css.RegistrationForm__Navlink} to="/login">
            LOGIN
          </NavLink>
        </Form>
      </Formik>
    </>
  );
};
