import { Link, useNavigate } from "react-router-dom";
import useStore from "../store";
import Spinner from "./Spinner";
import { tokenApi } from "../api/authApi";
import { SignOutResponse } from "../api/types";
import { toast } from "react-toastify";

const Header = () => {
  
  const store = useStore();
  const navigate=useNavigate()
  const user = store.authUser;
  const handleLogout =async () => {
   const { data: status } = await tokenApi.post<SignOutResponse>(
    "/api/signOut",
    {}
  );
  if (status.code === 0) {
    
    // if (loginInfo.data.token) {
    //   navigate("/login/validateOtp");
    // } else {
    //   navigate("/profile");
    // }
    store.setToken('')
    store.setAccount(null)
    store.setAuthUser(null)
    navigate("/login");
  }else{
    toast.error(status.msg, {
      position: "top-right",
    });
  }
  };

  return (
    <>
      <div className="navbar bg-main-dark-600 sticky top-0 py-0 z-10">
        <div className="flex-1">
          <a className="btn btn-ghost font-medium normal-case text-xl text-white">
            <img
              className="w-[22.58px] h-[22.52px] mr-3"
              src="/assets/logo-capilot.png"
              alt=""
            />{" "}
            Capilot
          </a>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 text-white/50 font-medium text-base">
              <li className="  text-white/10 min-h-[64px]">
                <a>Projects</a>
              </li>
             
              <li className=" hover:bg-white/20 min-h-[64px]" onClick={()=>{navigate('/dashboard')}}>
                <a>Dashboard</a>
              </li>
              <li className=" text-white/10 min-h-[64px]">
                <a>Tutorial</a>
              </li>
              <li tabIndex={0} className=" text-white/10 min-h-[64px]">
                <a>
                Docs
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                {/* <ul className="p-2 bg-[#242529]">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul> */}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none">
          <span className="text-sm text-white mr-3">{user?.data.name}</span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-white">
                <img src="https://images.blur.io/_blur-prod/0x79fcdef22feed20eddacbb2587640e45491b757f/5666-bb782d0f09729d7c?w=640" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#242529] rounded-box w-52 text-white"
            >
              <li onClick={()=>navigate('/profile')}>
                <a className="justify-start">
                  <span>
                    <img src="/assets/icon-setting.svg" alt="" />
                  </span>
                  My Account
                </a>
              </li>

              <li onClick={()=>handleLogout()}>
                <a>
                  <span>
                    <img src="/assets/icon-logout.svg" alt="" />
                  </span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <header className="bg-white h-20">
    //     <nav className="h-full flex justify-between container items-center">
    //       <div>
    //         <Link to="/" className="text-ct-dark-600 text-2xl font-semibold">
    //           CodevoWeb
    //         </Link>
    //       </div>
    //       <ul className="flex items-center gap-4">
    //         <li>
    //           <Link to="/" className="text-ct-dark-600">
    //             Home
    //           </Link>
    //         </li>
    //         {!user && (
    //           <>
    //             <li>
    //               <Link to="/register" className="text-ct-dark-600">
    //                 SignUp
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/login" className="text-ct-dark-600">
    //                 Login
    //               </Link>
    //             </li>
    //           </>
    //         )}
    //         {user && (
    //           <>
    //             <li>
    //               <Link to="/profile" className="text-ct-dark-600">
    //                 Profile
    //               </Link>
    //             </li>
    //             <li className="cursor-pointer" onClick={handleLogout}>
    //               Logout
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //     </nav>
    //   </header>
    //   <div className="pt-4 pl-2 bg-main-dark-600 fixed">
    //     {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
    //   </div>
    // </>
  );
};

export default Header;
