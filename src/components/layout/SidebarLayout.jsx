import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-slate-200">
        {/* Sidebar */}
        <Sidebar className="h-screen" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Dynamic Content */}
          <div className="mt-[48px] mx-[44px] w-full flex justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
