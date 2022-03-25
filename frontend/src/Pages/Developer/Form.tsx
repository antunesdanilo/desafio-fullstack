import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import LevelInterface from '../../Interfaces/level.interface';

import LevelService from '../../Services/level.service';
import DeveloperService from '../../Services/developer.service';

const levelService = new LevelService();
const developerService = new DeveloperService();

const DeveloperForm: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, setValue } = useForm();

  const [editId, setEditId] = React.useState<number | null>();

  const [levels, setLevels] = React.useState<LevelInterface[]>([])

  React.useEffect(() => {
    listLevels();
    const developerId = parseInt(params.id || '')
    if (developerId > 0) {
      setEditId(developerId);
      return view(developerId);
    }
  }, []);

  const view = (developerId: number) => {
    developerService.view(developerId).then((r: any) => {
      Object.keys(r).forEach(k => {
        setValue(k, r[k]);
      });
    });
  };

  const listLevels = () => {
    levelService.list().then((r: any) => {
      setLevels(r);
    });
  }

  const save = (form: Object) => {
    if (editId) {
      return developerService.update(editId, form);
    }
    return developerService.store(form).then(() => {
      navigate('/developer');
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row content-header'>
        <div className='col-sm-12'>
          <h2>
            <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i> {editId ? 'Atualizar' : 'Novo'} Desenvolvedor
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(save)}>
        <div className='row form-field'>
          <div className='col-sm-3'>
            Nome
          </div>
          <div className='col-sm-9'>
            <input {...register("developer_name", {required: true})} className='form-control' />
          </div>
        </div>

        <div className='row form-field'>
          <div className='col-sm-3'>
            Nível
          </div>
          <div className='col-sm-9'>
            <select {...register("level_id", {required: true})} className='form-control'>
              <option></option>
              {levels.map(l => {
                return (
                  <option key={l.level_id} value={l.level_id}>{l.level_name}</option>
                )
              })}
            </select>
          </div>
        </div>

        {<div className='row form-field'>
          <div className='col-sm-3'>
            Sexo
          </div>
          <div className='col-sm-2'>
            <div className='form-check'>
              <input {...register("gender", {required: true})} className="form-check-input" value="f" name='gender' id='gender-f' type='radio' />
              <label className="form-check-label" htmlFor='gender-f'>Feminino</label>
            </div>
          </div>
          <div className='col-sm-2'>
            <div className='form-check'>
              <input {...register("gender", {required: true})} className="form-check-input" value="m" name='gender' id='gender-m' type='radio' />
              <label className="form-check-label" htmlFor='gender-m'>Masculino</label>
            </div>
          </div>
        </div>}

        <div className='row form-field'>
          <div className='col-sm-3'>
            Data de Nascimento
          </div>
          <div className='col-sm-9'>
            <input type='date' {...register("birthday", {required: true})} className='form-control' max={new Date().toLocaleDateString().split('/').reverse().join('-')} />
          </div>
        </div>

        <div className='row form-field'>
          <div className='col-sm-3'>
            Hobby
          </div>
          <div className='col-sm-9'>
            <textarea {...register("hobby", {required: true})} className='form-control' />
          </div>
        </div>

        <div className='row form-submit'>
          <div className='col-sm-1'>
            <button type='submit' className="btn btn-primary">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeveloperForm;
