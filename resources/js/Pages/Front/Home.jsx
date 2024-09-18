import AboutHome from "@/Components/Fragment/AboutHome";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import HeroHome from "@/Components/Fragment/HeroHome";
import DarkModeToogle from "@/Components/Element/Button/DarkModeToogle";
import Portfolio from "@/Components/Fragment/PortfolioHome";
import QuotesGenerator from "@/Components/Fragment/QuotesGenerator";
import AnonMessage from "@/Components/Fragment/AnonMessage";
import Contact from "@/Components/Fragment/Contact";
import FooterHome from "@/Components/Fragment/FooterHome";
import { Head } from "@inertiajs/react";

const Home = () => {
    return (
        <>
            <Head>
                <title>Personal Web</title>
            </Head>

            <HeaderNavHome></HeaderNavHome>

            <DarkModeToogle></DarkModeToogle>

            <HeroHome></HeroHome>

            <AboutHome></AboutHome>

            <Portfolio></Portfolio>

            <QuotesGenerator></QuotesGenerator>

            <AnonMessage></AnonMessage>

            <Contact></Contact>

            <FooterHome></FooterHome>
        </>
    );
};

export default Home;
