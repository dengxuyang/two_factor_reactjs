import BlanceModal from "../components/BlanceModal";
import { CommonButton } from "../components/CommonButton";
const styles = {
  cth: "bg-[#242529] text-[#777E90] normal-case text-xs font-bold",
};
const DashboardPage = () => {
  return (
    <>
      <section className="bg-main-dark-600 min-h-screen relative text-white">
        <BlanceModal />
        <img
          className="absolute h-50 w-full"
          src="/assets/bg-dashboard.png"
          alt=""
        />
        <div className="w-full flex justify-center">
          <div className="w-4/5  relative py-9">
            <div className=" text-[40px] font-bold">Dashboard</div>
            <div className="bg-[#242529] h-[184px] rounded p-8">
              <div className="font-bold text-2xl flex justify-between">
                <div>Account overview</div>
                <div className="flex">
                  <span className="mr-2 relative">
                    <CommonButton btnColor="bg-#353945">
                      <label
                        htmlFor="my-modal-3"
                        className=" absolute w-full h-full top-0 left-0 leading-8"
                      >
                        Withdraw
                      </label>
                    </CommonButton>
                  </span>
                  <span className="relative">
                    <CommonButton
                      btnColor="bg-white"
                      textColor="text-[#353945]"
                    >
                      <label
                        htmlFor="my-modal-2"
                        className=" absolute w-full h-full top-0 left-0 leading-8"
                      >
                        Deposit
                      </label>
                    </CommonButton>
                  </span>
                </div>
              </div>
              <div className=" flex mt-5">
                <div className="flex flex-col  flex-1">
                  <div className="text-[#777E90] text-sm mb-1">Net Worth</div>
                  <div>
                    <div className="flex">
                      <span className="text-2xl font-bold">$5,300.27</span>
                      <span className="h-7 leading-7 px-2 inline-block rounded whitespace-nowrap ml-1 bg-[#2DAB50]  text-center text-sm font-bold">
                        APY: 1.25%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  flex-1">
                  <div className="text-[#777E90] text-sm mb-1">
                    Est. Earnings
                  </div>
                  <div>
                    <span className="text-2xl font-bold">$10,098.36</span>
                  </div>
                </div>
                <div className="flex flex-col  flex-1">
                  <div className="text-[#777E90] text-sm mb-1">
                    Projects Ongoing
                  </div>
                  <div>
                    <span className="text-2xl font-bold">50 Tickets</span>
                  </div>
                </div>
                <div className="flex flex-col  flex-1">
                  <div className="text-[#777E90] text-sm mb-1">
                    USDT Available
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">1,641.2028</span>
                      <img
                        className="w-6 h-6 ml-2"
                        src="/assets/icon-usdt.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#242529] w-full mt-10 rounded px-[32px] py-10">
              <div className="font-bold text-2xl flex justify-between">
                <div>My Participated</div>
                <div>
                  <div className="tabs tabs-boxed bg-inherit ">
                    <a className="tab text-[#777E90] text-xs font-medium">
                      All type
                    </a>
                    <a className="tab text-white text-xs font-medium bg-[#353945] !rounded-3xl ">
                      On Sale
                    </a>
                    <a className="tab text-[#777E90] text-xs font-medium">
                      Ongoing
                    </a>
                    <a className="tab text-[#777E90] text-xs font-medium">
                      Closed
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full mt-4">
                  <table className="table w-full ">
                    {/* head */}
                    <thead>
                      <tr className="border-y border-[#353945]">
                        <th className={styles.cth}>Project Name</th>
                        <th className={styles.cth}>Participants</th>
                        <th className={styles.cth}>My Tickets</th>
                        <th className={styles.cth}>DEst. Earningsate</th>
                        <th className={styles.cth}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <td className="bg-[#242529]">
                          <div className="flex items-center space-x-3">
                            <div className="text-sm  font-medium flex justify-center items-center">
                              <img src="/assets/icon-projectLogo.png" alt="" />
                              <span className="ml-2">Project Arb Zero</span>
                            </div>
                          </div>
                        </td>
                        <td className="bg-[#242529] text-sm ">
                          <div className="flex items-center space-x-3">
                            <div className="text-sm  font-medium flex justify-center items-center">
                              <span className="mr-2">Project Arb Zero</span>
                              <img src="/assets/icon-popular.svg" alt="" />
                            </div>
                          </div>
                        </td>
                        <td className="bg-[#242529] text-sm">
                          <div>50 Tickets</div>
                        </td>
                        <td className="bg-[#242529] text-[#777E90] text-sm">
                          <div>$10,098.36</div>
                        </td>
                        <td className="bg-[#242529] text-sm">
                          <div className="flex items-center space-x-3">
                            <span>
                              <span className="text-[#777E90]">End in </span>
                              <span className="text-[#EC6E72]">
                                05 D 21 H 21 M
                              </span>
                            </span>
                            <div className="w-[78px] h-[30px] bg-[#EC6E721F]/10 rounded flex justify-center items-center">
                              <span className="text-[#EC6E72]">On Sale</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
