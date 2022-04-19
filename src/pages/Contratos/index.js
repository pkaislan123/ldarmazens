import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Cookies from 'js-cookie';
import api from '../../services/api';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../painelAdmin/components/menu';
import MenuCliente from '../painelCliente/components/menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import NavBarAdmin from "../../components/NavBarAdmin";
import Rodape from '../../components/Rodape';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  table: {
    minWidth: 650,
  },
}));


export default function Contratos() {

  const { tipo } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(0.0);
  const [quantidadeRecebida, setQuantidadeRecebida] = useState(0.0);

  const [valor_total, setValorTotal] = useState(0.0);
  const [quantidade_ctrs, setQuantidadeCtrs] = useState(0);


  const [codigo, setCodigo] = useState('');
  const [produto, setProduto] = useState('');
  const [transgenia, setTransgenia] = useState('');
  const [filtroCompradores, setFiltroCompradores] = useState('');
  const [filtroVendedores, setFiltroVendedores] = useState('');
  const [safra, setSafra] = useState('');

  const [contratosFiltrados, setContratosFiltrados] = useState([]);
  const [contratosRefatorados, setContratosRefatorados] = useState([]);

  const [height, setHeight] = useState(0);


  function checkDimenssoes() {

    var altura = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;


    setHeight(altura * 0.75);

  }

  window.addEventListener('resize', function (event) {
    checkDimenssoes();
  });

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',


  });


  async function listarMeusDados(tipo) {
    try {

      var dados = [];

      const token = Cookies.get('token');
      const headers = {
        'Authorization': 'Bearer ' + token
      }
      const id_usuario = Cookies.get('id_usuario');
      console.log("id na tela de contratos: " + id_usuario)

      await api.get("v1/protected/retornardadoscliente/" + id_usuario, {
        headers: headers
      }).then(function (response) {
        console.log(" Meus Dados: " + response);
        dados = response.data;
      });

      console.log("tipo na funcao de busca: " + tipo)

      var url = tipo === '0' ? "v1/protected/contratos/listar" : tipo === '1' ? "v1/protected/contratos/listarContratosComprador/" : "v1/protected/contratos/listarContratosVendedor/"

      var identificacao = dados.tipo_cliente === 0 ? dados.cpf : dados.cnpj;
      await api.get(url + identificacao, {
        headers: headers
      }).then(function (response) {
        setContratosFiltrados(response.data)
        setContratosRefatorados(response.data)

        let novaListaFiltrada = response.data;

        let soma = 0;
        let valor = 0;
        let contador = 0;

        let somaRecebida = 0;

        for (let i in novaListaFiltrada) {

          let quantidade_local = novaListaFiltrada[i].medida === "Sacos" ? parseFloat(novaListaFiltrada[i].quantidade) : (parseFloat(novaListaFiltrada[i].quantidade) / 60)
          let valor_a_pagar = parseFloat(novaListaFiltrada[i].valor_a_pagar);

          if (novaListaFiltrada[i].status_contrato !== 4) {
            soma += quantidade_local;
            valor += valor_a_pagar;
            contador++;
          }

          somaRecebida += parseFloat(novaListaFiltrada[i].total_recebido);

        }
        setQuantidade(soma);
        setQuantidadeRecebida(somaRecebida);
        setValorTotal(valor);
        setQuantidadeCtrs(contador);

        console.log(" Meus Contratos: " + response);
        setLoading(false);

      });

    } catch (_err) {
      // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
      console.log("Erro ao listar seus dados: " + _err)

    }

  }


  useEffect(() => {



    checkDimenssoes();


    listarMeusDados(tipo);



  }, [tipo]);




  function CollapsibleTable() {
    return (
      <TableContainer component={Paper} style={{ height: height }}>
        <Table aria-label="collapsible table">
          <TableHead>

            <TableRow  >
              <TableCell style={{ backgroundColor: 'blue', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={1}></TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} align="center" colSpan={1}>ID</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Código</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Data Contrato</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Compradores</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Vendedores</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Status</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Data Entrega</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Quantidade</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Medida</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Produto</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Transgenia</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Safra</TableCell>
              <TableCell style={{ Width: 200, backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Valor Unidade</TableCell>
              <TableCell style={{ Width: 50, backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Valor Total</TableCell>

              <TableCell style={{ Width: 50, backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Data Entrega</TableCell>

              <TableCell style={{ Width: 50, backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Data Pagamento</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {contratosFiltrados.map((contrato) => (
              <Row key={contrato.id} row={contrato} />
            ))}
          </TableBody>

          <TableBody style={{ position: "sticky", bottom: 0 }}>
            <TableRow>
              <TableCell style={{ fontSize: 12, backgroundColor: 'green', color: 'white' }} colSpan={1}>Num CTRS:</TableCell>
              <TableCell style={{ fontSize: 14, backgroundColor: 'green', color: 'white' }} colSpan={1} align="right"> {quantidade_ctrs} </TableCell>

              <TableCell style={{ fontSize: 0, backgroundColor: 'black', color: 'white' }} colSpan={4}> </TableCell>
              <TableCell style={{ fontSize: 12, backgroundColor: 'green', color: 'white' }} colSpan={2}>Total Contratado:</TableCell>
              <TableCell style={{ fontSize: 14, backgroundColor: 'green', color: 'white' }} colSpan={2} align="right"> {quantidade.toLocaleString('pt-BR', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
              })} sacos </TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'black', color: 'white' }} colSpan={3}> </TableCell>

              <TableCell style={{ fontSize: 12, backgroundColor: 'green', color: 'white' }} colSpan={1}>Valor Total:</TableCell>
              <TableCell style={{ fontSize: 14, backgroundColor: 'green', color: 'white' }} colSpan={3} align="right"> {formatter.format(valor_total)} </TableCell>

            </TableRow>

            <TableRow>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={1}></TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={1} align="right">  </TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'black', color: 'white' }} colSpan={4}> </TableCell>
              <TableCell style={{ fontSize: 12, backgroundColor: 'green', color: 'white' }} colSpan={2}>Quantidade Total Recebida:</TableCell>
              <TableCell style={{ fontSize: 14, backgroundColor: 'green', color: 'white' }} colSpan={2} align="right"> {quantidadeRecebida.toLocaleString('pt-BR', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
              })} sacos </TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'black', color: 'white' }} colSpan={3}> </TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={1}></TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={3}> </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={1}></TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={1} align="right">  </TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'black', color: 'white' }} colSpan={4}> </TableCell>
              <TableCell style={{ fontSize: 12, backgroundColor: 'green', color: 'white' }} colSpan={2}>Quantidade a Receber:</TableCell>
              <TableCell style={{ fontSize: 14, backgroundColor: 'green', color: 'white' }} colSpan={2} align="right"> {(quantidade - quantidadeRecebida).toLocaleString('pt-BR', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
              })} sacos </TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'black', color: 'white' }} colSpan={3}> </TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={1}></TableCell>
              <TableCell style={{ fontSize: 0, backgroundColor: 'green', color: 'white' }} colSpan={3}> </TableCell>
            </TableRow>

          </TableBody>



        </Table>
      </TableContainer>
    );
  }




  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const baixar = (url) => {
      baixarArquivo(url);
    }
  


    async function baixarArquivo(url, codigo) {
      try {
  
        const token = Cookies.get('token');
  
        const headers = {
          'Authorization': 'Bearer ' + token
        }
  
  
        url = url.replaceAll(" ", ";");
        url = url.replaceAll("\\", "@");
  
        const id_usuario = Cookies.get('id_usuario');
        console.log("id na tela de romaneios: " + id_usuario)
  
  
        await api.get("v1/protected/nuvem/salvar", {
          responseType: 'blob',
          params: {
            urlarquivo: url,
          },
          headers: headers
        }).then(function (response) {
  
          const file = new Blob(
            [response.data],
            { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
  
          //Open the URL on new Window
          window.open(fileURL);
        });
  
      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao tentar donwload " + _err)
  
      }
  
    }

    function setOpenInfoExtra(open) {
      setOpen(open);
    }

    function retornarStatusContrato(status) {
      if (status === 1) {
        return "ASSINAR";
      } else if (status === 2) {
        return "ASSINADO";

      } else if (status === 3) {
        return "CONCLUIDO";

      } else if (status === 0) {
        return "A APROVAR";

      } else if (status === 4) {
        return "CANCELADO";

      }
    }

    function retornarCorStatusContrato(status) {
      if (status === 1) {
        return "yellow";
      } else if (status === 2) {
        return "green";

      } else if (status === 3) {
        return "blue";

      } else if (status === 0) {
        return "orange";

      } else if (status === 4) {
        return "red";

      }
    }


    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenInfoExtra(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>


          <TableCell colSpan={1} align="right">{row.id}</TableCell>
          <TableCell colSpan={1} align="right">{row.codigo.toUpperCase()}</TableCell>
          <TableCell colSpan={1} align="right">{row.data_contrato.toUpperCase()}</TableCell>

          <TableCell colSpan={1} align="right">{
            row.compradores.map((comprador) =>
              comprador.tipo_cliente === 0 ? comprador.nome_empresarial.toUpperCase() : comprador.razao_social.toUpperCase()
                + ";"
            )
          } </TableCell>
          <TableCell colSpan={1} align="right">{
            row.vendedores.map((vendedor) =>
              vendedor.tipo_cliente === 0 ? vendedor.nome_empresarial.toUpperCase() : vendedor.razao_social.toUpperCase()
                + ";"
            )
          }</TableCell>

          <TableCell colSpan={1} style={{ backgroundColor: retornarCorStatusContrato(row.status_contrato), color: retornarCorStatusContrato(row.status_contrato) === 'yellow' ? 'black' : 'white' }} align="right">{
            retornarStatusContrato(row.status_contrato).toUpperCase()
          }</TableCell>
          <TableCell colSpan={1} align="right">{row.data_entrega.toUpperCase()}</TableCell>

          <TableCell colSpan={1} align="right">{
            row.quantidade
          }</TableCell>

          <TableCell colSpan={1} align="right">{
            row.medida.toUpperCase()
          }</TableCell>


          <TableCell colSpan={1} align="right">{
            row.safra.produto.nome_produto.toUpperCase()
          }</TableCell>

          <TableCell colSpan={1} align="right">{
            row.safra.produto.transgenia.toUpperCase()
          }</TableCell>

          <TableCell colSpan={1} align="right">{row.safra.ano_plantio}/{row.safra.ano_colheita}</TableCell>

          <TableCell colSpan={1} align="right">{formatter.format(row.valor_produto)}</TableCell>

          <TableCell colSpan={1} align="right">{formatter.format(row.valor_a_pagar)}</TableCell>
          <TableCell colSpan={1} align="right">{row.data_entrega}</TableCell>
          <TableCell colSpan={1} align="right">{row.data_pagamento}</TableCell>


        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Paper elevation={3} style={{ margin: 10 }} >
                  <Grid container spacing={1} style={{ padding: 10 }}>
                    <Grid item xs={6}>

                      <Typography >
                        Informações do Contrato:
                      </Typography>
                      <Typography >
                        {"--->"}Quantidade de Sacos Contratatos: {row.quantidade.toLocaleString('pt-BR', {
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3
                        })} sacos
                      </Typography>
                      <Typography >
                        {"--->"}Quantidade de Sacos Recebidos: {row.total_recebido.toLocaleString('pt-BR', {
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3
                        })} sacos
                      </Typography>
                      <Typography >
                        {"--->"}Quantidade de Sacos a Receber: {(row.quantidade - row.total_recebido).toLocaleString('pt-BR', {
                          minimumFractionDigits: 3,
                          maximumFractionDigits: 3
                        })} sacos
                      </Typography>
                    </Grid>
                    <Grid  xs={6} container direction='column' >

                      <Button
                        onClick={() => { baixar(row.caminho_arquivo, row.codigo) }}
                        color="primary"
                        variant="contained"
                        size="small"
                        style={{ fontSize: 12, marginTop: 10, marginBottom: 10 }}
                      >
                       Contrato Original
                      </Button>
                      <Button
                        onClick={() => { baixar(row.caminho_diretorio + "//comprovantes//comprovante_assinatura_" +  row.codigo + ".pdf" , row.codigo) }}
                        color="secondary"
                        variant="contained"
                        size="small"
                        style={{ fontSize: 12, marginTop: 10, marginBottom: 10 }}

                      >
                        Contrato Assinado
                      </Button>

                    </Grid>



                  </Grid>
                </Paper>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

      </React.Fragment>
    );
  }


  function filtrar() {


    let arraybkp = contratosRefatorados;

    let novaLista = arraybkp.map((contrato) => {
      var nome_compradores = contrato.compradores.map((comprador) =>
        comprador.tipo_cliente === 0 ? comprador.nome_empresarial : comprador.razao_social
          + ";"
      ).toString().toUpperCase();

      contrato['nome_compradores'] = nome_compradores

      var nome_vendedores = contrato.vendedores.map((vendedor) =>
        vendedor.tipo_cliente === 0 ? vendedor.nome_empresarial : vendedor.razao_social
          + ";"
      ).toString().toUpperCase();
      contrato['nome_vendedores'] = nome_vendedores
      var desc_safra = contrato.safra.ano_plantio + "/" + contrato.safra.ano_colheita
      contrato['desc_safra'] = desc_safra
      return contrato;

    })




    let novaListaFiltrada = novaLista.filter(
      item =>
        (safra !== "" && safra !== null) ? item.desc_safra.includes(safra) : 2 &&
          (codigo !== "" && codigo !== null) ? item.codigo.includes(codigo) : 2 &&
            (filtroCompradores !== "" && filtroCompradores !== null) ? item.nome_compradores.includes(filtroCompradores.toUpperCase()) : 2 &&
              (filtroVendedores !== "" && filtroVendedores !== null) ? item.nome_vendedores.includes(filtroVendedores.toUpperCase()) : 2 &&
                (produto !== "" && produto !== null) ? item.safra.produto.nome_produto.toUpperCase().includes(produto.toUpperCase()) : 2 &&
                  (transgenia !== "" && transgenia !== null) ? item.safra.produto.transgenia.toUpperCase().includes(transgenia.toUpperCase()) : 2
    )


    setContratosFiltrados(novaListaFiltrada);

    let soma = 0;
    let somaRecebida = 0;
    let valor = 0;
    let contador = 0;
    for (let i in novaListaFiltrada) {

      let quantidade_local = novaListaFiltrada[i].medida === "Sacos" ? parseFloat(novaListaFiltrada[i].quantidade) : parseFloat(novaListaFiltrada[i].quantidade) * 60
      let valor_a_pagar = parseFloat(novaListaFiltrada[i].valor_a_pagar);

      if (novaListaFiltrada[i].status_contrato !== 4) {
        soma += quantidade_local;
        valor += valor_a_pagar;
        contador++;
      }

      somaRecebida += parseFloat(novaListaFiltrada[i].total_recebido);
    }
    setQuantidade(soma);
    setQuantidadeRecebida(somaRecebida);
    setValorTotal(valor);
    setQuantidadeCtrs(contador);

  }



  const renderMenu = () => {

    const regra = Cookies.get('regra');
    console.log("regra na funcao render na tela de contratos: " + regra);
    console.log("tipo " + tipo);

    if (regra === "ROLE_ADMIN") {
      return <MenuAdmin titulo={tipo === '0' ? "Contratos" : tipo === '1' ? "Contratos Como Comprador" : "Contratos Como Vendedor"} />
    } else if (regra === "ROLE_CLIENTE") {
      return <MenuCliente titulo={tipo === '0' ? "Contratos" : tipo === '1' ? "Contratos Como Comprador" : "Contratos Como Vendedor"} />
    }
  }



  return (
    <div>

      <NavBarAdmin />
      <div className={classes.root} style={{ backgroundColor: '#DCDCDC' }}>
        {renderMenu()}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <div style={{ padding: 10 }}>

            <div >
              <div style={{ backgroundColor: 'white' }}>
                <Grid
                  container
                  direction="row"
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                  justifyContent="center"
                  alignItems="center"

                >

                  <Grid item xs={2} style={{ padding: 10 }}>
                    <TextField
                      variant="standard"
                      name="codigo"
                      label="Código"
                      id="codigo"
                      value={codigo}
                      onChange={e => setCodigo(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={2} style={{ padding: 10 }}>
                    <TextField
                      variant="standard"
                      name="compradores"
                      label="Compradores"
                      id="compradores"
                      value={filtroCompradores}
                      onChange={e => setFiltroCompradores(e.target.value.toUpperCase())}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={2} style={{ padding: 10 }}>
                    <TextField
                      variant="standard"
                      name="vendedores"
                      label="Vendedores"
                      id="vendedores"
                      value={filtroVendedores}
                      onChange={e => setFiltroVendedores(e.target.value.toUpperCase())}
                      fullWidth
                    />
                  </Grid>



                  <Grid item xs={2} style={{ padding: 10 }} >
                    <TextField
                      variant="standard"
                      name="produto"
                      label="Produto"
                      id="produto"
                      value={produto}
                      onChange={e => setProduto(e.target.value.toUpperCase())}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={2} style={{ padding: 10 }}>
                    <TextField
                      variant="standard"
                      name="transgenia"
                      label="Transgenia"
                      id="transgenia"
                      value={transgenia}
                      onChange={e => setTransgenia(e.target.value.toUpperCase())}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={1} style={{ padding: 10 }}>
                    <TextField
                      variant="standard"
                      name="safra"
                      label="Safra"
                      id="safra"
                      value={safra}
                      onChange={e => setSafra(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={1} >

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={filtrar}
                    > filtrar  </Button>

                  </Grid>


                </Grid>

              </div>
              {loading ?
                <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
                </Skeleton>
                :
                <div>
                  <CollapsibleTable></CollapsibleTable>
                  <div style={{ backgroundColor: 'white' }}>
                    <Grid
                      container
                      direction="row"
                      item xs={12} sm={12} md={12} lg={12} xl={12}
                      justifyContent="center"
                      alignItems="center"

                    >
                    </Grid>


                  </div>
                </div>
              }


            </div>
          </div>
        </main>
      </div>
      <div >
        <Rodape />
      </div>
    </div>
  );
}

