import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { CommonButton } from "./CommonButton";
import CopyHelper from "./Copy";
import { toast } from "react-toastify";
import { tokenApi } from "../api/authApi";
import { DefRes, WithdrawSetting } from "../api/types";

import useStore from "../store";
import { useNavigate } from "react-router-dom";

function BlanceModal({
  setmenuActive,
}: {
  setmenuActive?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const store = useStore();
  const navigate = useNavigate();
  const [qrcodeUrl, setqrCodeUrl] = useState("");
  const useSetting = useMemo(() => store.userSetting?.data, [store]);
  const useAssets = useMemo(() => store.userAssets?.data, [store]);
  const [netWork, setNetWork] = useState(useSetting?.address_list[0]);
  const [userBlance, setUserBlance] = useState(useAssets?.assets[0]);
  const [receiving, setReceiving] = useState<string>();
  const [AmountWithdraw, setAmountWithdraw] = useState<string>();
  const [totp, setTotp] = useState<string>();
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawSetting, setWithdrawSetting] = useState<WithdrawSetting>();
  const [withdrawNetWork, setWithdrawNetWork] = useState<{
    fee: string;
    chain: string;
    type: string;
    symbol: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const getWithdrawSetting = async () => {
    try {
      const { data: account } = await tokenApi.post<WithdrawSetting>(
        "/api/withdrawSetting",
        {}
      );
      if (account.code === 0) {
        setWithdrawSetting(account);
      } else {
        toast.error(account.msg, {
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
  const handleWithdraw = async () => {
    try {
      setLoading(true);
      const { data: account } = await tokenApi.post<DefRes>(
        "/api/reqWithdraw",
        {
          chain: "ETH",
          symbol: "USDT",
          address: receiving,
          amount: AmountWithdraw, //数量
          saveAddress: checked, //是否保存地址
          totp: "", //如果开启了2fa
        }
      );
      if (account.code === 0) {
        setLoading(false);
        setWithdrawSuccess(true);
      } else {
        toast.error(account.msg, {
          position: "top-right",
        });
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
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
    netWork?.address && QRCode.toDataURL(netWork?.address).then(setqrCodeUrl);
  }, [netWork]);
  useEffect(() => {
    if (withdrawSetting) {
      setWithdrawNetWork(withdrawSetting?.data.fee_list[0]);
    }
  }, [withdrawSetting]);

  useEffect(() => {
    getWithdrawSetting();
  }, []);

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-[#242529] max-w-md relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold">Deposit USDT</h3>
          <div className="flex flex-col items-center">
            <div className="w-full h-11 bg-[#353945] flex justify-between rounded-[4px] items-center p-5 mr-3 mt-3">
              <div>
                <i className="w-3 h-3 inline-block rounded mr-1 bg-[#EC6E72]" />
                <span className="text-sm text-[#F4F5F6]">Network</span>
              </div>
              <div>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0}>
                    <div className="flex justify-center cursor-pointer">
                      <span className="text-4 text-[#FCFCFD]">
                        {netWork?.chain}
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.79289 9.79289C8.18342 9.40237 8.81658 9.40237 9.20711 9.79289L12 12.5858L14.7929 9.79289C15.1834 9.40237 15.8166 9.40237 16.2071 9.79289C16.5976 10.1834 16.5976 10.8166 16.2071 11.2071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.79289 11.2071C7.40237 10.8166 7.40237 10.1834 7.79289 9.79289Z"
                          fill="#777E91"
                        />
                      </svg>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                  >
                    {useSetting?.address_list.map((item) => (
                      <li onClick={() => setNetWork(item)}>
                        <a>{item.chain}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <img className="my-3" src="/assets/icon-money.svg" alt="" />
            <div className="w-full h-11 bg-[#353945] flex justify-between rounded-[4px] items-center p-5 mr-3">
              <div>
                <i className="w-3 h-3 inline-block rounded mr-1 bg-[#EC6E72]" />
                <span className="text-sm">Available</span>
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                  <div className="flex justify-center cursor-pointer">
                    <span className="text-4 text-[#FCFCFD]">
                      {userBlance?.available} {userBlance?.symbol}
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.79289 9.79289C8.18342 9.40237 8.81658 9.40237 9.20711 9.79289L12 12.5858L14.7929 9.79289C15.1834 9.40237 15.8166 9.40237 16.2071 9.79289C16.5976 10.1834 16.5976 10.8166 16.2071 11.2071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.79289 11.2071C7.40237 10.8166 7.40237 10.1834 7.79289 9.79289Z"
                        fill="#777E91"
                      />
                    </svg>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 text-black rounded-box w-52"
                >
                  {useAssets?.assets.map((item) => (
                    <li onClick={() => setUserBlance(item)}>
                      <a>
                        {item.available} {item.symbol}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <span className="mt-8 text-base text-[#FCFCFD]">Your Address</span>
            <div className="text-center mt-2 text-xs text-[#777E90]">
              Only send USDT to this address. Sending any other asset to this
              address may result in the loss of your deposit!
            </div>
            <div className="h-11 bg-[#353945] mt-3 flex justify-between rounded-[4px] items-center p-5  mr-3">
              <CopyHelper toCopy={netWork?.address || ""}>
                <span className="font-bold text-sm">{netWork?.address}</span>
              </CopyHelper>
            </div>
            <div className="w-40 h-40 border-2 border-dashed border-[#EC6E72] rounded-xl flex justify-center items-center mt-6 mb-6">
              <div className=" w-32 h-32 border-2  bg-white rounded-xl flex justify-center items-center p-3">
                <img src={qrcodeUrl} alt="" />
              </div>
            </div>
            <div className="text-center mt-2 text-xs text-[#777E90]">
              USDT deposits are available after 10 network confirmations
            </div>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-[#242529] max-w-md relative">
          <label
            htmlFor="my-modal-2"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setWithdrawSuccess(false)}
          >
            ✕
          </label>
          {!withdrawSuccess ? (
            <div>
              <h3 className="text-2xl font-bold">Withdraw USDT</h3>
              <div className="">
                <div className="w-full h-11 bg-[#353945] flex justify-between rounded-[4px] items-center p-5 mr-3 mt-3">
                  <div>
                    <i className="w-3 h-3 inline-block rounded mr-1 bg-[#EC6E72]" />
                    <span className="text-sm text-[#F4F5F6]">Network</span>
                  </div>
                  <div>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0}>
                        <div className="flex justify-center cursor-pointer">
                          <span className="text-4 text-[#FCFCFD]">
                            {withdrawNetWork?.chain}
                          </span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.79289 9.79289C8.18342 9.40237 8.81658 9.40237 9.20711 9.79289L12 12.5858L14.7929 9.79289C15.1834 9.40237 15.8166 9.40237 16.2071 9.79289C16.5976 10.1834 16.5976 10.8166 16.2071 11.2071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.79289 11.2071C7.40237 10.8166 7.40237 10.1834 7.79289 9.79289Z"
                              fill="#777E91"
                            />
                          </svg>
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                      >
                        {withdrawSetting?.data.fee_list.map((item) => (
                          <li onClick={() => setWithdrawNetWork(item)}>
                            <a>{item.chain}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-3 mb-2">
                  <label className="block text-sm font-bold text-white mb-2">
                    Receiving Address
                  </label>
                  <input
                    type="text"
                    placeholder="0x"
                    className="block w-full bg-inherit border-2 border-[#353945] focus:border-[#777E91]  rounded-xl appearance-none focus:outline-none py-2 px-4"
                    value={receiving}
                    onChange={(e) => {
                      setReceiving(e.target.value);
                    }}
                  />
                </div>
                <div className=" mt-2 text-xs text-[#777E90]">
                  Please confirm that the address you have entered is correct,
                  and supports TRC-20 transactions.
                </div>
                <div className="mt-3 flex">
                  <label className="swap swap-flip">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />

                    <div className="swap-on">
                      <img
                        className=" cursor-pointer"
                        src="/assets/icon-checkedBox.svg"
                        alt=""
                      />
                    </div>
                    <div className="swap-off">
                      {" "}
                      <img
                        className=" cursor-pointer"
                        src="/assets/icon-checkBox.svg"
                        alt=""
                      />
                    </div>
                  </label>

                  <span className="ml-3 text-[#FCFCFD]">
                    Save address for next time
                  </span>
                </div>
                <div className="w-full h-11 bg-[#353945] flex justify-between rounded-[4px] items-center p-5 mr-3 mt-3">
                  <div>
                    <i className="w-3 h-3 inline-block rounded mr-1 bg-[#EC6E72]" />
                    <span className="text-sm text-[#F4F5F6]">Available</span>
                  </div>
                  <div>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0}>
                        <div className="flex justify-center cursor-pointer">
                          <span className="text-4 text-[#FCFCFD]">
                            {userBlance?.available} {userBlance?.symbol}
                          </span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M7.79289 9.79289C8.18342 9.40237 8.81658 9.40237 9.20711 9.79289L12 12.5858L14.7929 9.79289C15.1834 9.40237 15.8166 9.40237 16.2071 9.79289C16.5976 10.1834 16.5976 10.8166 16.2071 11.2071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.79289 11.2071C7.40237 10.8166 7.40237 10.1834 7.79289 9.79289Z"
                              fill="#777E91"
                            />
                          </svg>
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 text-black rounded-box w-52"
                      >
                        {useAssets?.assets.map((item) => (
                          <li onClick={() => setUserBlance(item)}>
                            <a>
                              {item.available} {item.symbol}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 mb-2">
                  <label className="block text-sm font-bold text-white mb-2">
                    Amount to withdraw
                  </label>
                  <input
                    type="text"
                    placeholder="  "
                    className="block w-full bg-inherit border-2 border-[#353945] focus:border-[#777E91]  rounded-xl appearance-none focus:outline-none py-2 px-4"
                    value={AmountWithdraw}
                    onChange={(e) => setAmountWithdraw(e.target.value)}
                  />
                </div>
                <div className=" mt-2 text-xs text-[#777E90]">
                  $1,000,000.00 daily withdrawal limit remaining.
                </div>
                {useSetting?.totp_enable && (
                  <div className="mt-5 pt-3 mb-2">
                    <label className="block text-sm font-bold text-white mb-2">
                      Google 6-digit code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter"
                      className="block w-full bg-inherit border-2 border-[#353945] focus:border-[#777E91]  rounded-xl appearance-none focus:outline-none py-2 px-4"
                      value={totp}
                      onChange={(e) => setTotp(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex justify-between mt-8 mb-4 text-sm">
                  <span>Transaction Fee</span>
                  <span className="text-[#777E90] text-sm">
                    {withdrawNetWork?.fee} USDT
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total receiving</span>
                  <span className="text-[#777E90] text-sm">
                    {withdrawNetWork &&
                    AmountWithdraw &&
                    Number(AmountWithdraw) - Number(withdrawNetWork.fee) < 0
                      ? 0
                      : (withdrawNetWork &&
                          AmountWithdraw &&
                          (
                            Number(AmountWithdraw) - Number(withdrawNetWork.fee)
                          )?.toFixed(2)) ||
                        0}{" "}
                    USDT
                  </span>
                </div>
                <div className="my-10">
                  <CommonButton
                    btnHight="h-[46px]"
                    onClick={() => handleWithdraw()}
                    disabled={Number(AmountWithdraw) <= 0 || loading}
                  >
                    {loading ? "Withdraw..." : "Withdraw"}
                  </CommonButton>
                </div>

                <div className="text-center mt-2 text-xs text-[#777E90]">
                  Withdrawal requests will be processed within 1-8 hours
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center text-[40px] font-bold">Yay! 🎉</div>
              <div className="text-center my-8">
                You have successfully requested to withdraw <br />
                <span className="text-[#EC6E72]">
                  {" "}
                  {AmountWithdraw} USDT
                </span>{" "}
                from CAPOLOT.{" "}
              </div>
              <div className="text-center my-8 text-xs text-[#777E91]">
                Withdrawal requests will be processed within 1-8 hours. If you
                have any questions, please contact Discord .
              </div>

              <CommonButton
                btnHight="h-[46px]"
                constomStyle="relative"
                onClick={() =>
                  (setmenuActive && setmenuActive(2)) ||
                  navigate("/profile", { state: { menuid: 2} })
                }
              >
                <label
                  htmlFor="my-modal-2"
                  className=" absolute w-full h-full top-0 left-0 leading-8 "
                ></label>
                My Activities
              </CommonButton>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default BlanceModal;
