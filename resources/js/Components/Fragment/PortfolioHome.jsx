import CardImagePortoDesc from "../Element/Card/CardImagePortoDesc";
import SkeletonOneLine from "../Element/Skeleton/SkeletonOneLine";
import axios from "axios";
import { useEffect, useState } from "react";

const Portfolio = () => {
    const [loading, setLoading] = useState(true);
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        axios
            .get(route("api.getPortfolio"))
            .then((response) => {
                setPortfolios(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setPortfolios([]);
            });
    }, []);

    return (
        <section id="portfolio" className="p-4 bg-primary dark:bg-dark-primary">
            <div className="container min-h-[90vh] flex flex-col px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-28">
                <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-light">
                    <h2>Portfolio</h2>
                </div>

                <div className="w-full p-2 px-4 mb-4">
                    {loading ? (
                        <SkeletonOneLine height={80} />
                    ) : (
                        <>
                            <div className="flex flex-col flex-wrap gap-2 p-2 mt-4 md:flex-row">
                                {portfolios.map((portfolio, index) => (
                                    <CardImagePortoDesc
                                        key={index}
                                        to={`/project/${portfolio.id}`}
                                        photo={`/storage/img/${portfolio.cover_image}`}
                                        type="web"
                                        title={portfolio.name}
                                    >
                                        {portfolio.description}
                                    </CardImagePortoDesc>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
