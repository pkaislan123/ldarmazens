import React, { useEffect, useState } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import api from '../../services/api';


import './styles.scss';

const InfoPatio = () => {

  const [tipoMovimentacao, setTipoMovimentacao] = useState(-1);
  const [placa, setPlaca] = useState('');
  const [numVeiculosFrente, setNumVeiculosFrente] = useState(0);
  const [proximaPlaca, setProximaPlaca] = useState('');
  const [veiculoAnterior, setVeiculoAnterior] = useState('');
  const [tempoEspera, setTempoEspera] = useState('');
  useEffect(() => {



  }, []);


  async function pesquisar() {
    try {
      var response = await api.get('/v1/protected/infopatio/posicaoFila/' + placa.toLocaleUpperCase());

      console.log("id " + response.data.id)

      var id = response.data.id;

      if (id != null) {
        if (parseInt(id, 10) > 0) {
          console.log("Placa esta na fila");

          var tipo_movimentacao = response.data.tipo_movimentacao

          setTipoMovimentacao(tipo_movimentacao)
          try {
            //placa anterior
            var response2 = await api.get('/v1/protected/infopatio/veiculoAnterior/' + id + "/" + tipo_movimentacao);
            console.log("anterior veiculo: " + response2.data.placa)
            setVeiculoAnterior(response2.data.placa);
          } catch (_err) {
            setVeiculoAnterior("-----");

          }


          try {
            //proxima Placa
            var response3 = await api.get('/v1/protected/infopatio/proximoVeiculo/' + id + "/" + tipo_movimentacao);
            console.log("proximo veiculo: " + response3.data.placa)
            setProximaPlaca(response3.data.placa);
          } catch (_err) {
            setProximaPlaca("-----");

          }

          try {
            //numVeiculosFrente
           var response4 = await api.get('/v1/protected/infopatio/numVeiculosFrente/' + id + "/" + tipo_movimentacao);
            console.log("numVeiculosFrente: " + response4.data)
            setNumVeiculosFrente(response4.data);
          } catch (_err) {
            setNumVeiculosFrente(0);

          }


          try {
            //tempoEspera
           var response5 = await api.get('/v1/protected/infopatio/tempo_espera/' + id + "/" + tipo_movimentacao);
            console.log("tempoespera: " + response5.data)
            setTempoEspera(response5.data);
          } catch (_err) {

          }

        } else {
          console.log("Placa não esta na fila");
          setProximaPlaca("Placa não esta na fila");
        }
      } else {
        console.log("Placa não esta na fila");
        setProximaPlaca("Placa não esta na fila");

      }
    } catch (_err) {
      console.log("Placa não esta na fila");
      setProximaPlaca("Placa não esta na fila");

    }


  }




  return (
    <div >
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",


      }} >

        <Navegador servicos={"underline"} />

        <div style={{ height: 5, backgroundColor: '#808080' }}>
        </div>
      </div>
      <div>
        <Grid
          container
          direction="row"
          item xs={12} sm={12} md={12} lg={12} xl={12}
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{ paddingTop: 30, paddingBottom: 30 }}
        >

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} container direction='row'
              justifyContent="center"
              alignItems="center"
            >
              <span style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 28 }} >Informações do Pátio</span>
              <br></br>
              <br></br>
            </Grid>

            <span style={{ padding: 30, paddingLeft: '5%', fontSize: 18 }} >Serviços Disponíveis no Pátio:</span>
            <br></br>
            <br></br>

          </Grid>

          <Grid
            container
            direction="row"
            item xs={12} sm={12} md={12} lg={12} xl={12}>

            <Grid item xs={12} sm={12} md={12} lg={3} xl={3} >
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} container direction='row'
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}
                direction='row'
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: 'center' }}
              >
                <img alt="img1" height={100} width={100}

                  src={"https://cdn-icons-png.flaticon.com/512/489/489869.png"}
                />
                <figcaption> Restaurante</figcaption>

              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}
                direction='row'
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: 'center' }}
              >
                <img alt="img2" height={100} width={100}

                  src={"https://dbdzm869oupei.cloudfront.net/img/sticker/preview/1801.png"}
                />
                <figcaption> Vestiário</figcaption>
              </Grid>


              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}
                direction='row'
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: 'center' }} >
                <img alt="img3" height={100} width={100}

                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0-VvIwTyUR_BYsUzcQd0fbAbBmoxl9MA0Sw&usqp=CAU"}
                />
                <figcaption>Wifi Livre</figcaption>

              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}
                direction='row'
                justifyContent="center"
                alignItems="center"
                style={{ textAlign: 'center' }} >
                <img alt="img3" height={100} width={100}

                  src={"https://cdn-icons-png.flaticon.com/512/75/75905.png"}
                />
                <figcaption>Estacionamento</figcaption>

              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3} >
            </Grid>
          </Grid>

        </Grid>
        <div style={{ paddingInline: 25 }}>
          <div>
            <Grid
              container
              direction="row"
              item xs={12} sm={12} md={12} lg={12} xl={12}
              component={Paper} elevation={6} square

              style={{ marginTop: "0.5%", marginBottom: '3%' }}
            >

              <Grid
                container
                item xs={12} sm={12} md={12} lg={12} xl={12}
                direction="row" style={{ marginTop: "3%", marginBottom: '3%' }}>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}
                  container
                  direction="row"

                >

                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4} >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: 10 }}>
                      <img alt="img1" height={300} width={300}

                        src={"https://cdn.autopapo.com.br/box/uploads/2021/03/16203820/patio-com-caminhoes-estacionados-732x488.jpg"}
                      />
                    </Grid>


                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={4} xl={4}   >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}   >
                      <br></br>
                      <br></br>
                      <br></br>
                      <span style={{ fontWeight: 'bold', fontSize: 22, }} > Busca de Posição em Fila</span>

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                      container
                      direction="row"

                      justifyContent="center"
                      alignItems="center"
                    >
                      <TextField
                        id="placa"
                        label="Placa"
                        variant="standard"
                        margin="dense"
                        fullWidth
                        placeholder='Digite sua placa'
                        value={placa}
                        onChange={(event) => { setPlaca(event.target.value) }}
                      />


                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={pesquisar}
                      > Pesquisar
                      </Button>

                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}   >
                        <span style={{ fontSize: 22 }} >{ tipoMovimentacao === -1 ? "Placa Não Encontrada" : tipoMovimentacao === 0 ?  "Placa Encontrada Na Fila de Desembarque" : "Placa Encontrada Na Fila de Embarque"  } </span>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}   >

                        <span style={{ fontSize: 22 }} > Placa Anterior: </span>
                        <span style={{ fontWeight: 'bold', fontSize: 22, }} >{veiculoAnterior}</span>
                        <br></br>

                        <span style={{ fontSize: 22 }} > Próxima Placa: </span>
                        <span style={{ fontWeight: 'bold', fontSize: 22, }} >{proximaPlaca}</span>
                        <br></br>

                        <span style={{ fontSize: 22 }} > Número de Veiculos na Frente: </span>
                        <span style={{ fontWeight: 'bold', fontSize: 22, }} >{numVeiculosFrente}</span>

                        <br></br>

                        <span style={{ fontSize: 22 }} > Tempo Médio de Espera(Média de 5 caminhões): </span>
                        <span style={{ fontWeight: 'bold', fontSize: 22, }} >{tempoEspera.tempo_espera_por_unidade}</span>

                        <br></br>
                        <span style={{ fontSize: 22 }} > Hora de Encerramento: </span>
                        <span style={{ fontWeight: 'bold', fontSize: 22, }} >{tempoEspera.hora_encerramento}</span>
                        <br></br>
                        <span style={{ fontSize: 22 }} > Previsão de Conclusão de Movimentação: </span>
                        <span style={{ fontWeight: 'bold', fontSize: 22, }} >{tempoEspera.data_hora_prevista}</span>
                      </Grid>

                    </Grid>


                  </Grid>



                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                </Grid>

              </Grid>

            </Grid>

          </div>
        </div>
      </div>


      <div >
        <Rodape />
      </div>
    </div>
  );
}

export default InfoPatio;