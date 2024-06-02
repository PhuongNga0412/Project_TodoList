import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Outlet } from "react-router-dom";

const LayoutRoot = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen justify-between">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};
export default LayoutRoot;
