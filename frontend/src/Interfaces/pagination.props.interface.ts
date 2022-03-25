import PaginationInterface from "./pagination.interface";

export default interface PaginationPropsInterface {
  pagination: PaginationInterface;
  onPageChanged: Function;
}