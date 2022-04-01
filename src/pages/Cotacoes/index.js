import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import './styles.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Divider from "@material-ui/core/Divider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Cotacoes = () => {


  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);


  function formatData(data) {
    var dataCtr = moment(data, "YYYY-MM-DD hh:mm");
    return dataCtr.format("DD/MM/YYYY HH:mm")
  }




  useEffect(() => {

    async function listarCotacoes() {
      try {

        const response = await api.get('/v1/protected/produtos/listar');
        console.log("Produtos" + response.data)

        let produtos = response.data;

        let nova_lista = produtos.map((produto => {

          let cotacoes = produto.cotacoes;
          let novas_cotacoes = [];
          var contador = false;
          for (var i = 0; i < cotacoes.length; i++) {
            if (contador < 3) {

              novas_cotacoes.push(cotacoes[i]);
              contador++;
            } else {
              break;
            }
          }

          function compare(a, b) {
            if (a.data_hora < b.data_hora) {
              return -1;
            }
            if (a.data_hora > b.data_hora) {
              return 1;
            }
            return 0;
          }

          cotacoes.sort(compare);

          produto['cotacoes_originais'] = cotacoes;
          produto.cotacoes = novas_cotacoes;

          return produto;
        }))

        setProdutos(nova_lista)
        setLoading(false);

      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar cotacoes: " + _err)

      }

    }

    listarCotacoes();


  }, []);


  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',


  });

  const ProdutoItem = ({ props }) => {
    return (
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

              <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                {props.url_referencia && props.url_referencia.length > 0 ?
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: 10 }}>
                    <img alt="img1" height={300} width={300}

                      src={props.url_referencia}
                    />
                  </Grid>
                  : <div></div>}

              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                <br></br>
                <span style={{ fontWeight: 'bold', fontSize: 22, }} > {props.nome_produto} {props.transgenia}</span>

              </Grid>

              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="row"
                style={{ color: 'white', textAlign: 'center', backgroundColor: 'green' }}>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1}  >
                  <span style={{ fontSize: 16 }} >Medida</span>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                  <span style={{ fontSize: 16 }} >Quantidade</span>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                  <span style={{ fontSize: 16 }} >Unidade</span>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                  <span style={{ fontSize: 16 }} >Valor</span>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                  <span style={{ fontSize: 16 }} >Data</span>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={3} xl={3} >
                  <span style={{ fontSize: 16 }} >Fonte</span>
                </Grid>
              </Grid>


              {
                props.cotacoes.map((props) => (


                  <Grid key={props.id_cotacao} container item xs={12} sm={12} md={12} lg={12} xl={12} direction="row"
                    style={{ textAlign: 'center' }}>

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
                      <span style={{ fontSize: 16 }} >{props.medida}</span>

                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                      <span style={{ fontSize: 16, }} >{props.quantidade}</span>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                      <span style={{ fontSize: 16, }} >{props.unidade}</span>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                      <span style={{ fontSize: 16, }} >{formatter.format(props.valor)}</span>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
                      <span style={{ fontSize: 16, }} >{formatData(props.data_hora)}</span>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={3} xl={3} >
                      <span style={{ fontSize: 16, }} >{props.localidade} - {props.indicador}</span>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                      <Divider style={{ color: 'black', backgroundColor: 'black', width: '100%', height: 3 }} />
                    </Grid>

                  </Grid>
                ))
              }

            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
            </Grid>

          </Grid>

        </Grid>

      </div>
    )
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
        >
          <span style={{ fontWeight: 'bold', padding: 30, fontSize: 28, lineHeight: '50px' }} >Cotações</span>

        </Grid>

        {loading ?
          <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
          </Skeleton>
          :
          <div style={{ paddingInline: 25 }}>

            {
              produtos.map((produto) => (
                <div>
                  <ProdutoItem props={produto} key={produto.id_produto} />
                  <Grid
                    container
                    item xs={12} sm={12} md={12} lg={12} xl={12}
                    direction="row" 
                    justifyContent="center"
                    alignItems="center"
                    >
                    <LineChart
                      width={600}
                      height={300}
                      data={produto.cotacoes_originais.map((cotacao => {

                        cotacao['name'] = formatData(cotacao.data_hora)
                        cotacao['Valor'] = cotacao.valor
                        cotacao['amt'] = cotacao.valor
                        return cotacao;
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <Line
                        type='monotone'
                        dataKey={'valor'}
                        stroke='#8884d8'
                        activeDot={{ r: 8 }}
                      />
                      <CartesianGrid strokeDasharray='3 3' />
                      <Tooltip />
                      <YAxis />
                      <XAxis dataKey='name' />
                      <Legend />
                    </LineChart>
                  </Grid>
                </div>
              ))
            }


          </div>

        }


      </div>

      <div >
        <Rodape />
      </div>
    </div >
  );
}

export default Cotacoes;