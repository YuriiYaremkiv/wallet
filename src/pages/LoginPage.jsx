import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authOperations } from "components/redux/auth";
import { LoginForm } from "components/LoginForm/LoginForm";

export const LoginPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.refresh());
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
};
