import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import LevelInterface from '../../Interfaces/level.interface';
import SortedInterface from '../../Interfaces/sorted.interface';
import PaginationInterface from '../../Interfaces/pagination.interface';

import Pagination from '../../Components/Pagination';

import LevelService from '../../Services/level.service';
const levelService = new LevelService();

const itemsPerPage = 5;

const LevelList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState<string | null>();
  const [levels, setLevels] = React.useState<LevelInterface[]>([]);
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
      levelService.list(k).then((r: any) => {
        setLevels(r);
        setPagination(pag => {
          return {
            ...pag,
            totalPages: Math.ceil(r.length / itemsPerPage),
            totalItems: r.length,
          }
        });
      });
      return k;
    })
  };

  const remove = (levelId: number) => {
    levelService.destroy(levelId).then(() => {
      list()
    });
  };

  const sort = (e: React.SyntheticEvent<EventTarget>,field: keyof LevelInterface) => {
    e.preventDefault();
    let isSorted = sorted?.field === field;
    let newOrder: 'asc' | 'desc';

    if (!isSorted || sorted?.order !== 'asc') {
      setLevels(l => {
        l.sort((a: LevelInterface, b: LevelInterface) => {
          return a[field] > b[field] ? 1 : -1;
        });
        return l;
      })
      newOrder = 'asc';
    } else {
      setLevels(l => {
        l.sort((a: LevelInterface, b: LevelInterface) => {
          return a[field] < b[field] ? 1 : -1;
        });
        return l;
      })
      newOrder = 'desc';
    }

    setSorted({field, order: newOrder});

    onPageChanged(1);
  };

  const findOrder = (field: keyof LevelInterface) => {
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
        <div className='col-sm-6'>
          <h2>Níveis</h2>
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
            <Link to="/level">
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
                  <a href=";" onClick={(e) => sort(e, 'level_name')}>Nível</a>
                  {findOrder('level_name') === 'asc' && <i className="bi bi-caret-up" />}
                  {findOrder('level_name') === 'desc' && <i className="bi bi-caret-down" />}
                </th>
                <th>
                  <a href=";" onClick={(e) => sort(e, 'developers_count')}>Desenvolvedores associados</a>
                  {findOrder('developers_count') === 'asc' && <i className="bi bi-caret-up" />}
                  {findOrder('developers_count') === 'desc' && <i className="bi bi-caret-down" />}
                </th>
                <th colSpan={2}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {levels.slice((pagination.page - 1) * itemsPerPage, pagination.page * itemsPerPage).map(l => {
                return (
                  <tr key={l.level_id}>
                    <td width="45%">
                      <Link to={{pathname: `/level/${l.level_id}`}}>
                        {l.level_name}
                      </Link>
                    </td>
                    <td width="45%">{l.developers_count}</td>
                    <td width="5%">
                      <Link to={{pathname: `/level/update/${l.level_id}`}}>
                        <i className="bi bi-pencil" title="Editar"></i>
                      </Link>
                    </td>
                    <td width="5%">
                      <i onClick={() => remove(l.level_id)} className="bi bi-trash" title="Remover"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!levels.length && <span>Ainda não há nenhum nível cadastrado.<br /><br /></span>}
        </div>
      </div>

      {pagination.totalItems > 0 && <Pagination pagination={pagination} onPageChanged={onPageChanged} />}
    </div>
  );
};
  
export default LevelList;
  