import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { toast } from "react-toastify";
import { PublicProject } from "../api/types";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [publicProject, setPublicProject] = useState<PublicProject>();
  const jump = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  const getPublicProject = async () => {
    try {
      const { data: project } = await authApi.post<PublicProject>(
        "/api/publicProject",
        {
          page: 1, //页码, 默认1页
          size: 20, //每页数量
        }
      );
      if (project.code === 0) {
        console.log(project.data);
        setPublicProject(project);
      } else {
        toast.error(project.msg, {
          position: "top-right",
        });
      }
    } catch (error: any) {
      // store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    getPublicProject();
  }, []);

  return (
    <>
      <section className="bg-main-dark-600 min-h-screen pt-10 text-white">
        <div className="max-w-5xl mx-auto ">
          <div className="relative">
            <div className="relative z-10">
              <span className="text-[#E9575C] text-[64px] font-bold mb-10">
                Copilot
              </span>
              <br />
              <span className="text-[64px] font-semibold mb-10">
                Exploring the best
              </span>
              <br />
              <span className="text-[64px] font-semibold mb-10">
                airdrop projects
              </span>
              <br />{" "}
              <span className="text-[64px] font-semibold mb-10">in Web3!</span>
              <div className=" text-lg mt-7">
                Copilot is an airdrop hosting platform with a million-user
                matrix,
                <br /> focused on providing comprehensive testing and support{" "}
                <br />
                services for emerging projects.
              </div>
              <button
                onClick={() => jump("projectTitle")}
                className="btn h-10 text-[18px] mt-4 font-medium min-h-[46px] normal-case  px-8 bg-[#EC6E72]  rounded-md outline-none border-none flex justify-center bg-gradient-to-b  hover:from-[#F29A9D] hover:to-[#AE6FFF]"
              >
                Explore
              </button>
            </div>

            <img
              src="/assets/bg-home-tr.png"
              className="absolute top-0 right-0"
              alt=""
            />
          </div>

          {/* <p className="text-3xl font-semibold">
            Welcome to Two-Factor Auth with React.js
          </p> */}
          <div className="min-h-[800px] mt-[112px] pb-[150px] relative">
            <img
              src="/assets/bg-home-ctr.png"
              alt=""
              className=" absolute top-0 right-0 "
            />
            <img
              src="/assets/bg-home-cbl.png"
              alt=""
              className=" absolute bottom-0 left-0"
            />
            <div className="w-[93%] relative z-10">
              <div id="projectTitle" className=" text-[26px]  ml-4">
                Hot Projects
              </div>
              {publicProject?.data.projects.map((project) => {
                return (
                  <div
                    className="mt-[50px] ml-4 cursor-pointer"
                    onClick={() => navigate("/projectDetail/"+project.id)}
                  >
                    <div className="rounded-md bg-[#242529] p-8">
                      <div className="flex items-center">
                        <img src="/assets/projectmock.png" alt="" />
                        <div className=" text-[26px] font-bold ml-5">
                          {project.name}
                        </div>
                        <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                          On Sale
                        </div>
                        <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                          Ethereum
                        </div>
                      </div>
                      <div className="text-[#AAAEBC] mt-6">
                        {project.comment}
                      </div>
                      <div className=" flex mt-5">
                        <div className="flex flex-col  flex-1">
                          <div className="text-white text-sm mb-1">
                            Est. Total Earnings
                          </div>
                          <div>
                            <div className="flex">
                              <span className="text-2xl font-bold">${project.earn||'-'}</span>
                              <span className="h-7 leading-7 px-2 inline-block rounded whitespace-nowrap ml-1 bg-[#2DAB50]  text-center text-sm font-bold">
                                APY: -%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col  flex-1">
                          <div className="text-white  text-sm mb-1">
                            Single Initial Investment
                          </div>
                          <div>
                            <span className=" text-lg font-bold">
                              {project.ticket_price} USDT / Ticket
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col  flex-1">
                          <div className="text-white  text-sm mb-1">
                            Hard Cap
                          </div>
                          <div>
                            <span className="text-lg font-bold">
                             {project.ticket_total} Tickets
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col  flex-1">
                          <div className="text-white  text-sm mb-1">
                            Participants
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="text-lg font-bold">
                                {project.ticket_process} Tickets
                              </span>
                              <img
                                className="ml-2"
                                src="/assets/icon-popular.svg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* <div className="mt-[50px] ml-4 cursor-pointer">
                <div className="rounded-md bg-[#242529] p-8">
                  <div className="flex items-center">
                    <img src="/assets/projectmock.png" alt="" />
                    <div className=" text-[26px] font-bold ml-5">
                      Project Name
                    </div>
                    <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                      On Sale
                    </div>
                    <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                      Ethereum
                    </div>
                  </div>
                  <div className="text-[#AAAEBC] mt-6">
                    This project is mainly aimed at seeing why over 400k users
                    are using the free axe DevTools browser This project is
                    mainly aimed at seeing why over 400k users are using the
                    free axe DevTools browser This project.
                  </div>
                  <div className=" flex mt-5">
                    <div className="flex flex-col  flex-1">
                      <div className="text-white text-sm mb-1">
                        Est. Total Earnings
                      </div>
                      <div>
                        <div className="flex">
                          <span className="text-2xl font-bold">$-</span>
                          <span className="h-7 leading-7 px-2 inline-block rounded whitespace-nowrap ml-1 bg-[#2DAB50]  text-center text-sm font-bold">
                            APY: -%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col  flex-1">
                      <div className="text-white  text-sm mb-1">
                        Single Initial Investment
                      </div>
                      <div>
                        <span className=" text-lg font-bold">
                          100 USDT / Ticket
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col  flex-1">
                      <div className="text-white  text-sm mb-1">Hard Cap</div>
                      <div>
                        <span className="text-lg font-bold">
                          100,000 Tickets
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col  flex-1">
                      <div className="text-white  text-sm mb-1">
                        Participants
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="text-lg font-bold">
                            100,357 Tickets
                          </span>
                          <img
                            className="ml-2"
                            src="/assets/icon-popular.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[50px] ml-4 cursor-pointer">
                <div className="rounded-md bg-[#242529] p-8">
                  <div className="flex items-center">
                    <img src="/assets/projectmock.png" alt="" />
                    <div className=" text-[26px] font-bold ml-5">
                      Project Name
                    </div>
                    <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                      On Sale
                    </div>
                    <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                      Ethereum
                    </div>
                  </div>
                  <div className="text-[#AAAEBC] mt-6">
                    This project is mainly aimed at seeing why over 400k users
                    are using the free axe DevTools browser This project is
                    mainly aimed at seeing why over 400k users are using the
                    free axe DevTools browser This project.
                  </div>
                  <div className=" flex mt-5">
                    <div className="flex flex-col  flex-1">
                      <div className="text-white text-sm mb-1">
                        Est. Total Earnings
                      </div>
                      <div>
                        <div className="flex">
                          <span className="text-2xl font-bold">$-</span>
                          <span className="h-7 leading-7 px-2 inline-block rounded whitespace-nowrap ml-1 bg-[#2DAB50]  text-center text-sm font-bold">
                            APY: -%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col  flex-1">
                      <div className="text-white  text-sm mb-1">
                        Single Initial Investment
                      </div>
                      <div>
                        <span className=" text-lg font-bold">
                          100 USDT / Ticket
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col  flex-1">
                      <div className="text-white  text-sm mb-1">Hard Cap</div>
                      <div>
                        <span className="text-lg font-bold">
                          100,000 Tickets
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col  flex-1">
                      <div className="text-white  text-sm mb-1">
                        Participants
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="text-lg font-bold">
                            100,357 Tickets
                          </span>
                          <img
                            className="ml-2"
                            src="/assets/icon-popular.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
