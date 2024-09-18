import Card from "@/Components/Element/Card/Card";
import DashboardLayout from "@/Layouts/DashboardLayout";

const Dashboard = ({ auth }) => {
    return (
        <>
            <DashboardLayout user={auth.user}>
                <div className="p-1">
                    <h2 className="text-2xl">
                        Welcome {auth.user.name}, @{auth.user.username}
                    </h2>
                </div>

                <Card className="">
                    <div className="mb-3">
                        <h4 className="mb-0 text-2xl">Lorem, ipsum dolor.</h4>
                    </div>
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis?
                    </p>
                </Card>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
