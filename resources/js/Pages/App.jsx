import styles from "../../css/style.js";
import Gallerycpy from "@/Components/gallery/Gallery.jsx";
import { Clients, Reminder, Accordion, Footer, Login, Chart, Check, Navbar, Step, Hero } from "@/Components";
import { Head } from "@inertiajs/react";
// import { dataSuara } from "./constants"; 
// import FeedbackCard from "./components/FeedbackCard";

const isLogin = localStorage.getItem('_name')

const App = () => (
  <div className="bg-white w-full m-auto">
    <Head>
      <title>VoteSmecone</title>
    </Head>
    <div className="bg-primary rounded-b-lg fixed top-0 left-0 right-0 p-3 sm:h-[90px] ml:h-[100px] lg:h-[100px] z-9999">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth} `}>
          <Navbar />
        </div>
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart} rounded-b-xxl`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
        <div className="xxs:flex md:hidden bg-primary">
          <Step />
        </div>
      </div>
    </div>

    <div  className={`xxs:hidden md:flex ${styles.flexCenter} md:relative z-100 xxs:top-[5rem] md:top-[2rem] bg-white `}>
      <Step />
      {/* <Login/> */}
    </div>

    <div className={`bg-white ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <div>
          <Clients />
        </div>
        <Chart />
        <Check />
        <Gallerycpy />
        <Accordion />
        <Reminder />
      </div>
    </div>
    <div className="bg-[#FFFFFF]">
      <Footer />
    </div>
  </div>
);

export default App;