import { Link } from '@inertiajs/react';
import styles from '../../css/style';
import { arrowleft } from "@/assets";

const Rembutton = () => (
<div className={`${styles.flexStart} bg-[#FFFFFF]p-[2px] rounded-[20px] cursor-pointer w-full mt-4 shadow-xl`}>
    <div className={`${styles.flexStart} flex-row bg-primary rounded-[20px] w-[17rem] hover:scale-110 transition-all duration-300 ease-in-out`}>
      <div className={`${styles.flexStart} flex`}>
        <p className="font-poppins font-semibold text-[16px] leading-[23.4px] p-2">
          <Link href='/login' type='button' as='button' className='tracking-wide text-white'>LOGIN UNTUK MEMILIH</Link>
        </p>
        <img src={arrowleft} alt="arrow-up" className="w-[20px] h-auto ml-2 rotate-180" />
      </div>
    </div>
  </div>
);

export default Rembutton;
