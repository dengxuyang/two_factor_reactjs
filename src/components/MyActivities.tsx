import { toast } from "react-toastify";
import { tokenApi } from "../api/authApi";
import { ActivityInfo } from "../api/types";
import { CommonButton } from "./CommonButton";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import PaginationWarp from "./Pagination";

const styles = {
  cth: "bg-[#242529] text-[#777E90] normal-case text-xs font-bold",
};
type ResActivity = {
  acType: number;
  page: number;
  size: number;
};
function MyActivites() {
  const [activityPamars, setActivityPamars] = useState<ResActivity>({
    acType: 0,
    page: 1,
    size: 20,
  });
  const [activityList, setActivityList] = useState<ActivityInfo>();
  const getUserActivity = async () => {
    try {
      const { data: assets } = await tokenApi.post<ActivityInfo>(
        "/api/userActivity",
        activityPamars
      );
      if (assets.code === 0) {
        setActivityList(assets);
      } else {
        toast.error(assets.msg, {
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
  const handleFilter = (type: number) => {
    setActivityPamars((pre) => ({ ...pre, acType: type }));
    console.log(type);
  };
  const changePagination=(page:number)=>{
    setActivityPamars((pre) => ({ ...pre, page }));
  }
  useEffect(() => {
    getUserActivity();
  }, [activityPamars]);
  return (
    <div className="bg-[#242529] w-full max-w-[748px] rounded-2xl px-[32px] py-10">
      <div className="font-bold text-2xl flex justify-between">
        <div>My Activities</div>
        <div>
          <div className="tabs tabs-boxed bg-inherit ">
            <a
              onClick={() => handleFilter(1)}
              className={`tab  text-xs font-medium ${
                activityPamars.acType == 1
                  ? "bg-[#353945] !rounded-3xl text-white"
                  : "text-[#777E90]"
              } `}
            >
              Withdraw
            </a>
            <a
              onClick={() => handleFilter(2)}
              className={`tab  text-xs font-medium ${
                activityPamars.acType == 2
                  ? "bg-[#353945] !rounded-3xl text-white"
                  : "text-[#777E90]"
              } `}
            >
              Deposit
            </a>
            {/* <a className={`tab  text-xs font-medium ${activityPamars.acType==2?'bg-[#353945] !rounded-3xl text-white':'text-[#777E90]'} `}>Buy</a>
            <a className={`tab  text-xs font-medium ${activityPamars.acType==2?'bg-[#353945] !rounded-3xl text-white':'text-[#777E90]'} `}>Claim</a> */}
            <a
              className={`tab  text-xs font-medium ${
                activityPamars.acType == 0
                  ? "bg-[#353945] !rounded-3xl text-white"
                  : "text-[#777E90]"
              } `}
              onClick={() => handleFilter(0)}
            >
              All type
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full mt-4 pb-5">
          <table className="table w-full ">
            {/* head */}
            <thead>
              <tr className="border-y border-[#353945]">
                <th className={styles.cth}>Type</th>
                <th className={styles.cth}>Amount</th>
                {/* <th className={styles.cth}>Transaction</th> */}
                <th className={styles.cth}>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {activityList?.data.activities.map((activity) => {
                return (
                  <tr>
                    <td className="bg-[#242529] border-y border-[#353945]">
                      <div className="flex items-center space-x-3">
                        {activity.bill_type == 1 ? (
                          <div className="w-[96px] h-[33px] bg-[#353945] text-xs font-bold rounded flex justify-center items-center">
                            <svg
                              width="12"
                              height="14"
                              viewBox="0 0 12 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.04565 5.45703L9.29565 5.45703C9.62717 5.45703 9.94512 5.58873 10.1795 5.82317C10.414 6.0576 10.5457 6.37556 10.5457 6.7071L10.5457 11.7074C10.5457 12.0389 10.414 12.3569 10.1795 12.5913C9.94512 12.8258 9.62717 12.9575 9.29565 12.9575L1.79565 12.9575C1.46413 12.9575 1.14619 12.8258 0.911771 12.5913C0.67735 12.3569 0.545654 12.0389 0.545654 11.7074L0.545654 6.95712C0.545654 6.26676 1.10534 5.45703 1.79565 5.45703L3.04565 5.45703"
                                stroke="white"
                                stroke-width="1.00003"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M8.04572 3.5415L5.54572 1.04136L3.04572 3.5415"
                                stroke="white"
                                stroke-width="1.00003"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M5.54578 9.125L5.54578 1.79144"
                                stroke="white"
                                stroke-width="1.00003"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <span className="ml-2">Withdraw</span>
                          </div>
                        ) : (
                          <div className="w-[96px] h-[33px] bg-[#353945] text-xs font-bold rounded flex justify-center items-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.54565 3.99854L9.79565 3.99854C10.1272 3.99854 10.4451 4.13024 10.6795 4.36467C10.914 4.5991 11.0457 4.91706 11.0457 5.2486L11.0457 10.2489C11.0457 10.5804 10.914 10.8984 10.6795 11.1328C10.4451 11.3672 10.1272 11.4989 9.79565 11.4989L2.29565 11.4989C1.96413 11.4989 1.64619 11.3672 1.41177 11.1328C1.17735 10.8984 1.04565 10.5804 1.04565 10.2489L1.04565 5.49862C1.04565 4.80827 1.60534 3.99853 2.29565 3.99853L3.54565 3.99853"
                                stroke="white"
                                stroke-width="1.00003"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M3.54584 6.08301L6.04584 8.58314L8.54584 6.08301"
                                stroke="white"
                                stroke-width="1.00003"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.04578 0.5L6.04577 7.83354"
                                stroke="white"
                                stroke-width="1.00003"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>

                            <span className="ml-2">Deposit</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="bg-[#242529] text-sm border-y border-[#353945]">
                      <div>
                        {activity.result_amount} {activity.symbol}
                      </div>
                    </td>
                    {/* <td className="bg-[#242529] text-sm text-[#777E90] border-y border-[#353945]">
                      <div>2</div>
                    </td> */}
                    <td className="bg-[#242529] text-[#777E90] text-sm border-y border-[#353945]">
                      <div>
                        {dayjs.unix(activity.ts).format("YYYY-MM-DD hh:mm")}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-10 mb-7">
            <PaginationWarp
            className=" float-right"
              total={activityList?.data.activities.length}
              pageSize={activityPamars.size}
              current={activityPamars.page}
              onChange={(page: number)=>changePagination(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyActivites;
