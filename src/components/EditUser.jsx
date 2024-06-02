import Form from "components/common/Form";
import { useLoaderData } from "react-router-dom";

const EditUser = () => {
    const { user } = useLoaderData();

    return (
        <div className="w-full py-11 bg-gray-50">
            <Form isUpdate={true} userData={user} />
        </div>
    );
};
export default EditUser;
