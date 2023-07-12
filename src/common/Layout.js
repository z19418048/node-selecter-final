import NetworkSidebar from "./NetworkSidebar";
import PointSidebar from "./PointSidebar";
import PageLayout from "./PageLayout";

export const Layout = () => {
  return(
      <div className="page">
          <div className="component">
              <NetworkSidebar></NetworkSidebar>
          </div>
          <div className="component">
              <PointSidebar></PointSidebar>
          </div>
          <div className="component ">
              <PageLayout></PageLayout>
          </div>
      </div>
  );
}
