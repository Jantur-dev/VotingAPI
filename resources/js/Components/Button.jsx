import React from "react";
import { Link } from "@inertiajs/react";
const isLogin = localStorage.getItem('_name')

const Button = ({ styles,  user}) => (
  <>
    <Link href={isLogin ? "/" : "/login"} type="button" as="button" className={`py-1 px-8  font-poppins font-semibold text-[20px] text-white border-4 bg-transparent rounded-[30px] outline-none ${styles} hover:scale-110 transition-all duration-300 ease-in`}>
      {isLogin ? (
        isLogin
      ) : (
        "Login Pemilih"
      )}
      </Link>  
  </>
  // <button type="button" className={`py-1 px-8  font-poppins font-semibold text-[20px] text-white border-4 bg-transparent rounded-[30px] outline-none ${styles} hover:scale-110 transition-all duration-300 ease-in`}>
  //   Login Pemilih
  // </button>
);

export default Button;
