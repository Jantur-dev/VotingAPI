import styles from "../../css/style";
import { arrowUp } from "@/assets";
import { Link } from "@inertiajs/react";
const isLogin = localStorage.getItem('_name')
const GetStarted = () => (
  <div className={`${styles.flexCenter} bg-white p-[2px] rounded-[20px] cursor-pointer w-  mt-4 shadow-xl`}>
    <div className={`${styles.flexStart} flex-row bg-white rounded-[20px] w-[17rem] hover:scale-110 transition-all duration-300 ease-in-out`}>
      <div className={`${styles.flexStart} flex`}>
        <p className="font-poppins font-semibold text-[16px] leading-[23.4px] p-2">
          {/* <span className=" tracking-wide text-primary">LOGIN UNTUK MEMILIH</span> */}
          <Link href={isLogin ? "/vote" : "/login"} as="button" type="button" className="tracking-wide text-primary">{isLogin ? (
            "Vote Disini"
          ) : (
            "Login untuk memilih"
          )}</Link>
        </p>
        <img src={arrowUp} alt="arrow-up" className="w-[20px] h-auto ml-2 " />
      </div>
    </div>
  </div>
);

export default GetStarted;
