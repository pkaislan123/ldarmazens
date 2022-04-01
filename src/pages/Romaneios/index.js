import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select, MenuItem, InputLabel, Button } from '@material-ui/core';

import Cookies from 'js-cookie';
import api from '../../services/api';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import MenuCliente from '../painelCliente/components/menu';
import NavBarAdmin from "../../components/NavBarAdmin";
import Rodape from '../../components/Rodape';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Pagination from '@material-ui/lab/Pagination';


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

export default function Romaneios() {
  const classes = useStyles();
  const [romaneios, setRomaneios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(1);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [parametros, setParametros] = useState(
    {
      identificacao: "",
      page: 0,
      size: 25,
      codigo: "",
      produto: "",
      motorista: "",
      placa: "",
      operacao: "",
      safra: "",
      remetente: "",
      destinatario: "",

    }
  );


  const [height, setHeight] = useState(0);

  const handleChangePage = (event, value) => {
   
    setPage(value);
    let num_pagina = parseInt(value) - 1;
    console.log("numero da pagina: " + num_pagina)
    setParametros(prevState => ({ ...prevState, 'page': num_pagina }))
    setClick(click +  1)

  };

  
  const handleRowElementsPorPage = (e) =>{

    setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    setClick(click +  1)

  }


 const handleClick = () =>{
   setClick(click +  1)
 }
 
  function checkDimenssoes() {

    var altura = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;


    setHeight(altura * 0.75);

  }

  window.addEventListener('resize', function (event) {
    checkDimenssoes();
  });



  useEffect(() => {

    

    async function listarMeusDados(parametros) {
      try {
        setLoading(true);
        var dados = [];

        const token = Cookies.get('token');

        const headers = {
          'Authorization': 'Bearer ' + token
        }


        const id_usuario = Cookies.get('id_usuario');
        console.log("id na tela de romaneios: " + id_usuario)

        await api.get("v1/protected/retornardadoscliente/" + id_usuario, {
          headers: headers
        }).then(function (response) {
          dados = response.data
          console.log(" Meus Dados: " + response);



        });

        var url = "v1/protected/romaneiosPaginados/";

        var identificacao = dados.tipo_cliente === 0 ? dados.cpf : dados.cnpj;
        await api.get(url, {
          params: {
            identificacao: identificacao,
            page: parametros.page,
            size: parametros.size,
            codigo: parametros.codigo,
            produto: parametros.produto,
            motorista: parametros.motorista,
            placa: parametros.placa,
            operacao: parametros.operacao,
            safra: parametros.safra,
            remetente: parametros.remetente,
            destinatario: parametros.destinatario,

          },
          headers: headers
        }).then(function (response) {
          setRomaneios(response.data.content)
         // console.log(" Meus Romaneios: " + response.data.content);

          setTotalElements(response.data.totalElements);
          setTotalPages(response.data.totalPages);

          console.log(" total de elementos: " + response.data.totalElements);


          console.log(" total de paginas: " + response.data.totalPages);

          setLoading(false);

        });



      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar seus dados: " + _err)

      }

    }


    checkDimenssoes();

    listarMeusDados();


  }, [click]);


  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);


    function setOpenInfoExtra(open) {
      setOpen(open);
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
          <TableCell colSpan={1} align="right">{row.codigo}</TableCell>
          <TableCell colSpan={1} align="right">{row.operacao}</TableCell>
          <TableCell colSpan={1} align="right">{row.data_romaneio}</TableCell>
          <TableCell colSpan={1} align="right">{row.safra.produto.nome_produto.toUpperCase()}</TableCell>
          <TableCell colSpan={1} align="right">{row.safra.ano_plantio}/{row.safra.ano_colheita}</TableCell>
          <TableCell colSpan={1} align="right">{
            row.remetente.tipo_cliente === 0 ? row.remetente.nome_empresarial.toUpperCase() : row.remetente.razao_social.toUpperCase()
          } </TableCell>
          <TableCell colSpan={1} align="right">{
            row.destinatario != null ? row.destinatario.tipo_cliente === 0 ? row.destinatario.nome_empresarial.toUpperCase() : row.destinatario.razao_social.toUpperCase() : ""
          } </TableCell>
          <TableCell colSpan={1} align="right">{row.nome_motorista}</TableCell>
          <TableCell colSpan={1} align="right">{row.cpf_motorista}</TableCell>
          <TableCell colSpan={1} align="right">{row.placa}</TableCell>
          <TableCell colSpan={1} align="right">{row.peso_bruto}</TableCell>
          <TableCell colSpan={1} align="right">{row.tara}</TableCell>
          <TableCell colSpan={1} align="right">{row.peso_liquido}</TableCell>
          <TableCell colSpan={1} align="right">{row.umidade}</TableCell>
          <TableCell colSpan={1} align="right">{row.impureza}</TableCell>
          <TableCell colSpan={1} align="right">{row.ardidos}</TableCell>
          <TableCell colSpan={1} align="right">{row.avariados}</TableCell>

        </TableRow>


      </React.Fragment>
    );
  }



  function CollapsibleTable() {
    return (
      <TableContainer component={Paper} style={{ height: height }}>
        <Table aria-label="collapsible table">
          <TableHead>

            <TableRow  >
              <TableCell colSpan={1}></TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} align="center" colSpan={1}>ID</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Código</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Operação</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Data Romaneio</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>produto</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Safra</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Remetente</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Destinátario</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Motorista</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>CPF</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Placa</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Peso Bruto</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Peso Tara</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Peso Líquido</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Umidade</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Impureza</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Ardidos</TableCell>
              <TableCell style={{ backgroundColor: 'brown', color: 'white', position: "sticky", top: 0 }} colSpan={1}>Avariados</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {romaneios.map((romaneio) => (
              <Row key={romaneio.id} row={romaneio} />
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    );
  }




  return (
    <div>

      <NavBarAdmin />
      <div className={classes.root} style={{ backgroundColor: '#DCDCDC' }}>
        <MenuCliente titulo={"Romaneios"} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <div style={{ backgroundColor: 'white' }}>
            <Grid
              container
              direction="row"
              item xs={12} sm={12} md={12} lg={12} xl={12}
              justifyContent="center"
              alignItems="center"

            >

              <Grid item xs={1} style={{ padding: 10 }}>
                <TextField
                  variant="standard"
                  name="codigo"
                  label="Código"
                  id="codigo"
                  value={parametros.codigo}
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  fullWidth
                />
              </Grid>

              <Grid item xs={2} style={{ padding: 10 }}>
                <TextField
                  variant="standard"
                  name="operacao"
                  label="Operação"
                  id="operacao"
                  value={parametros.operacao}
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  fullWidth
                />
              </Grid>

              <Grid item xs={2} style={{ padding: 10 }}>
                <TextField
                  variant="standard"
                  name="remetente"
                  label="Remetente"
                  id="remetente"
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  value={parametros.remetente}

                  fullWidth
                />
              </Grid>

              <Grid item xs={2} style={{ padding: 10 }}>
                <TextField
                  variant="standard"
                  name="destinatario"
                  label="Destinatario"
                  id="destinatario"
                  value={parametros.destinatario}
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}

                  fullWidth
                />
              </Grid>



              <Grid item xs={1} style={{ padding: 10 }} >
                <TextField
                  variant="standard"
                  name="produto"
                  label="Produto"
                  id="produto"
                  value={parametros.produto}
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  fullWidth
                />
              </Grid>

              <Grid item xs={1} style={{ padding: 10 }}>
                <TextField
                  variant="standard"
                  name="safra"
                  label="Safra"
                  id="safra"
                  value={parametros.safra}
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  fullWidth
                />
              </Grid>

              <Grid item xs={2} style={{ padding: 10 }}>
                <TextField
                  variant="standard"
                  name="motorista"
                  label="Motorista"
                  id="motorista"
                  value={parametros.motorista}
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  fullWidth
                />
              </Grid>

              <Grid item xs={1} style={{ padding: 10 }}>
                <TextField
                  variant="standard"
                  name="placa"
                  label="Placa"
                  id="placa"
                  value={parametros.placa}
                  onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
                  fullWidth
                />
              </Grid>

              <Grid item xs={1} style={{ padding: 10 }}>
                <Button
                 onClick={handleClick}
                 color="secondary"
                 variant="contained"
                >
                  Filtrar
                </Button>
              </Grid>


            </Grid>

          </div>
          <div style={{ padding: 10, width: '100%', height: '70%' }}>
            {loading ?
              <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
              </Skeleton>
              :
              <div>
                <CollapsibleTable></CollapsibleTable>
                <Grid
                  direction="row"
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                  justifyContent="center"
                  alignItems="center"
                  style={{ padding: 10 }}
                  container
                >

                  <Grid
                    item xs={12} sm={12} md={12} lg={12} xl={12}
                    direction="column"
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{padding :20}}
                  >

                    <span style={{fontWeight: 'bold', fontSize: 14}}> {totalElements} romaneos encontrados   </span> 

                    <InputLabel id="size">Elementos por página:</InputLabel>
                    <Select
                      labelId="size"
                      id="size"
                      value={parametros.size}
                      name="size"
                      onChange={e => handleRowElementsPorPage(e)}
                      label="size"
                      style={{ paddingLeft: 5 }}
                    >
                      <MenuItem value={10} >10</MenuItem>
                      <MenuItem value={25}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={100}>2000</MenuItem>

                    </Select>
                  </Grid>
                  <Grid
                    item xs={12} sm={12} md={12} lg={12} xl={12}
                    direction="column"
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChangePage}
                      variant="outlined" 
                      size="large"
                      color="primary"
                      />

                  </Grid>

                </Grid>

              </div>
            }
          </div>

        </main>
      </div >

      <div >
        <Rodape />
      </div>
    </div >
  );
}

