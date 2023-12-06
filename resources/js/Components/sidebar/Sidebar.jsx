import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import {
    Calendar,
    Chart,
    Chart_fill,
    Chat,
    Folder,
    Search,
    Setting,
    User,
    Control,
    logo,
} from "../../assets";

const Sidebar = (props) => {
    const [open, setOpen] = useState(true);
    // const [root, setRoot] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    const Menus = [
        { title: "Dashboard", src: Folder },
        { title: "Voters", src: Chart_fill, gap: true },
        { title: "Candidates", src: User },
        { title: "Chart", src: Chart },
        { title: "Tambah", src: Setting, gap: true },
    ];

    const handleItemClick = (index, e) => {
        setSelectedItem(index);
        e.preventDefault();
    };

    return (
        <div className="flex">
            <div
                className={` ${
                    open ? "w-72" : "w-20 "
                } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src={Control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src={logo}
                        className={`cursor-pointer duration-500 ${
                            open && "rotate-[360deg]"
                        }`}
                    />
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                        ${Menu.gap ? "mt-9" : "mt-2"} ${
                                index === selectedItem ? "bg-gray-400" : ""
                            } ${!open && "bg-light-white"} `}
                            onClick={() => handleItemClick(index)}
                        >
                            <img src={Menu.src} />
                            <Link
                                type="button"
                                as="button"
                                href={`${
                                    Menu.title === "Dashboard"
                                        ? "/admin"
                                        : "/admin/" + Menu.title.toLowerCase()
                                }`}
                            >
                                <span
                                    className={`${
                                        !open && "hidden"
                                    } origin-left duration-200`}
                                >
                                    {Menu.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">
                    Page {props.pageName}
                </h1>
                {props.page}
            </div>
        </div>
    );
};
export default Sidebar;
