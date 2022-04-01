import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuCliente from '../components/menu';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import NavBarAdmin from "../../../components/NavBarAdmin";
import Rodape from '../../../components/Rodape';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './styles.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useHistory } from "react-router-dom";

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



export default function ContaArmazem() {
  const classes = useStyles();
  const [meusDados, setMeusDados] = useState([]);
  const [meusEnderecos, setMeusEnderecos] = useState([]);

  const [loading, setLoading] = useState(true);

  const history = useHistory();


  const [senha, setSenha] = useState('');
  const [confirmesenha, setConfirmeSenha] = useState('');

  const [erroSenha, setErroSenha] = useState(false);
  const [textoErroSenha, setTextoErroSenha] = useState('');

  const [open, setOpen] = useState(false);
  
  const title = "Deseja mudar sua senha?";
  

  useEffect(() => {

    async function listarMeusDados() {
      try {

        var dados = [];

        const token = Cookies.get('token');
        const headers = {
          'Authorization': 'Bearer ' + token
        }


        const id_usuario = Cookies.get('id_usuario');
        console.log("id na tela de painel cliente: " + id_usuario)

        await api.get("v1/protected/retornardadoscliente/" + id_usuario, {
          headers: headers
        }).then(function (response) {
          setMeusDados(response.data)
          dados = response.data

          console.log(" Meus Dados: " + response);


        });


        var identificacao = dados.tipo_cliente === 0 ? dados.cpf : dados.cnpj;
        await api.get("v1/protected/retornarenderecos/" + identificacao, {
          headers: headers
        }).then(function (response) {
          setMeusEnderecos(response.data)

          console.log(" Meus Enderecos: " + response);
          setLoading(false);

        });


      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar seus dados: " + _err)

      }

    }

    listarMeusDados();


  }, []);

  async function onConfirm(){
      try {

          const id_usuario = Cookies.get('id_usuario');


          console.log("alterar senha chamado");
          console.log("id usuario: " + id_usuario);
          const cadastro_usuario = {
              senhaweb : senha,
          }

          const headers = {
              'Authorization': 'Bearer ' + Cookies.get("token")
          }

          const response = await api.put('/v1/protected/cliente/mudarsenha/' + id_usuario, cadastro_usuario,
              { headers: headers });

          const cadastro_salvo = response.data;
          if (cadastro_salvo) {
              alert("Senha alterada com sucesso!");
              Cookies.set('token', undefined);

              history.push({
                pathname: '/login',
            })
          } else {
              alert("Erro de Conexão, tente novamente mais tarde");
          }
      } catch (_err) {
          console.log("erro ao cadastrar: " + _err);
          alert("Erro de Conexão, tente novamente mais tarde");

      }
  }
  

  function verificar() {
    var senha_valida = validateSenha();

    if (senha_valida) {
      setOpen(true);
    }


  }

  function validateSenha() {
    if (senha.length >= 4) {
      if (senha === confirmesenha) {

        setErroSenha(false);
        setTextoErroSenha('');
        return true;
      } else {

        setErroSenha(true);
        setTextoErroSenha("Senhas não conferem");
        console.log("senhas nao conferem");
        return false;
      }
    } else {
      setErroSenha(true);
      setTextoErroSenha("Senha muito curta");
      console.log("Senha muito curta");
      return false;
    }
  }


  

  return (
    <div>

      <NavBarAdmin />
      <div className={classes.root} style={{ backgroundColor: '#DCDCDC' }}>
        <MenuCliente titulo={"Meus Dados"} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <Container maxWidth="lg" className={classes.container}>
            {loading ?
              <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
              </Skeleton>
              :
              <div>
                <Typography variant="h6" component="h2" style={{ fontWeight: 'bold', marginBottom: 50 }}>
                  Dados do Cliente
                </Typography>
                <Paper elevation={5}  >
                  <Grid container spacing={1}
                    direction="row"
                    alignItems="center"
                    item xs={12}
                  >
                    <Grid item xs={2}>
                      <Typography style={{ textAlign: 'right' }}>
                        Razão Social:
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography style={{ fontSize: 22 }}>
                        {meusDados.tipo_cliente === 0 ? meusDados.nome_empresarial : meusDados.razao_social}
                      </Typography>
                    </Grid>



                  </Grid>
                </Paper>

                <Paper elevation={5} style={{ marginTop: 5 }}>
                  <Grid container spacing={1}
                    direction="row"
                    alignItems="center"
                    item xs={12}
                  >
                    <Grid item xs={2}>
                      <Typography style={{ textAlign: 'right' }}>
                        CPF/CNPJ:
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                      <Typography style={{ fontSize: 22 }}>
                        {meusDados.tipo_cliente === 0 ? meusDados.cpf : meusDados.cnpj}

                      </Typography>
                    </Grid>



                  </Grid>
                </Paper>


                <Typography variant="h6" component="h2" style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 20 }}>
                  Meus Endereços
                </Typography>
                {meusEnderecos.map((endereco) =>
                  <Paper elevation={5} key={endereco.id_cliente} style={{ marginTop: 10 }}>
                    <Grid container spacing={1}
                      direction="row"
                      alignItems="center"
                      item xs={12}
                    >
                      <Grid item xs={2}>
                        <Typography style={{ textAlign: 'right' }}>
                          Inscrição Estadual:
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography style={{ fontSize: 22 }}>
                          {endereco.ie}
                        </Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <Typography style={{ textAlign: 'right' }}>
                          Ocupação:
                        </Typography>
                      </Grid>

                      <Grid item xs={4}>
                        <Typography style={{ fontSize: 22 }}>
                          {endereco.ocupacao}
                        </Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <Typography style={{ textAlign: 'right' }}>
                          Endereço:
                        </Typography>
                      </Grid>

                      <Grid item xs={10}>
                        <Typography style={{ fontSize: 22 }}>
                          {endereco.rua}, Bairro: {endereco.bairro}, nº: {endereco.numero}. CEP: {endereco.cep} {endereco.cidade}/{endereco.uf}
                        </Typography>
                      </Grid>




                    </Grid>
                  </Paper>

                )}


                <Paper elevation={5} style={{ paddingTop: 10, marginTop: 50 }}>
                  <Grid container spacing={1}
                    direction="row"
                    alignItems="center"
                    item xs={12}
                  >
                    <Grid item xs={2}>
                      <Typography style={{ textAlign: 'right' }}>
                        Mudar Senha:
                      </Typography>
                    </Grid>

                    <Grid item xs={12} style={{ padding: 10, paddingTop: 2 }}>
                      <TextField
                        error={erroSenha}
                        id="password"
                        helperText={textoErroSenha}
                        variant="standard"
                        name="password"
                        fullWidth
                        label="Senha"
                        required
                        type="password"
                        autoComplete="current-password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        inputProps={{ maxLength: 8, minLength: 4 }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ padding: 10, paddingTop: 2 }}>
                      <TextField
                        error={erroSenha}
                        id="password2"
                        helperText={textoErroSenha}
                        variant="standard"
                        name="password2"
                        fullWidth
                        label="Conferir Senha"
                        required
                        type="password"
                        autoComplete="current-password"
                        value={confirmesenha}
                        onChange={e => setConfirmeSenha(e.target.value)}
                        inputProps={{ maxLength: 8, minLength: 4 }}
                      />
                    </Grid>

                    <Grid item xs={1} style={{ padding: 30 }}>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={ verificar }
                      > Salvar  </Button>

                    </Grid>


                  </Grid>
                </Paper>

              </div>

            }
          </Container>

        </main>
      </div>
      <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{"Após modificar a senha, você será deslogado e redirecionado para a página de login"}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="default"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
      <div >
        <Rodape />
      </div>
    </div>
  );
}