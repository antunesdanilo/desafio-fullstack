import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DeveloperInterface from '../../Interfaces/developer.interface';

import DeveloperService from '../../Services/developer.service';
const developerService = new DeveloperService();

const DeveloperDetail: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [developer, setDeveloper] = React.useState<DeveloperInterface>()

  React.useEffect(() => {
    const developerId = parseInt(params.id || '')
    view(developerId);
  }, []);

  const view = (developerId: number) => {
    developerService.view(developerId).then((r: any) => {
      setDeveloper(r);
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row content-header'>
        <div className='col-sm-12'>
          <h2>
            <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i> {developer?.developer_name}
          </h2>
        </div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Nível: </div>
        <div className='col-sm-6'>{developer?.level.level_name}</div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Sexo: </div>
        <div className='col-sm-6'>
          {developer?.gender === 'f' && 'Feminino'}
          {developer?.gender === 'm' && 'Masculino'}
        </div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Data de Nascimento: </div>
        <div className='col-sm-6'>{developer?.birthday.split('-').reverse().join('/')}</div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Idade: </div>
        <div className='col-sm-6'>{developer?.age}</div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Hobby: </div>
        <div className='col-sm-6'>{developer?.hobby}</div>
      </div>

      <div className='row detail-field'>
        <div className='col-sm-6'>Cadastrado em: </div>
        <div className='col-sm-6'>{developer?.created_at.split('T')[0].split('-').reverse().join('/')} {developer?.created_at.split('T')[1].split('.')[0]}</div>
      </div>
      
      <div className='row detail-field'>
        <div className='col-sm-6'>Atualizado em: </div>
        <div className='col-sm-6'>{developer?.updated_at.split('T')[0].split('-').reverse().join('/')} {developer?.updated_at.split('T')[1].split('.')[0]}</div>
      </div>
    </div>
  );
}
  
export default DeveloperDetail;
  