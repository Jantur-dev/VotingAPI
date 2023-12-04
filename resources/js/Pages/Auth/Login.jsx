import { useState } from "react";
import styles from "../../../css/style.js";
import { Navbar, Footer, ModalVote } from "@/Components/index.js";
import { kertaslogin, arrowleft } from "../../assets";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Login({ status, value, gagal }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nis: "",
        email: "",
        otp: "",
    });
    const [modalIsOpen, setModalIsOpen] = useState(
        false
    );
    const [statuase, setStatuse] = useState(false)
    // const [statuse, setStatuse] = useState('false');

    const openModal = () => {
        setModalIsOpen(true);
        // window.location.href = '/login'
    };

    const closeModal = () => {
        setModalIsOpen(false);
        Inertia.visit("/register");
    };

    (function () {
        if (localStorage.getItem("_login")) {
            window.location.href = "/";
        }
    })();
    // let statuse
    const hasOtp = () => {
        if (value.otp == data.otp) {
            localStorage.setItem("_login", value.otp);
            localStorage.setItem("_name", value.name);
            localStorage.setItem("_nis", value.nis);
        } else {
            openModal()
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (status == false) {
            post(route("register"), {
                onError: () => {
                    openModal()
                },
                onSuccess: () => setStatuse(true)
            });
        } else {
            post(route("verify"), {
                onError: () => {
                    openModal()
                },
                onProgress: hasOtp(),
                onSuccess: post(route("login"))
            
            });
        }
    };

    return (
        <div className="bg-white w-full h-s m-auto">
            <Head title={status == null ? "Register" : "Login"} />
            {errors.nis && (
                <ModalVote
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    success={false}
                />
            )}
            {gagal && (
                <ModalVote
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    success={false}
                />
            )}
            <ModalVote
                isOpen={modalIsOpen}
                closeModal={closeModal}
                success={false}
            />
            <div className="bg-primary rounded-b-lg fixed top-0 left-0 right-0 p-3 sm:h-[90px] ml:h-[100px] lg:h-[100px] z-9999">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth} `}>
                        <Navbar />
                    </div>
                </div>
            </div>

            <div className={`bg-white flex flex-row`}>
                <div className="">
                    <Link
                        href="/"
                        as="button"
                        type="button"
                        className="transition ease-in-out delay-150 duration-200 xxs:hidden md:flex flex md:ml-[2rem] lg:ml-[5rem] relative bg-primary flex-end w-16 h-14 p-5 justify-center items-center gap-6 flex-shrink-0 rounded-lg mt-[11rem] hover:bg-secondary"
                    >
                        <img src={arrowleft} alt="" className="text-white" />
                    </Link>
                </div>
                <div className=" shadow-lit flex bg-[#FFFFFF] mt-[11rem] rounded-lg py-[1rem] px-[1rem] xxs:mx-auto md:mx-auto lg:mx-auto">
                    <button className="xxs:flex md:hidden flex  absolute bg-primary flex-end w-19 h-14 p-5 justify-center items-center gap-6 flex-shrink-0 rounded-lg hover:bg-secondary">
                        <a href="">
                            <img
                                src={arrowleft}
                                alt=""
                                className="text-white"
                            />
                        </a>
                    </button>
                    <div className="xxs:hidden md:flex flex-col relative bg-gradient px-[7rem] overflow-hidden rounded-lg">
                        <div className=" w-[320px] mx-auto">
                            <p className="text-white text-[14px] pt-[3rem] font-semibold text-center uppercase">
                                Pesta Demokrasi
                            </p>
                            <h4 className="text-white text-[25px] font-bold text-center uppercase  pb-[2rem]">
                                lOGIN untuk gunakan hak suara anda
                            </h4>
                        </div>
                        <img
                            src={kertaslogin}
                            alt="test"
                            className="relative mx-auto rounded-md"
                        />
                        {/* <p className="relative left-34 bottom-0">by VoteSmecone</p> */}
                    </div>
                    {/* <img src={awanlogin} alt="" className="absolute bottom-15 left-24" /> */}
                    <div className="flex flex-col">
                        <h1 className="text-primary mx-auto uppercase xxs:text-[25px] md:text-[30px] text-center pt-4 pb-[4rem] font-bold">
                            {status == null ? "Register" : "Login"}
                        </h1>
                        <form
                            onSubmit={submit}
                            className="xxs:px-[1rem] md:px-[3rem] lg:px-[4rem]"
                        >
                            <input
                                type="text"
                                placeholder="Masukan NIS"
                                name="nis"
                                value={data.nis}
                                onChange={(e) => setData("nis", e.target.value)}
                                className="lg:w-[450px] flex text-primary font-semibold border-2 shadow-pit xxs:px-4 md:px-6 py-3 rounded-md mb-[40px]"
                            />
                            <input
                                type="email"
                                placeholder="Masukan Email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="lg:w-[450px] flex text-primary font-semibold border-2 shadow-pit xxs:px-4 md:px-6 py-3 rounded-md mb-[40px]"
                            />
                            {statuase && (
                                <input
                                    type="text"
                                    placeholder="Masukan OTP"
                                    name="otp"
                                    value={data.otp}
                                    onChange={(e) =>
                                        setData("otp", e.target.value)
                                    }
                                    className="lg:w-[450px] flex text-primary font-semibold border-2 shadow-pit xxs:px-4 md:px-6 py-3 rounded-md"
                                />
                            )}
                            {value ? (
                                <p>Nilai prop: {value.otp}</p>
                            ) : (
                                <p>Belum ada OTP</p>
                            )}
                            <button
                                type="submit"
                                className="transition ease-in-out delay-150 duration-200 mt-[4rem] uppercase text-white font-bold text-[18px] border-2 bg-primary xxs:w-[265px] md:w-[270px] lg:w-[450px] md:px-none md:px-[1rem] py-[1rem] rounded-xxl mx-auto hover:bg-secondary hover:scale-110"
                            >
                                {status == null ? "Register" : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-[#FFFFFF]">
                <Footer />
            </div>
        </div>
    );

}
