import React from "react";

const Home: React.FC = () => {
  return (
    <div id='home' className="container-fluid">
      <div className="row content-header">
        <div className="col-sm-12">
          <h2>Home</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          Esta aplicação tem como objetivo permitir que o usuário faça o gerenciamento de uma lista de desenvolvedores, podendo cadastrar, atualizar, visualizar e remover um registro, além de associá-lo a um nível.
        </div>
      </div>
    </div>
  );
}

export default Home;
