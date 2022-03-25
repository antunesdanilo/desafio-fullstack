import React from "react";

import PaginationPropsInterface from "../Interfaces/pagination.props.interface";

import classNames from 'classnames';

const Pagination: React.FC<PaginationPropsInterface> = ({pagination, onPageChanged}) => {
  const changePage = (event: React.SyntheticEvent<EventTarget>, page: number) => {
    event.preventDefault();
    onPageChanged(page);
  }

  return (
    <nav aria-label="Navegação de página exemplo">
      <ul className="pagination">
        <li className={classNames({'page-item': true, 'disabled': pagination.page <= 1})}>
          <a className="page-link" href=";" onClick={(e) => changePage(e, 1)} aria-label="Anterior">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pagination.page > 1 && <li className="page-item"><a className="page-link" href=";" onClick={(e) => changePage(e, pagination.page - 1)}>{pagination.page - 1}</a></li>}
        <li className="page-item active"><a className="page-link" href=";">{pagination.page}</a></li>
        {pagination.page < pagination.totalPages && <li className="page-item"><a className="page-link" href=";" onClick={(e) => {changePage(e, pagination.page + 1)}}>{pagination.page + 1}</a></li>}
        <li className={classNames({'page-item': true, 'disabled': pagination.page >= pagination.totalPages})}>
          <a className="page-link" href=";" onClick={(e) => changePage(e, pagination.totalPages)} aria-label="Próximo">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
      <div className="float-left">
        Mostrando {(pagination.page - 1) * pagination.itemsPerPage + 1} a {pagination.page < pagination.totalPages ? pagination.page * pagination.itemsPerPage : pagination.totalItems} de um total de {pagination.totalItems} itens
      </div>
    </nav>
  );
};

export default Pagination;
