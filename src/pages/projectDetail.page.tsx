import { useEffect, useMemo, useState } from "react";
import { tokenApi } from "../api/authApi";
import { ProjectEarn, Projectdetail } from "../api/types";
import { CommonButton } from "../components/CommonButton";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import useStore from "../store";
import { useNavigate, useParams } from "react-router-dom";

const styles = {
  cth: "bg-main-dark-600  text-[#777E90] normal-case text-xs font-bold",
};
const ProjectDetail = () => {
  const params = useParams();
  const store = useStore();
  const navigate = useNavigate();
  const [projectDetail, setProjectDetail] = useState<Projectdetail>();
  const [projectEarn, setProjectEarn] = useState<ProjectEarn>();
  const [ticketNum, setTicketNum] = useState<number>();
  const participantsValue = useMemo(
    () =>
      projectDetail &&
      (projectDetail?.data.ticket_process / projectDetail?.data.ticket_total) *
        100,
    [projectDetail]
  );
  const useAssets = useMemo(() => store.userAssets, [store]);
  const IsInsufficientBalance = useMemo<boolean>(
    () =>
      Boolean(
        useAssets &&
          projectDetail &&
          useAssets?.data.total_value > projectDetail?.data.ticket_price &&
          ticketNum &&
          ticketNum * projectDetail.data.ticket_price >
            useAssets?.data.total_value
      ),
    [useAssets, projectDetail, ticketNum]
  );

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return null;
    } else {
      // Render a countdown
      return (
        <>
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max items-center">
            <div className="flex flex-col p-2 text-[#141416] bg-white rounded-box">
              <span className="countdown font-mono text-[28px] w-[72px]">
                {/*  @ts-ignore */}
                <span className="mx-auto" style={{ "--value": days }}></span>
              </span>
              <div className=" text-xs text-[#777E90] mt-2 border-t border-[#D4D4D4] pt-1">
                d
              </div>
            </div>
            :
            <div className="flex flex-col p-2 text-[#141416] bg-white rounded-box">
              <span className="countdown font-mono text-center text-[28px] w-[72px]">
                {/*  @ts-ignore */}
                <span className="mx-auto" style={{ "--value": hours }}></span>
              </span>
              <div className=" text-xs text-[#777E90] mt-2 border-t border-[#D4D4D4] pt-1">
                h
              </div>
            </div>
            :
            <div className="flex flex-col p-2 text-[#141416] bg-white  rounded-box ">
              <span className="countdown font-mono  text-[28px] w-[72px]">
                {/*  @ts-ignore */}
                <span className="mx-auto" style={{ "--value": minutes }}></span>
              </span>
              <div className=" text-xs text-[#777E90] mt-2 border-t border-[#D4D4D4] pt-1">
                m
              </div>
            </div>
            :
            <div className="flex flex-col p-2 text-[#141416] bg-white  rounded-box ">
              <span className="countdown font-mono  text-[28px] w-[72px]">
                {/*  @ts-ignore */}
                <span className="mx-auto" style={{ "--value": seconds }}></span>
              </span>
              <div className=" text-xs text-[#777E90] mt-2 border-t border-[#D4D4D4] pt-1">
                s
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  const getProjectDetail = async () => {
    try {
      const { data: project } = await tokenApi.post<Projectdetail>(
        "/api/projectInfo",
        {
          pid: params.projectId,
        }
      );
      if (project.code === 0) {
        console.log(project.data);
        setProjectDetail(project);
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
  const getProjectEarn = async () => {
    try {
      const { data: project } = await tokenApi.post<ProjectEarn>(
        "/api/projectEarn",
        {
          pid: params.projectId,
        }
      );
      if (project.code === 0) {
        console.log(project.data);
        setProjectEarn(project);
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
  const handleJoinProject = async () => {
    try {
      const { data: project } = await tokenApi.post<ProjectEarn>(
        "/api/joinProject",
        {
          pid: params.projectId,
          ticket: ticketNum || 0,
          totp: "",
        }
      );
      if (project.code === 0) {
        // setProjectEarn(project);
        toast.success("successful purchase!", {
          position: "top-right",
        });
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
    getProjectDetail();
    getProjectEarn();
  }, []);
  return (
    <>
      <section className="bg-main-dark-600 min-h-screen relative text-white">
        <img
          className="absolute h-50 w-full"
          src="/assets/banner-project.png"
          alt=""
        />
        <div className="w-full flex justify-center">
          <div className="w-4/5  relative py-9">
            <div className="mt-[50px] ml-4">
              <div className="rounded-md bg-[#242529] p-8">
                <div className="flex">
                  <img
                    className="w-[200px] h-[140px]"
                    src="/assets/projectmock.png"
                    alt=""
                  />
                  <div>
                    <div className="flex">
                      <div className=" text-[26px] font-bold ml-5">
                        {projectDetail?.data.name}
                      </div>
                      <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                        On Sale
                      </div>
                      <div className="bg-[#20B26C1F] ml-5 text-sm text-[#20B26C] h-[30px] rounded-sm px-2 flex items-center">
                        Ethereum
                      </div>
                    </div>
                    <p className="text-white mt-3 ml-[30px] text-xs">
                      {projectDetail?.data.comment}
                    </p>
                  </div>
                </div>

                <div className=" flex mt-11">
                  <div className="flex flex-col  flex-1">
                    <div className="text-white text-sm mb-1">
                      Est. Total Earnings
                    </div>
                    <div>
                      <div className="flex">
                        <span className="text-2xl font-bold">
                          ${projectDetail?.data.earn || "-"}
                        </span>
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
                        {projectDetail?.data.ticket_price} USDT / Ticket
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col  flex-1">
                    <div className="text-white  text-sm mb-1">Hard Cap</div>
                    <div>
                      <span className="text-lg font-bold">
                        {projectDetail?.data.ticket_total} Tickets
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col  flex-1">
                    <div className="text-white  text-sm mb-1">Participants</div>
                    <div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold">
                          {projectDetail?.data.ticket_process} Tickets
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
                <div className="font-bold text-lg flex justify-between mt-20">
                  <div>Subscription Timeline</div>
                  <div className="flex">
                    <span className="mr-2 relative">
                      <CommonButton
                        onClick={() =>
                          navigate("/profile", { state: { menuid: 1 } })
                        }
                        btnColor="bg-#353945"
                      >
                        My Balance
                      </CommonButton>
                    </span>
                    <span className="relative">
                      <CommonButton
                        btnColor="bg-white"
                        textColor="text-[#353945]"
                        onClick={() => navigate("/dashboard")}
                      >
                        My Participated
                      </CommonButton>
                    </span>
                  </div>
                </div>
                {/* step bar */}
                <div className="flex mt-12 items-center">
                  <div className="flex items-center">
                    <div className="flex text-sm font-bold justify-center items-center rounded-[50%] bg-[#2DAB50] w-8 h-8">
                      1
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-bold">
                        Subscription Period
                      </div>
                      <div className="text-xs font-normal">04-03 10:00 UTC</div>
                    </div>
                  </div>
                  <div className=" border-dashed border h-0 w-10 border-[#777E90] mx-4"></div>
                  <div className="flex items-center opacity-50">
                    <div className="flex text-sm font-bold justify-center items-center rounded-[50%] bg-[#EC6E72] w-8 h-8">
                      2
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-bold">Project Ongoing</div>
                      <div className="text-xs font-normal">04-03 10:00 UTC</div>
                    </div>
                  </div>
                  <div className=" border-dashed border h-0 w-10 border-[#777E90] mx-4"></div>
                  <div className="flex items-center opacity-50">
                    <div className="flex text-sm font-bold justify-center items-center rounded-[50%] bg-[#EC6E72] w-8 h-8">
                      3
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-bold">
                        Calculation Period
                      </div>
                      <div className="text-xs font-normal">04-03 10:00 UTC</div>
                    </div>
                  </div>
                  <div className=" border-dashed border h-0 w-10 border-[#777E90] mx-4"></div>
                  <div className="flex items-center opacity-50">
                    <div className="flex text-sm font-bold justify-center items-center rounded-[50%] bg-[#EC6E72] w-8 h-8">
                      4
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-bold">
                        Final Token Distribution
                      </div>
                      <div className="text-xs font-normal">04-03 10:00 UTC</div>
                    </div>
                  </div>
                </div>
                {/* count down and input card */}
                <div className="bg-[#141416] rounded-[10px] py-[30px] pl-[30px]  mt-6  xl:flex ">
                  <div className="flex-1 border-l border-[#777E90]  border-dashed pl-10 pr-[50px] flex flex-col">
                    <div>
                      <div className="text-xs mb-[10px]">
                        Subscription ends in
                      </div>
                      <div className="mb-5">
                        {projectDetail && (
                          <Countdown
                            date={Number(projectDetail?.data.end_ts + "000")}
                            renderer={renderer}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-[10px]">Participants</div>
                      {participantsValue ? (
                        <>
                          <div className="h-14 bg-[#EC6E72]/50 rounded-lg relative">
                            <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                              {participantsValue || 0}%
                            </div>
                            <div
                              className={twMerge(
                                "h-14 bg-[#EC6E72] rounded-tl-lg rounded-bl-lg  ",
                                `w-[${participantsValue}%]`
                              )}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <div className="h-14 bg-[#EC6E72]/50 rounded-lg relative">
                          <div className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                            0%
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between pt-6">
                        <div>
                          <div className="text-xs mb-[10px]">Token Raised</div>
                          <div className=" text-lg font-bold">
                            $ {projectDetail?.data.user_earn}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs mb-[10px]">Ticket Price</div>
                          <div className=" text-lg font-bold">
                            {projectDetail?.data.ticket_price} USDT
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 border-l border-[#777E90]   pl-10">
                    <div>
                      <div className="text-xs mb-[10px]">Your Tickets </div>
                      <div className=" text-lg font-bold">
                        {projectDetail?.data.user_ticket} Tickets ($
                        {projectDetail &&
                          projectDetail?.data.user_ticket *
                            projectDetail?.data.ticket_price}
                        )
                      </div>
                    </div>
                    <div className="text-xs mb-[10px] mt-8">Amount</div>
                    <div
                      className={twMerge(
                        "border rounded-md border-[#777E90] p-2 mr-[50px]",
                        `${IsInsufficientBalance && "border-[#EC6E72]"}`
                      )}
                    >
                      <div className=" flex justify-between">
                        <div className="text-[#777E91] text-sm">
                          {(projectDetail &&
                            ticketNum &&
                            ticketNum * projectDetail?.data.ticket_price) ||
                            0}{" "}
                          USDT
                        </div>
                        <div className="text-sm">
                          Balance: {useAssets?.data.total_value} USDT
                        </div>
                      </div>
                      <div className=" flex justify-between mt-3">
                        <input
                          type="text"
                          placeholder="0"
                          className=" border-none outline-none bg-inherit"
                          value={ticketNum}
                          onChange={(e: any) => setTicketNum(e.target.value)}
                        />
                        <div
                          className="flex items-center"
                          onClick={() =>
                            useAssets &&
                            projectDetail &&
                            setTicketNum(
                              Math.floor(
                                useAssets?.data.total_value /
                                  projectDetail?.data.ticket_price
                              )
                            )
                          }
                        >
                          <span className=" rounded bg-[#EC6E72] mr-[10px]  cursor-pointer px-2 py-1 text-xs">
                            MAX
                          </span>
                          <span className="text-xl">Ticket</span>
                        </div>
                      </div>
                    </div>

                    {IsInsufficientBalance && (
                      <div className="text-[#EC6E72] text-xs">
                        Insufficient balance
                      </div>
                    )}
                    <div className=" flex justify-end mt-5 pr-[50px]">
                      <CommonButton
                        onClick={() => handleJoinProject()}
                        disabled={IsInsufficientBalance}
                        btnHight="h-[46px]"
                        constomStyle="w-40"
                      >
                        Buy Ticket
                      </CommonButton>
                    </div>
                  </div>
                </div>
                <div className="text-[18px] font-medium mt-10">
                  Project Project Introduction
                </div>
                <div>Project Details</div>
                <div className="text-[18px] font-medium mt-10">
                  Token Sale and Economics
                </div>
                <div className="flex">
                  <div className="text-[#777E90] text-xs">
                    <p className="mt-[10px]">Subscription Start</p>
                    <p className="mt-[10px]">Purchase Token Supported</p>
                    <p className="mt-[10px]">Spotlight Allocation</p>
                    <p className="mt-[10px]">Spotlight Vesting Period</p>
                  </div>
                  <div className=" text-xs ml-20">
                    <p className="mt-[10px]">Subscription Start</p>
                    <p className="mt-[10px]">Purchase Token Supported</p>
                    <p className="mt-[10px]">Spotlight Allocation</p>
                    <p className="mt-[10px] max-w-sm">
                      1/13 will be unlocked on the Token Generation Event(TGE).
                      After 30 days, an additional 1/13 shall be released
                      monthly, such that all Spotlight allocations are released
                      within twelve months from the TGE date.
                    </p>
                  </div>
                </div>
              </div>
              <h1 className="text-[26px] mt-10 font-medium">
                All Airdrop Token Included
              </h1>
              <div className=" overflow-x-auto">
                <table className="table w-full text-sm">
                  {/* head */}
                  <thead>
                    <tr className="border-y border-[#353945]">
                      <th className={styles.cth}>Token</th>
                      <th className={styles.cth}>Circ. market cap</th>
                      <th className={styles.cth}>Airdrop Amount</th>
                      <th className={styles.cth}>Price</th>
                      <th className={styles.cth}>Participate Address</th>
                      <th className={styles.cth}>
                        Average of Airdrop <br /> Tokens Per Address
                      </th>
                      <th className={styles.cth}>Social Media</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {projectEarn?.data.project_earn.map((earn) => {
                      return (
                        <tr>
                          <td className="bg-main-dark-600 border-y border-[#353945]">
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-8 h-8">
                                  <img src="/assets/icon-usdt.svg" alt="" />
                                </div>
                              </div>
                              <div>
                                <span className="text-sm">{earn.token}</span>
                                <span className="text-sm opacity-50">
                                  {earn.token}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="bg-main-dark-600 border-y border-[#353945]">
                            <div>$ {earn.total_value}</div>
                          </td>
                          <td className="bg-main-dark-600 border-y border-[#353945]">
                            <div>
                              <div className="text-sm">{earn.token_amount}</div>
                              <div className="text-sm opacity-50">
                                ${earn.total_value}
                              </div>
                            </div>
                          </td>
                          <td className="bg-main-dark-600 border-y border-[#353945]">
                            {earn.price}
                          </td>
                          <td className="bg-main-dark-600 border-y border-[#353945]">
                            {earn.total_address}
                          </td>
                          <td className="bg-main-dark-600 border-y border-[#353945]">
                            {earn.average}
                          </td>
                          <td className="bg-main-dark-600 border-y border-[#353945]">
                            <div className="grid gap-1 grid-cols-3">
                              <img
                                className=" cursor-pointer"
                                src="/assets/icon-website.png"
                                onClick={() => window.open(earn.social[0])}
                                alt=""
                              />
                              <img
                                className=" cursor-pointer"
                                onClick={() => window.open(earn.social[5])}
                                src="/assets/icon-dc.png"
                                alt=""
                              />
                              <img
                                className=" cursor-pointer"
                                src="/assets/icon-tw.png"
                                onClick={() => window.open(earn.social[2])}
                                alt=""
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProjectDetail;
