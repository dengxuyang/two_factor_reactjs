import Pagination, { PaginationProps } from "rc-pagination";
import "../style/pagination.less";

function PaginationWarp({ ...props }: PaginationProps) {
  return <Pagination {...props} />;
}
export default PaginationWarp;
