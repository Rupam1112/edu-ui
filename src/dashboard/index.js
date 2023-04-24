import Layout from "../layout";
import { useNavigate, useLocation } from "react-router-dom";
import CommonCard from "../component/commonCard";
import "./styles.scss";
const Dashboard = () => {
  const history = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <section className="dashboard-container">
        <CommonCard className="header-card" title="Dashboard" action={false} />
        <section className="info-section">
          <CommonCard
            className="info-card"
            title="Schools"
            count={5}
            action
            handleClick={() => history("/school")}
          />
          <CommonCard
            className="info-card"
            title="Users"
            count={8}
            action
            handleClick={() => history("/user")}
          />
          <CommonCard
            className="info-card"
            title="Grade"
            count={3}
            action
            handleClick={() => history("/grade")}
          />
        </section>
      </section>
    </Layout>
  );
};
export default Dashboard;
