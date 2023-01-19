import { useDispatch } from "react-redux";
import { authOperations } from "components/redux/auth";

export const DashboardPage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authOperations.refresh());
  // }, []);

  return (
    <div>
      <h1>DashboardPage</h1>
      <h2>This is success</h2>
      <button onClick={() => dispatch(authOperations.signOut())}>
        Sign Out
      </button>
    </div>
  );
};
