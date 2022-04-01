import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import Grid from '@material-ui/core/Grid';
import './styles.scss';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../services/api';
import cereais from '../../assets/imgs/cereais.jpg'
import moment from 'moment';
import CountUp from 'react-countup';

import contrato from '../../assets/imgs/contrato.jpeg'

const Home = (props) => {


  const [dadosStatus, setDadosStatus] = useState([]);
  const [safrasAnoPassadoAnoAtual, setSafrasAnoPassadoAnoAtual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSacosBeneficiados, setTotalSacosBeneficiados] = useState(0)


  useEffect(() => {


    async function listarNossosNumeros(totalSacosBeneficiados) {
      try {

        //listar safra ano_passado/ano_atual

        const ano_atual = moment(new Date()).format("yyyy");
        const ano_passado = parseInt(ano_atual) - 1;

        console.log("ano passado: " + ano_passado)
        console.log("ano atual " + ano_atual)


        const response = await api.get('/v1/protected/safras/listar/' + ano_passado + "/" + ano_atual);

        let safras = response.data;

        let soma = 0
        safras.map((safra) => {

          soma += safra.total_recebido_safra
          return safra;
        })

        setSafrasAnoPassadoAnoAtual(response.data)
        setTotalSacosBeneficiados(soma);
        setLoading(false);


      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar Safras ano passado/ano atual " + _err)

      }
    }

    async function listarStatus() {
      try {

        const response = await api.get('/v1/protected/statusarmazem/listar');
        setDadosStatus(response.data)
        await listarNossosNumeros();


      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar seus dados: " + _err)

      }

    }



    listarStatus();

  }, [props]);


  function formatarNumeral(valor) {
    let formatado = valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    return formatado;
  }


  return (
    <div >
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",


      }} >

        <Navegador inicio={'underline'} />

        <div style={{ height: 5, backgroundColor: '#808080' }}>
        </div>


        <div style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <Grid
            container
            direction="row"
            item xs={12} sm={12} md={12} lg={12} xl={12}
            justifyContent="center"
            alignItems="center"
            style={{ paddingTop: 100, paddingBottom: 150 }}

          >

            <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8} style={{ paddingInline: '5%', textAlign: 'justify' }}>


              <br></br> <br></br>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 42, color: 'white' }}> Somos especialistas no que fazemos de melhor</span>
              </Grid>
              <br></br> <br></br>

              <span style={{ fontSize: 22, color: 'white' }}>
                Nosso Armazém vem se reencontrando consigo mesmo nos últimos anos, passamos por diversas transformações,
                diversos rostos estiveram por aqui, reinventamos nosso modo de pensar, de trabalhar, nosso modelo de negócios,
                reinventamos até nosso nome, nos modernizamos, enfim, não temos medo da mudança, isso tudo visando um
                objetivo claro: Atender bem nossos clientes.

                <br></br> <br></br>

                Temos alta capacidade de armazenamento, equipamentos certificados, máquinarios modernos e uma equipe de profissionais
                qualificados para a execução da limpeza, padronização e secagem, garantindo assim toda a segurança na
                armazenagem, beneficiamento e rentabilidade dos grãos.
                Compramos e Vendemos grãos intermediando nossos clientes com as maiores e melhores
                empresas do setor agrícola do país, temos parcerias com multinacionais como a CJ Selecta
                e a Bungue.

                <br></br> <br></br>

                Aqui na LD Armazéns Atender bem nossos Clientes é nossa prioridade, nosso melhor serviço é
                tratar nosso cliente com todo respeito e dedicação, quer seja na negociação, quer seja em todo o cuidado
                das etapas do beneficiamento dos grãos.
              </span>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2} >
            </Grid>
          </Grid>

        </div>


        <div style={{ backgroundColor: 'wheat', color: 'black' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item xs={12} sm={12} md={12} lg={12} xl={12}
            style={{ paddingTop: 80, paddingBottom: 100 }}


          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >
              <Typography component="h1" variant="h5" >
                <span style={{ fontSize: 44 }}> Informações Técnicas</span><br></br> <br></br>
              </Typography>
            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={1} xl={1}
            >
            </Grid>

            <Grid
              container
              direction="row"
              item xs={12} sm={12} md={12} lg={4} xl={4}
              justifyContent="center"
              alignItems="center"
              style={{ paddingTop: 10, paddingBottom: 10 }}
            >
              <Grid
                container
                direction="row"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 2, paddingBottom: 2 }}
              >
                <img alt="img1" height={100} width={100}

                  src={"https://previews.123rf.com/images/lynxtime/lynxtime1602/lynxtime160201043/52308306-icono-de-silos.jpg"}
                />

                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}
                  style={{ textAlign: 'justify' }}
                >
                  <Typography component="h1" variant="h5" >
                    <span style={{ fontSize: 22 }}> Capacidade Total de 600.000 sacos.</span>
                  </Typography>
                </Grid>
              </Grid>


              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                style={{ paddingTop: 2, paddingBottom: 2 }}
              >

                <img alt="img1" height={100} width={100}

                  src={"https://www.silomax.com.br/doutor/uploads/2/produtos/2020/03/capa-pre-limpeza-e-limpeza-mplsx-80.jpg"}
                />

                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}
                  style={{ textAlign: 'justify' }}
                >
                  <Typography component="h1" variant="h5" >
                    <span style={{ fontSize: 22 }}> Capacidade de Limpeza de 180 ton/h. </span>
                  </Typography>
                </Grid>

              </Grid>


              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item xs={12} sm={12} md={12} lg={12} xl={12}
                style={{ paddingTop: 2, paddingBottom: 2 }}

              >

                <img alt="img1" height={100} width={100}

                  src={"https://sc04.alicdn.com/kf/Hc87afd3b44aa42b3a66a7e7987ac62d9Z.jpg"}
                />
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}
                  style={{ textAlign: 'justify' }}
                >
                  <Typography component="h1" variant="h5" >
                    <span style={{ fontSize: 22 }}> Capacidade de Secagem de 90 ton/h.</span>
                  </Typography>
                </Grid>
              </Grid>

            </Grid>

            <Grid
              container
              direction="row"
              item xs={12} sm={12} md={12} lg={6} xl={6}
              justifyContent="flex-start"
              alignItems="flex-start"
            >

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                style={{ textAlign: 'center' }}
              >
                <Typography component="h1" variant="h5" >
                  <span style={{ fontWeight: 'bold', fontSize: 22 }}> A LD Armazém está em constante expansão!
                  </span>
                  <br></br><br></br>

                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                style={{ textAlign: 'justify' }}
              >
                <Typography component="h1" variant="h5" >
                  <span style={{ fontSize: 22, textAlign: 'justify' }}> Desde 2020 a administração da LD Armazém vem
                    investindo nos diversos setores da unidade. Em 2020 um silo pulmão foi montado perto das moegas,
                    assim aumentando o fluxo de produtos ao ter um silo com escoamento mais rápido. Ainda em 2020, um novo
                    silo com capacidade de 100 mil sacos foi montado no setor de armazenamento da unidade.
                  </span>
                  <br></br><br></br>
                  <span style={{ fontSize: 22 }}>
                    Em 2021 a matriz energética foi aprimorada com painéis fotovoltaicos, e iniciou se as obras
                    para expansão da unidade de armazenamento, saltando para um capacidade de quase 1 milhão de sacos.
                  </span>
                </Typography>


              </Grid>

            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={1} xl={1}
            >
            </Grid>
          </Grid>

        </div>


        <div style={{ backgroundColor: 'AliceBlue', color: 'black' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item xs={12} sm={12} md={12} lg={12} xl={12}
            style={{ paddingTop: 80, paddingBottom: 100 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >
              <Typography component="h1" variant="h5" >
                <span style={{ fontSize: 44 }}> Nossos Serviços</span><br></br> <br></br>
              </Typography>
            </Grid>


            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
              container
              direction="row"
              spacing={3}
            >

              <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item xs={12} sm={12} md={12} lg={5} xl={5}
              >

                <img alt="img1" height={300} width={300} style={{ padding: 20 }}

                  src={contrato}
                />

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}
                  container
                  direction="column"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{ textAlign: 'center' }}
                  >
                    <Typography component="h1" variant="h5" >

                      <span style={{ fontWeight: 'bold', fontSize: 22 }}>
                        Compra e Venda
                      </span>
                      <br></br> <br></br>

                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{ textAlign: 'justify' }}
                  >
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 22 }}>
                        Compramos  e vendemos cereais intermediando nossos clientes com as maiores
                        empresas do setor agrícola do mundo, multinacionais como CJ Selecta, Bungue e Aliança Agrícola.
                      </span>

                    </Typography>
                  </Grid>
                </Grid>
              </Grid>


              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item xs={12} sm={12} md={12} lg={5} xl={5}
              >

                <img alt="img1" height={300} width={300} style={{ padding: 20 }}

                  src={cereais}
                />
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}
                  container
                  direction="column"
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{ textAlign: 'center' }}
                  >
                    <Typography component="h1" variant="h5" >

                      <span style={{ fontWeight: 'bold', fontSize: 22 }}>
                        Beneficiamento de Grãos
                      </span>
                      <br></br> <br></br>

                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{ textAlign: 'justify' }}
                  >
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 22 }}>
                        Eficientes e modernos processos de Limpeza, Padronização, Secagem e armazenagem
                        garantindo a preservação da qualidade, sanidade e valor nutritivo dos grãos.
                      </span>

                    </Typography>
                  </Grid>
                </Grid>
              </Grid>


              <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
              </Grid>
            </Grid>


          </Grid>

        </div>


        <div style={{ backgroundColor: 'PaleGoldenrod' }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item xs={12} sm={12} md={12} lg={12} xl={12}
            style={{ paddingTop: 30, paddingBottom: 10 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >
              <Typography component="h1" variant="h5" >
                <span style={{ fontFamily: 'Helvetica', fontSize: 44, fontWeight: 'bold', color: 'DarkGreen' }}> Nossos Números</span><br></br> <br></br>
              </Typography>
            </Grid>


            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              item xs={12} sm={12} md={12} lg={12} xl={12}
              style={{ paddingTop: 1, paddingBottom: 1 }}
            >


              <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
              </Grid>



              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item xs={12} sm={12} md={12} lg={10} xl={10}
                style={{ paddingTop: 1, paddingBottom: 1 }}
              >


                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                  style={{ textAlign: 'center' }}
                >
                  <Typography component="h1" variant="h5" >

                    <span style={{ fontWeight: 'bold', fontSize: 44 }}>

                      <CountUp duration={3.5} start={0} end={totalSacosBeneficiados}
                        decimals={3}
                        decimal=","
                        separator="."
                      /> 
                        
                    </span>
                    <span style={{ fontWeight: 'bold', fontSize: 44 }}>
                    {" "} sacos
                    </span>
                    <br></br>
                    <span style={{ fontSize: 22 }}>
                      beneficiados no ano de { moment(new Date()).format("yyyy")} <br></br> nas safras de Soja, Milho e Sorgo
                      <br></br>
                      sendo;
                    </span>

                  </Typography>
                </Grid>
                {safrasAnoPassadoAnoAtual.map((safra) => (


                  <Grid
                    key={safra.id_safra}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"

                    item xs={12} sm={12} md={12} lg={3} xl={3}
                    style={{ paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}
                  >
                    <img alt="img1" height={200} width={250} style={{ padding: 20 }}

                      src={safra.produto.url_referencia}
                    />

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                      <Typography component="h1" variant="h5" >
                        <span style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                          {formatarNumeral(safra.total_recebido_safra)} sacos de {safra.produto.nome_produto}
                        </span><br></br> <br></br>
                      </Typography>
                    </Grid>




                  </Grid>


                ))}
              </Grid>


              <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
              </Grid>


            </Grid>






          </Grid>
        </div>

        <div style={{ backgroundColor: 'white', color: 'black' }}>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item xs={12} sm={12} md={12} lg={12} xl={12}
            style={{ paddingTop: 40 }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >
              <Typography component="h1" variant="h5" >
                <span style={{ fontSize: 44 }}> Como está operando nosso armazém?</span><br></br> <br></br>
              </Typography>
            </Grid>

          </Grid>
        </div>

        {loading ?
          <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
          </Skeleton>
          :
          <div style={{ backgroundColor: 'white', color: 'black', paddingBottom: 100 }}>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              item xs={12} sm={12} md={12} lg={12} xl={12}
            >

              <Grid item xs={12} sm={12} md={12} lg={2} xl={2} style={{ textAlign: "center" }} >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                >


                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 18, color: 'black' }}> Status do Armazém</span>
                    </Typography>
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 24, color: '#20165b', fontWeight: 'bold' }}> {dadosStatus.status_armazem}</span>
                    </Typography>
                  </Grid>

                </Grid>
              </Grid>



              <Grid item xs={12} sm={12} md={12} lg={2} xl={2} style={{ textAlign: "center" }} >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                >


                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 18, color: 'black' }}> Status do Embarque</span>
                    </Typography>
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 24, color: '#20165b', fontWeight: 'bold' }}> {dadosStatus.status_embarque}</span>
                    </Typography>
                  </Grid>

                </Grid>
              </Grid>


              <Grid item xs={12} sm={12} md={12} lg={2} xl={2} style={{ textAlign: "center" }} >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                >

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >

                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 18, color: 'black' }}> Status do Desembarque</span>
                    </Typography>
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 24, color: '#20165b', fontWeight: 'bold' }}> {dadosStatus.status_desembarque}</span>
                    </Typography>


                  </Grid>


                </Grid>
              </Grid>



              <Grid item xs={12} sm={12} md={12} lg={2} xl={2} style={{ textAlign: "center" }} >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                >


                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }} >
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 18, color: 'black' }}> Horário de Encerramento</span>
                    </Typography>
                    <Typography component="h1" variant="h5" >
                      <span style={{ fontSize: 24, color: '#20165b', fontWeight: 'bold' }}> {dadosStatus.horario_encerramento} horas</span>
                      <br></br><br></br>
                    </Typography>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>
          </div>
        }

      </div>

      <div >
        <Rodape />
      </div>
    </div >
  );
}

export default Home;