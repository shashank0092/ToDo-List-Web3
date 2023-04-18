import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
const Navbar = () => {

    return (
        <>

            <div className="p-7" >
                <div className="flex nav-icons " >
                    <div className="flex-1" >
                        <GiHamburgerMenu size={40} color={"white"} />
                    </div>
                    <div className="flex space-x-10" >
                        <AiOutlineSearch size={40} color={"white"} />
                        <AiOutlineBell size={40} color={"white"} />
                    </div>
                </div>

                <div className="nav-heading mt-5 mb-5 " >
                    <p className="text-white text-5xl font-bold" >What's up,sir !</p>
                </div>

                <div className="nav-subheading mt-5 mb-50">
                    <p className="text-blue-200 text-xl uppercase " >Today's Tasks</p>
                </div>
            </div>

        </>
    )
}

export default Navbar;