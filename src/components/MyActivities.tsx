import { CommonButton } from "./CommonButton";
const styles = {
  cth: "bg-[#242529] text-[#777E90] normal-case text-xs font-bold",
};
function MyActivites() {
  return (
    <div className="bg-[#242529] w-full max-w-[748px] rounded-2xl px-[32px] py-10">
      <div className="font-bold text-2xl flex justify-between">
        <div>My Activities</div>
        <div>
          <div className="tabs tabs-boxed bg-inherit ">
            <a className="tab text-[#777E90] text-xs font-medium">Withdraw</a>
            <a className="tab text-white text-xs font-medium bg-[#353945] !rounded-3xl ">
              Deposit
            </a>
            <a className="tab text-[#777E90] text-xs font-medium">Buy</a>
            <a className="tab text-[#777E90] text-xs font-medium">Claim</a>
            <a className="tab text-[#777E90] text-xs font-medium">All type</a>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full mt-4">
          <table className="table w-full ">
            {/* head */}
            <thead>
              <tr className="border-y border-[#353945]">
                <th className={styles.cth}>Type</th>
                <th className={styles.cth}>Amount</th>
                <th className={styles.cth}>Transaction</th>
                <th className={styles.cth}>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td className="bg-[#242529]">
                  <div className="flex items-center space-x-3">
                    <div className="w-[96px] h-[33px] bg-[#353945] text-xs font-bold rounded flex justify-center items-center">
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 0.5C2.68652 0.5 0 3.18652 0 6.5C0 9.81348 2.68652 12.5 6 12.5C9.31348 12.5 12 9.81348 12 6.5C12 3.18652 9.31348 0.5 6 0.5ZM6 11.75C3.10547 11.75 0.75 9.39453 0.75 6.5C0.75 3.60547 3.10547 1.25 6 1.25C8.89453 1.25 11.25 3.60547 11.25 6.5C11.25 9.39453 8.89453 11.75 6 11.75ZM7.86473 6.73072C8.00759 6.97243 8.07933 7.25441 8.07933 7.5774C8.07933 8.07324 7.93139 8.48633 7.63622 8.81666C7.34105 9.14771 6.91481 9.34255 6.35742 9.40114V10.25H5.64696V9.40552C4.71752 9.31032 4.14255 8.76978 3.92065 7.78541L5.01928 7.49902C5.12109 8.11791 5.45801 8.42701 6.03002 8.42701C6.29735 8.42701 6.49512 8.3611 6.62109 8.22852C6.74707 8.09593 6.81005 7.93627 6.81005 7.74877C6.81005 7.55469 6.74705 7.40745 6.62109 7.30784C6.49512 7.20753 6.21459 7.08078 5.78027 6.92698C5.3899 6.79152 5.08446 6.65818 4.86473 6.52491C4.64501 6.39308 4.4663 6.20778 4.32933 5.96973C4.19236 5.73095 4.12352 5.45262 4.12352 5.13622C4.12352 4.72093 4.24657 4.34666 4.49121 4.01415C4.73585 3.68237 5.12109 3.47947 5.64698 3.4055V2.75H6.35745V3.40552C7.15139 3.50075 7.66556 3.94972 7.89919 4.75318L6.92067 5.15455C6.72952 4.60377 6.43505 4.32837 6.03518 4.32837C5.83448 4.32837 5.67335 4.3899 5.55251 4.51295C5.43091 4.63599 5.37014 4.78541 5.37014 4.96046C5.37014 5.13917 5.42873 5.27614 5.54592 5.37209C5.66238 5.46732 5.91361 5.58523 6.2974 5.72659C6.71927 5.88041 7.05033 6.02614 7.28984 6.16311C7.53002 6.30006 7.7212 6.48976 7.86473 6.73072Z"
                          fill="white"
                        />
                      </svg>
                      <span className="ml-2">
                      Claim
                      </span>
                     
                    </div>
                  </div>
                </td>
                <td className="bg-[#242529] text-sm">
                  <div>
                   1
                  </div>
                </td>
                <td className="bg-[#242529] text-sm">
                  <div>
                   2
                  </div>
                </td>
                <td className="bg-[#242529] text-sm">
                  <div>
                   3    
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
export default MyActivites;
