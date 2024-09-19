import DarkModeToogle from "@/Components/Element/Button/DarkModeToogle";
import HeaderNavHome from "@/Components/Fragment/HeaderNavHome";
import NavPortoButton from "@/Components/Element/Button/NavPortoButton";
import SkeletonOneLine from "@/Components/Element/Skeleton/SkeletonOneLine";
import CardImagePorto from "@/Components/Element/Card/CardImagePorto";
import { useEffect, useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        axios
            .get(route("api.getPhotosGallery") + "?max=12")
            .then((response) => {
                setPhotos(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setPhotos([]);
            });
    }, []);

    return (
        <>
            <Head>
                <title>Gallery | Personal Web</title>
            </Head>

            <HeaderNavHome></HeaderNavHome>

            <DarkModeToogle></DarkModeToogle>

            <section
                id="portfolio"
                className="p-4 bg-primary dark:bg-dark-primary"
            >
                <div className="container min-h-[90vh] flex flex-col px-2 mt-6 gap-2 md:gap-10 lg:px-24 mb-28">
                    <div className="w-full p-4 mt-16 text-3xl font-bold text-center uppercase text-light">
                        <h2>Gallery</h2>
                    </div>

                    <div className="w-full p-2 px-4 mb-4">
                        <div
                            id="type-list"
                            className="flex flex-wrap gap-1 px-2 py-4 text-accent dark:text-dark-accent"
                        >
                            <NavPortoButton active="true" type="all">
                                All
                            </NavPortoButton>
                            <NavPortoButton type="photo">Photo</NavPortoButton>
                            <NavPortoButton type="design">
                                Design
                            </NavPortoButton>
                        </div>

                        {loading ? (
                            <SkeletonOneLine height={80} />
                        ) : (
                            <>
                                <div className="flex flex-col flex-wrap gap-2 p-2 mt-4 md:flex-row">
                                    {photos.map((photo, index) => (
                                        <CardImagePorto
                                            key={index}
                                            photo={`/storage/img/gallery/${photo.image}`}
                                            type="photo"
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
