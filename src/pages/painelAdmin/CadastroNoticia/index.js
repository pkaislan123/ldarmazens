import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../components/menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';
import api from '../../../services/api';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import NavBarAdmin from "../../../components/NavBarAdmin";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';



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
}));



export default function CadastroNoticia() {
    const classes = useStyles();
    const history = useHistory();

    /* variaveis de estado de cadastro de endereco*/
    const [titulo, setTitulo] = useState('');
    const [subTitulo, setSubTitulo] = useState('');
    const [url_capa, setUrlCapa] = useState('');

    const [idCategoria, setIdCategoria] = useState(0);
    const [categorias, setCategorias] = useState([]);
    const [dataNoticia, setDataNoticia] = useState(moment(new Date()).format("DD/MM/YYYY"));
    const [horaNoticia, setHoraNoticia] = useState(moment(new Date()).format("HH:MM"));
    const [citacao, setCitacao] = useState('');

   
    const [sub_titulo1, setSubTitulo1] = useState('');
    const [texto1, setTexto1] = useState('');
    const [url_img1, setUrlImg1] = useState('');
    const [url_video1, setUrlVideo1] = useState('');

    const [sub_titulo2, setSubTitulo2] = useState('');
    const [texto2, setTexto2] = useState('');
    const [url_img2, setUrlImg2] = useState('');
    const [url_video2, setUrlVideo2] = useState('');


    const [sub_titulo3, setSubTitulo3] = useState('');
    const [texto3, setTexto3] = useState('');
    const [url_img3, setUrlImg3] = useState('');
    const [url_video3, setUrlVideo3] = useState('');

    const [sub_titulo4, setSubTitulo4] = useState('');
    const [texto4, setTexto4] = useState('');
    const [url_img4, setUrlImg4] = useState('');
    const [url_video4, setUrlVideo4] = useState('');



    const [sub_titulo5, setSubTitulo5] = useState('');
    const [texto5, setTexto5] = useState('');
    const [url_img5, setUrlImg5] = useState('');
    const [url_video5, setUrlVideo5] = useState('');


    const [nome_fonte, setFonte] = useState('');
    const [url_fonte, setUrlFonte] = useState('');




    async function salvar() {
        try {

            const id_usuario = Cookies.get('id_usuario');


            console.log("cadastrar chamado");
            console.log("id usuario: " + id_usuario);
            const cadastro_noticia = {
                titulo: titulo,
                sub_titulo: subTitulo,
                data_noticia: dataNoticia,
                hora_noticia: horaNoticia,
                url_capa: url_capa,
                sub_titulo1 : sub_titulo1,
                texto1: texto1,
                url_img1: url_img1,
                url_video1: url_video1,
                sub_titulo2 : sub_titulo2,
                texto2: texto2,
                url_img2: url_img2,
                url_video2: url_video2,
                sub_titulo3 : sub_titulo3,
                texto3: texto3,
                url_img3: url_img3,
                url_video3: url_video3,
                sub_titulo4 : sub_titulo4,
                texto4: texto4,
                url_img4: url_img4,
                url_video4: url_video4,
                sub_titulo5 : sub_titulo5,
                texto5: texto5,
                url_img5: url_img5,
                url_video5: url_video5,
                citacao: citacao,
                nome_fonte: nome_fonte,
                url_fonte: url_fonte,
                usuario: { id_usuario: id_usuario, },
                categoria: { id_categoria: idCategoria, },
            }

            const headers = {
                'Authorization': 'Bearer ' + Cookies.get("token")
            }

            const response = await api.post('/v1/protected/noticias/cadastrarnoticia', cadastro_noticia,
                { headers: headers });

            const cadastro_salvo = response.data;
            if (cadastro_salvo) {
                history.push({
                    pathname: '/minhasnoticias',
                })
            } else {
                alert("Erro de Conexão, tente novamente mais tarde");
            }
        } catch (_err) {
            console.log("erro ao cadastrar: " + _err);
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    useEffect(() => {

        async function listarCategorias() {
            try {

                const response = await api.get('/v1/protected/noticias/listarCategorias');
                setCategorias(response.data);


            } catch (_err) {
                // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
                console.log("Erro ao listar noticias: " + _err)

            }

        }

        listarCategorias();

    }, []);


    return (
        <div>

            <NavBarAdmin />
            <div className={classes.root} style={{ backgroundColor: '#DCDCDC' }}>

                <MenuAdmin titulo={"Cadastrar Nova Notícia"} />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container} >
                        <React.Fragment >
                            <Grid container spacing={2} >


                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="titulo"
                                        label="Título"
                                        required
                                        id="titulo"
                                        autoComplete="titulo"
                                        value={titulo}
                                        onChange={e => setTitulo(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={3}
                                        InputProps={{ inputProps: { min: 73, max: 73 } }}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="subtitulo"
                                        label="Sub Título"
                                        required
                                        id="subtitulo"
                                        autoComplete="subtitulo"
                                        value={subTitulo}
                                        onChange={e => setSubTitulo(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={3}
                                        InputProps={{ inputProps: { min: 0, max: 73 } }}

                                    />
                                </Grid>


                                <Grid
                                    item xs={12} sm={12} md={12} lg={6} xl={6}
                                    direction="row"
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ padding: 20, width: '100%' }}
                                >
                                    <Grid
                                        item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <InputLabel id="size">Categoria:</InputLabel>
                                    </Grid>

                                    <Grid
                                        item xs={12} sm={12} md={12} lg={6} xl={6}>
                                        <Select
                                            labelId="size"
                                            id="size"
                                            value={idCategoria}
                                            name="size"
                                            onChange={e => setIdCategoria(e.target.value)}
                                            label="size"
                                        >
                                            {
                                                categorias.map((categoria) => (
                                                    <MenuItem value={categoria.id_categoria}>{categoria.nome_categoria}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </Grid>

                                </Grid>

                                <Grid item xs={3} >
                                    <TextField
                                        variant="standard"
                                        name="dataNoticia"
                                        label="Data desta Notícia"
                                        required
                                        id="dataNoticia"
                                        autoComplete="dataNoticia"
                                        value={dataNoticia}
                                        onChange={e => setDataNoticia(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={3}

                                    />
                                </Grid>

                                <Grid item xs={3} >
                                    <TextField
                                        variant="standard"
                                        name="horaNoticia"
                                        label="Hora desta Notícia"
                                        required
                                        id="horaNoticia"
                                        autoComplete="horaNoticia"
                                        value={horaNoticia}
                                        onChange={e => setHoraNoticia(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={3}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_capa"
                                        label="Url Imagem Capa"
                                        id="url_capa"
                                        autoComplete="url_capa"
                                        value={url_capa}
                                        onChange={e => setUrlCapa(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>


                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="Subtítulo-1"
                                        label="Subtítulo-1"
                                        id="sub_titulo1"
                                        autoComplete="sub_titulo1"
                                        value={sub_titulo1}
                                        onChange={e => setSubTitulo1(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="texto1"
                                        label="Texto 1"
                                        id="texto1"
                                        autoComplete="texto1"
                                        value={texto1}
                                        onChange={e => setTexto1(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={10}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_img1"
                                        label="Url Imagem 1"
                                        id="url_img1"
                                        autoComplete="url_img1"
                                        value={url_img1}
                                        onChange={e => setUrlImg1(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_video1"
                                        label="Url Video 1"
                                        id="url_video1"
                                        autoComplete="url_video1"
                                        value={url_video1}
                                        onChange={e => setUrlVideo1(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>


                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="Subtítulo-2"
                                        label="Subtítulo-2"
                                        id="sub_titulo2"
                                        autoComplete="sub_titulo2"
                                        value={sub_titulo2}
                                        onChange={e => setSubTitulo2(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="texto2"
                                        label="Texto 2"
                                        id="texto2"
                                        autoComplete="texto2"
                                        value={texto2}
                                        onChange={e => setTexto2(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={10}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_img2"
                                        label="Url Imagem 2"
                                        id="url_img2"
                                        autoComplete="url_img2"
                                        value={url_img2}
                                        onChange={e => setUrlImg2(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_video2"
                                        label="Url Video 2"
                                        id="url_video2"
                                        autoComplete="url_video2"
                                        value={url_video2}
                                        onChange={e => setUrlVideo2(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="Subtítulo-3"
                                        label="Subtítulo-3"
                                        id="sub_titulo3"
                                        autoComplete="sub_titulo3"
                                        value={sub_titulo3}
                                        onChange={e => setSubTitulo3(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="texto3"
                                        label="Texto 3"
                                        id="texto3"
                                        autoComplete="texto3"
                                        value={texto3}
                                        onChange={e => setTexto3(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={10}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_img3"
                                        label="Url Imagem 3"
                                        id="url_img3"
                                        autoComplete="url_img3"
                                        value={url_img3}
                                        onChange={e => setUrlImg3(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_video3"
                                        label="Url Video 3"
                                        id="url_video3"
                                        autoComplete="url_video3"
                                        value={url_video3}
                                        onChange={e => setUrlVideo3(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="Subtítulo-4"
                                        label="Subtítulo-4"
                                        id="sub_titulo4"
                                        autoComplete="sub_titulo4"
                                        value={sub_titulo4}
                                        onChange={e => setSubTitulo4(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="texto4"
                                        label="Texto 4"
                                        id="texto4"
                                        autoComplete="texto4"
                                        value={texto4}
                                        onChange={e => setTexto4(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={10}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_img4"
                                        label="Url Imagem 4"
                                        id="url_img4"
                                        autoComplete="url_img4"
                                        value={url_img4}
                                        onChange={e => setUrlImg4(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_video4"
                                        label="Url Video 4"
                                        id="url_video4"
                                        autoComplete="url_video4"
                                        value={url_video4}
                                        onChange={e => setUrlVideo4(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="Subtítulo-5"
                                        label="Subtítulo-5"
                                        id="sub_titulo5"
                                        autoComplete="sub_titulo5"
                                        value={sub_titulo5}
                                        onChange={e => setSubTitulo5(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="texto5"
                                        label="Texto 5"
                                        id="texto5"
                                        autoComplete="texto5"
                                        value={texto5}
                                        onChange={e => setTexto5(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={10}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_img5"
                                        label="Url Imagem 5"
                                        id="url_img5"
                                        autoComplete="url_img5"
                                        value={url_img5}
                                        onChange={e => setUrlImg5(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="url_video5"
                                        label="Url Video 5"
                                        id="url_video5"
                                        autoComplete="url_video5"
                                        value={url_video5}
                                        onChange={e => setUrlVideo5(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid item xs={12} >
                                    <TextField
                                        variant="standard"
                                        name="citacao"
                                        label="Citação"
                                        id="citacao"
                                        autoComplete="citacao"
                                        value={citacao}
                                        onChange={e => setCitacao(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={3}

                                    />
                                </Grid>

                               
                                <Grid item xs={6} >
                                    <TextField
                                        variant="standard"
                                        name="nome_fonte"
                                        label="Fonte"
                                        id="nome_fonte"
                                        autoComplete="nome_fonte"
                                        value={nome_fonte}
                                        onChange={e => setFonte(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={6} >
                                    <TextField
                                        variant="standard"
                                        name="url_fonte"
                                        label="Url da Fonte"
                                        id="url_fonte"
                                        autoComplete="url_fonte"
                                        value={url_fonte}
                                        onChange={e => setUrlFonte(e.target.value)}
                                        fullWidth
                                        multiline={true}
                                        rows={2}

                                    />
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    item xs={10}
                                >
                                    <Button style={{ marginTop: 50 }}
                                        variant="contained"
                                        color="primary"
                                        onClick={salvar}
                                    > Salvar  </Button>
                                </Grid>

                            </Grid>


                        </React.Fragment>


                    </Container>

                </main>
            </div>
        </div >
    );


}


