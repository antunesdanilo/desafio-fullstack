import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import DeveloperInterface from '../../Interfaces/developer.interface';
import SortedInterface from '../../Interfaces/sorted.interface';
import PaginationInterface from '../../Interfaces/pagination.interface';

import Pagination from '../../Components/Pagination';

import DeveloperService from '../../Services/developer.service';
const developerService = new DeveloperService();

const itemsPerPage = 5;

const DeveloperList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState<string | null>();
  const [developers, setDevelopers] = React.useState<DeveloperInterface[]>([]);
  const [pagination, setPagination] = React.useState<PaginationInterface>({
    page: 1,
    itemsPerPage,
    totalPages: 0,
    totalItems: 0,
  });
  const [sorted, setSorted] = React.useState<SortedInterface>();

  React.useEffect(() => {
    setKeyword(searchParams.get('k') || null);
    list();
  }, [searchParams]);

  const list = () => {
    setKeyword(k => {
      developerService.list(k).then((r: any) => {
        setDevelopers(r);
        setPagination(pag => {
          return {
            ...pag,
            totalPages: Math.ceil(r.length / itemsPerPage),
            totalItems: r.length,
          }
        });
      });
      return k;
    });
  };

  const remove = (developerId: number) => {
    developerService.destroy(developerId).then(() => {
      list()
    });
  };

  const sort = (e: React.SyntheticEvent<EventTarget>,field: keyof DeveloperInterface) => {
    e.preventDefault();
    let isSorted = sorted?.field === field;
    let newOrder: 'asc' | 'desc';

    if (!isSorted || sorted?.order !== 'asc') {
      setDevelopers(d => {
        d.sort((a: DeveloperInterface, b: DeveloperInterface) => {
          return a[field] > b[field] ? 1 : -1;
        });
        return d;
      })
      newOrder = 'asc';
    } else {
      setDevelopers(d => {
        d.sort((a: DeveloperInterface, b: DeveloperInterface) => {
          return a[field] < b[field] ? 1 : -1;
        });
        return d;
      })
      newOrder = 'desc';
    }

    setSorted({field, order: newOrder});

    onPageChanged(1);
  };

  const findOrder = (field: keyof DeveloperInterface) => {
    const isSorted = sorted?.field === field
    if (isSorted) {
      return sorted.order;
    }
    return null;
  };

  const onPageChanged = (page: number) => {
    setPagination((pag: PaginationInterface) => {
      return {
        ...pag,
        page
      }
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row content-header'>
        <div className='col-sm-6 a'>
          <h2>Desenvolvedores</h2>
        </div>
        <div className='col-sm-1'>
          <Link to="new">
            <button type="button" className='btn btn-outline-secondary add-button'>Adicionar</button>
          </Link>
        </div>
      </div>

      {keyword && <div className='row'>
        <div className='col-sm-2'>
          <div id='keyword-alert' className='alert alert-dark'>
            {keyword}
            <Link to="/developer">
              <button className='btn-close' />
            </Link>
          </div>
        </div>
      </div>}

      <div className='row'>
        <div className='col-sm-12'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>
                  <a href=";" onClick={(e) => sort(e, 'developer_name')}>Nome</a>
                  {findOrder('developer_name') === 'asc' && <i className="bi bi-caret-up" />}
                  {findOrder('developer_name') === 'desc' && <i className="bi bi-caret-down" />}
                </th>
                <th>
                  <a href=";" onClick={(e) => sort(e, 'level_name')}>Nível</a>
                  {findOrder('level_name') === 'asc' && <i className="bi bi-caret-up" />}
                  {findOrder('level_name') === 'desc' && <i className="bi bi-caret-down" />}
                </th>
                <th>
                  <a href=";" onClick={(e) => sort(e, 'birthday')}>Nascimento</a>
                  {findOrder('birthday') === 'asc' && <i className="bi bi-caret-up" />}
                  {findOrder('birthday') === 'desc' && <i className="bi bi-caret-down" />}
                </th>
                <th colSpan={2}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {developers.slice((pagination.page - 1) * itemsPerPage, pagination.page * itemsPerPage).map(d => {
                return (
                  <tr key={d.developer_id}>
                    <td width="40%">
                      <Link to={{pathname: `/developer/${d.developer_id}`}}>
                        {d.developer_name}
                      </Link>
                    </td>
                    <td width="25%">{d.level_name}</td>
                    <td width="25%">{d.birthday.split('-').reverse().join('/')}</td>
                    <td width="5%">
                      <Link to={{pathname: `/developer/update/${d.developer_id}`}}>
                        <i className="bi bi-pencil" title="Editar"></i>
                      </Link>
                    </td>
                    <td width="5%">
                      <i onClick={() => remove(d.developer_id)} className="bi bi-trash" title="Remover"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!developers.length && <span>Ainda não há nenhum desenvolvedor cadastrado.<br /><br /></span>}
        </div>
      </div>

      {pagination.totalItems > 0 && <Pagination pagination={pagination} onPageChanged={onPageChanged} />}
    </div>
  );
};

export default DeveloperList;
