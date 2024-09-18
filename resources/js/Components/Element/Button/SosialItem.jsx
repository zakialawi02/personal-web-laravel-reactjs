const SosialItem = (props) => {
    const { link, icon, className } = props;
    return (
        <a href={link} target="_blank" className={className}>
            <i className={icon}></i>
        </a>
    );
};

export default SosialItem;
