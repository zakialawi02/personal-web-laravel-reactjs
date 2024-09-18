const GuestLayout = ({ className = "", children }) => {
    className = className ? className : "w-full";

    return (
        <>
            <div className="font-Lato bg-frontend-base-100">
                <main className={className}>{children}</main>
            </div>
        </>
    );
};

export default GuestLayout;
