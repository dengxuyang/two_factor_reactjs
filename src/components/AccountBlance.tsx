import { useState } from "react";
import { CommonButton } from "./CommonButton";
import CopyHelper from "./Copy";
import BlanceModal from "./BlanceModal";
const styles = {
  cth: "bg-[#242529] text-[#777E90] normal-case text-xs font-bold",
};
function AccountBlance() {
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  return (
    <div className="bg-[#242529] w-full max-w-[748px] rounded-2xl px-[32px] py-10">
      {/* The button to open modal */}
      {/* <label htmlFor="my-modal-3" className="btn">
        open modal
      </label> */}


      {/* Put this part before </body> tag */}
      <BlanceModal />
      <div className="font-bold text-2xl flex justify-between">
        <div>Account Balance</div>
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
            <CommonButton btnColor="bg-white" textColor="text-[#353945]">
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
      <div className=" h-[72px] bg-[#353945] flex justify-between mt-10 rounded-[4px] items-center p-5">
        <div>
          <i className="w-3 h-3 inline-block rounded mr-1 bg-[#2DAB50]" />
          <span className="text-sm">Net Worth</span>
        </div>
        <div>
          <div className="flex justify-center">
            <span className="text-2xl font-bold">$5,300.27</span>
            <span className="h-7 leading-7 px-2 inline-block rounded ml-1 bg-[#2DAB50]  text-center text-sm font-bold">
              APY: 1.25%
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex-1 h-[72px] bg-[#353945] flex justify-between rounded-[4px] items-center p-5 mr-3">
          <div>
            <i className="w-3 h-3 inline-block rounded mr-1 bg-[#EC6E72]" />
            <span className="text-sm">Available</span>
          </div>
          <div>
            <div className="flex justify-center">
              <span className="text-4">$10030.27</span>
            </div>
          </div>
        </div>
        <div className="flex-1 h-[72px] bg-[#353945] flex justify-between rounded-[4px] items-center p-5">
          <div>
            <i className="w-3 h-3 inline-block rounded mr-1 bg-[#3772FF]" />
            <span className="text-sm">Est. Earnings</span>
          </div>
          <div>
            <div className="flex justify-center">
              <span className="text-4">$300.27</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full mt-4">
          <table className="table w-full ">
            {/* head */}
            <thead>
              <tr className="border-y border-[#353945]">
                <th className={styles.cth}>Asset</th>
                <th className={styles.cth}>Available</th>
                <th className={styles.cth}>Est. Earnings</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td className="bg-[#242529]">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-8 h-8">
                        <img src="/assets/icon-usdt.svg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">USDT</div>
                      <div className="text-sm opacity-50">Tether USD</div>
                    </div>
                  </div>
                </td>
                <td className="bg-[#242529]">
                  <div>
                    <div className="text-sm">1,641.2028 USDT</div>
                    <div className="text-sm opacity-50">$1,641.20</div>
                  </div>
                </td>
                <td className="bg-[#242529]">
                  <div>
                    <div className="text-sm">1,641.20 USDT</div>
                    <div className="text-sm opacity-50">$1,641.20</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AccountBlance;
