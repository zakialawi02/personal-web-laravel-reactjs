import SosialItem from "./SosialItem";

const SosialMedia = () => {
    return (
        <div className="sosial-media">
            <SosialItem
                link="https://www.instagram.com/zakialawi_/"
                icon="ri-instagram-line"
            ></SosialItem>
            <SosialItem
                link="https://twitter.com/"
                icon="ri-twitter-x-fill"
            ></SosialItem>
            <SosialItem
                link="https://www.facebook.com/"
                icon="ri-facebook-fill"
            ></SosialItem>
            <SosialItem
                link="https://www.linkedin.com/in/ahmad-zaki-alawi/"
                icon="ri-linkedin-box-fill"
            ></SosialItem>
            <SosialItem
                link="https://github.com/zakialawi02/personal-web"
                icon="ri-github-fill"
            ></SosialItem>
        </div>
    );
};

export default SosialMedia;
