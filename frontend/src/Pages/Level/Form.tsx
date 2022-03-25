import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

import LevelService from '../../Services/level.service';
const levelService = new LevelService();

const LevelForm: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, setValue } = useForm();

  const [editId, setEditId] = React.useState<number | null>();

  React.useEffect(() => {
    const levelId = parseInt(params.id || '')
    if (levelId > 0) {
      setEditId(levelId);
      return view(levelId);
    }
  }, []);

  const view = (levelId: number) => {
    levelService.view(levelId).then((r: any) => {
      Object.keys(r).forEach(k => {
        setValue(k, r[k]);
      });
    });
  };

  const save = (form: Object) => {
    if (editId) {
      return levelService.update(editId, form);
    }
    return levelService.store(form).then(() => {
      navigate('/level');
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row content-header'>
        <div className='col-sm-12'>
          <h2>
            <i className="bi bi-arrow-left" onClick={() => navigate(-1)}></i> {editId ? 'Atualizar' : 'Novo'} Nível
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(save)}>
        <div className='row form-field'>
          <div className='col-sm-3'>
            Nível
          </div>
          <div className='col-sm-9'>
            <input {...register("level_name", {required: true})} className='form-control' />
          </div>
        </div>

        <div className='row form-submit'>
          <div className='col-sm-12'>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LevelForm;
