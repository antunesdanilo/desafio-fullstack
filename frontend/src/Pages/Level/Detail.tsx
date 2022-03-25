import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LevelInterface from '../../Interfaces/level.interface';

import LevelService from '../../Services/level.service';
const levelService = new LevelService();

const LevelDetail: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [level, setLevel] = React.useState<LevelInterface>()

  React.useEffect(() => {
    const levelId = parseInt(params.id || '')
    view(levelId);
  }, []);

  const view = (levelId: number) => {
    levelService.view(levelId).then((r: any) => {
      setLevel(r);
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row content-header'>
        <div className='col-sm-12'>
          <h2>
            <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i> {level?.level_name}
          </h2>
        </div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Desenvolvedores neste nível: </div>
        <div className='col-sm-6'>{level?.developers.length}</div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Criado em: </div>
        <div className='col-sm-6'>{level?.created_at.split('T')[0].split('-').reverse().join('/')} {level?.created_at.split('T')[1].split('.')[0]}</div>
      </div>
      
      <div className='row detail-field'>
        <div className='col-sm-6'>Atualizado em: </div>
        <div className='col-sm-6'>{level?.updated_at.split('T')[0].split('-').reverse().join('/')} {level?.updated_at.split('T')[1].split('.')[0]}</div>
      </div>

      <br />
      {level?.developers.length ? <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Idade</th>
            <th>Hobby</th>
          </tr>
        </thead>
        <tbody>
          {level.developers.map((d: any) => {
            return (
              <tr key={d.developer_id}>
                <td>{d.developer_name}</td>
                <td>
                  {d.gender === 'f' && 'Feminino'}
                  {d.gender === 'm' && 'Masculino'}
                </td>
                <td>{d.birthday.split('-').reverse().join('/')}</td>
                <td>{d.age}</td>
                <td>{d.hobby}</td>
              </tr>
            );
          })}
        </tbody>
      </table> : ''}
    </div>
  );
}
  
export default LevelDetail;
  