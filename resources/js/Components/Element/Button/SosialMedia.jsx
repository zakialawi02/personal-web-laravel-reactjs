import SosialItem from "./SosialItem";

const SosialMedia = () => {
    return (
        <div className="sosial-media">
            <SosialItem
                link="https://www.instagram.com/a.zaki.alawi/"
                icon="fab fa-instagram"
            ></SosialItem>
            <SosialItem
                link="https://twitter.com/"
                icon="fab fa-twitter"
            ></SosialItem>
            <SosialItem
                link="https://www.facebook.com/"
                icon="fab fa-facebook-f"
            ></SosialItem>
            <SosialItem
                link="https://www.linkedin.com/in/ahmad-zaki-alawi/"
                icon="fab fa-linkedin-in"
            ></SosialItem>
            <SosialItem
                link="https://github.com/zakialawi02/personal-web"
                icon="fab fa-github"
            ></SosialItem>
        </div>
    );
};

export default SosialMedia;
