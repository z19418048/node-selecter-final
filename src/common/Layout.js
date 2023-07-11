import NetworkSidebar from "./NetworkSidebar";
import PointSidebar from "./PointSidebar";
import PageLayout from "./PageLayout";

const layout = () => {
  return(
      <div className="page">
          <div className="component">
              <NetworkSidebar></NetworkSidebar>
          </div>
          <div className="component">
              <PointSidebar></PointSidebar>
          </div>
          <div className="component">
              <PageLayout></PageLayout>
          </div>
      </div>
  );
}

export default layout