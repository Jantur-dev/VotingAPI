import React from "react";
import { vision } from "@/constants";
import { Navbar, Footer } from "@/Components";
import styles from "../../../css/style";
import { arrowleft } from "../../assets";

const Detail = ({ nis }) => {
    console.log(nis);

    const selectedPerson = vision.find((person) => person.nis === nis);

    if (!selectedPerson) {
        // Handle the case where no person is found with the given id
        return (
            <div>
                <p>No data found for the provided id.</p>
            </div>
        );
    }

    return (
        <div className="bg-white w-full m-auto ">
            <div className="bg-primary rounded-b-lg fixed top-0 left-0 right-0 p-3 sm:h-[90px] ml:h-[100px] lg:h-[100px] z-9999 ">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth} `}>
                        <Navbar />
                    </div>
                </div>
            </div>
            <div className="py-[10rem] xxs:mx-[2rem] md:mx-[13rem]">
                <div className="bg-white w-full m-auto">
                    {/* ... rest of your component */}
                    <div
                        key={selectedPerson.id}
                        className="flex xxs:flex-col md:flex-row gap-6 mb-9"
                    >
                        {/* ... rest of your component */}
                        <div className="bg-[#FFFFFF] rounded-lg  xxs:mr-none md:mr-[1rem] shadow-pit">
                            <h1 className="text-lg font-bold text-primary xxs:text-[34px] md:text-[30px] xxs:py-[3rem] md:py-[1.55rem] uppercase my-auto text-center">
                                {selectedPerson.name}
                            </h1>
                            <img
                                src={selectedPerson.image}
                                alt={selectedPerson.name}
                                className="w-full shadow-pit rounded-md"
                                style={{ maxWidth: "100%" }}
                            />
                        </div>
                        <div
                            className="grid grid-cols gap-[2rem]  xxs:mt-[1rem] md:mt-[6rem] xxs:mr-none md:mr-[1rem]"
                            style={{ maxWidth: "100%" }}
                        >
                            {/* ... rest of your component */}
                            <div className="bg-[#FFFFFF] rounded-lg p-4 flex-1 shadow-pit">
                                <h3 className="text-lg text-primary font-bold sm:text-[30px] text-[24px] mb-3">
                                    Visi
                                </h3>
                                <p className="text-semibold sm:text-[18px]  text-primary">
                                    {selectedPerson.visi}
                                </p>
                            </div>
                            <div className="bg-[#FFFFFF] rounded-lg p-4 flex-1 shadow-pit">
                                <h3 className="text-lg text-primary font-bold sm:text-[30px] text-[24px] mb-3">
                                    Proker
                                </h3>
                                <p className="text-semibold sm:text-[18px]  text-primary">
                                    {selectedPerson.proker}
                                </p>
                            </div>
                        </div>
                        <div className="bg-[#FFFFFF] rounded-lg p-4 flex-1 xxs:mt-[1rem] md:mt-[6rem] shadow-pit">
                            <h3 className="text-lg text-primary font-bold sm:text-[30px] text-[24px] mb-3">
                                Misi
                            </h3>
                            <p className="text-semibold sm:text-[18px]  text-primary">
                                {selectedPerson.misi}
                            </p>
                        </div>
                    </div>
                    {/* ... rest of your component */}
                </div>
            </div>
            <div className="bg-[#FFFFFF]">
                <Footer />
            </div>
        </div>
    );
};

export default Detail;
