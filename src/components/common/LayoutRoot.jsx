import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

const LayoutRoot = () => {
    return (
        <>
            <div className="flex flex-col min-h-screen justify-between">
                <Header />
                <Outlet />
                <Footer />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </>
    );
};
export default LayoutRoot;
