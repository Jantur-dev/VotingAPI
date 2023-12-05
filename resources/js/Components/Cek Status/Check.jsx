import React from "react";
import styles from '../../../css/style';
import { Link } from "@inertiajs/react";
import { arrowleft } from "@/assets";

const Check = () => {
  const isLogin = localStorage.getItem('_name')

  return (
    <section className="w-full bg-[#FFFFFF] my-[5rem] rounded-lg shadow-lit">
      {
        isLogin ? (
          <div className="">
            <h1 className={`${styles.flexCenter} xxs:pt-[3rem] md:pt-[4rem] font-bold xxs:text-[26px] text-[30px] text-primary uppercase text-center`}>Pilihlah kandidat yang sesuai dengan keyakinan anda</h1>
            <div className="px-[2rem] xxs:py-[2rem] md:py-[4rem] ">
              <div className={`${styles.flexCenter} relative`}>
                {/* <label htmlFor="cekNIS">Masukan NIS</label> */}
                <Link href={'/vote'} className="xxs:flex xxs:mx-auto xxs:mt-3 lg:mt-0 md:mx-none lg:absolute font-semibold bg-primary text-white rounded-lg px-[2.5rem] xxs:py-[10px] md:py-[10px] z-10 md:mr-none lg:mr-[1rem] hover:bg-secondary transition delay-200 lg:top-2 lg:right-20 bottom-2">
                  Vote disini
                  <img src={arrowleft} alt="arrow-up" className="w-[20px] h-auto ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
          <h1 className={`${styles.flexCenter} xxs:pt-[3rem] md:pt-[4rem] font-bold xxs:text-[26px] text-[30px] text-primary uppercase text-center`}>Harap login dulu sebelum memilih </h1>
          <div className="px-[2rem] xxs:py-[2rem] md:py-[4rem] ">
            <div className={`${styles.flexCenter} relative`}>
              {/* <label htmlFor="cekNIS">Masukan NIS</label> */}
              <Link href={'/'} className="xxs:flex xxs:mx-auto xxs:mt-3 lg:mt-0 md:mx-none lg:absolute font-semibold bg-primary text-white rounded-lg px-[2.5rem] xxs:py-[10px] md:py-[10px] z-10 md:mr-none lg:mr-[1rem] hover:bg-secondary transition delay-200 lg:top-2 lg:right-20 bottom-2">
                Login untuk memilih
                <img src={arrowleft} alt="arrow-up" className="w-[20px] h-auto ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        )
      }
    </section >
  );
};

export default Check;
