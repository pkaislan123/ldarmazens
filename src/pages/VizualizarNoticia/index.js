import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import BlogPage1 from '../../components/BlogPage1';
import './styles.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../services/api';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

const VizualizarNoticia = () => {


  const [loading, setLoading] = useState(true);

  const { idNoticia } = useParams();
  const [categorias, setCategorias] = useState([]);

  const [noticia, setNoticia] = useState();

  const [width, setWidth] = useState(0);
  function checkDimenssoes() {
    var largura = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;


    setWidth(largura);

  }

  window.addEventListener('resize', function (event) {
    checkDimenssoes();
  });



  const NoticiaItem = ({ props }) => {

    return (

      <div >


        <BlogPage1
          titulo={props.titulo}
          sub_titulo={props.sub_titulo}
          nome_categoria={props.categoria.nome_categoria}

          url_capa={props.url_capa}

          citacao={props.citacao}

          sub_titulo1={props.sub_titulo1}
          texto1={props.texto1}
          img1={props.url_img1}
          video1={props.url_video1}


          sub_titulo2={props.sub_titulo2}
          texto2={props.texto2}
          img2={props.url_img2}
          video2={props.url_video2}

          sub_titulo3={props.sub_titulo3}
          texto3={props.texto3}
          img3={props.url_img3}
          video3={props.url_video3}

          sub_titulo4={props.sub_titulo4}
          texto4={props.texto4}
          img4={props.url_img4}
          video4={props.url_video4}

          sub_titulo5={props.sub_titulo5}
          texto5={props.texto5}
          img5={props.url_img5}
          video5={props.url_video5}

          nome_fonte={props.nome_fonte}
          url_fonte={props.url_fonte}
        />
      </div>
    );
  };


  useEffect(() => {

    async function listarNoticia(idNoticia) {
      try {

        var id_noticia = idNoticia;
        var noticia_local;

        const response = await api.get('/v1/protected/noticias/listarNoticia/' + id_noticia);

        noticia_local = response.data;
        setNoticia(response.data)
        console.log("noticia: " + noticia_local)
        console.log("url img 1: " + noticia_local.url_img1)
        setLoading(false);

      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar noticias: " + _err)

      }

    }

    async function listarCategorias() {
      try {
        const response = await api.get('/v1/protected/noticias/listarCategorias');
        setCategorias(response.data);

      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar noticias: " + _err)
      }

    }


    listarNoticia(idNoticia);
    checkDimenssoes();
    listarCategorias();


  }, [idNoticia]);


  return (
    <div >
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",


      }} >

        <Navegador />

        <div style={{ height: 5, backgroundColor: '#808080' }}>
        </div>
      </div>



      <div>
        {loading ?
          <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
          </Skeleton>
          :
          <div>

            <div style={{
              backgroundImage: `url(${noticia.url_capa})`,
              backgroundSize: "cover",
              width: '100%'
            }}  >

              <div style={{ backgroundColor: 'rgba(3,0,15,0.6)', color: 'white' }}>
                <Grid
                  container
                  direction="row"
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                  justifyContent="center"
                  alignItems="center"
                  style={{ paddingTop: 100, paddingBottom: 100, paddingInline: width < 1300 ? 30 : null }}
                >

                  <Grid item xs={12} sm={12} md={12} lg={2} xl={2}
                  >
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item xs={12} sm={12} md={12} lg={8} xl={8}
                    justifyContent="center"
                    alignItems="center"
                    style={{ paddingBottom: 10 }}
                  >

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                      style={{ paddingBottom: 10 }}
                    >

                      <a style={{ fontWeight: 'bold', fontSize: 15, color: 'green' }}
                        href={"/noticias/" + noticia.categoria.nome_categoria}
                      >
                        {noticia.categoria.nome_categoria}
                      </a>
                      <br></br>

                      <span style={{ fontWeight: 'bold', fontSize: 48, color: 'white' }}>
                        {noticia.titulo}
                      </span>



                    </Grid>


                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    >
                      <br></br>
                      <p >
                        Por:
                        <span style={{ fontWeight: 'bold', fontSize: 15, color: 'green' }}>
                          {" " + noticia.usuario.nome + " " + noticia.usuario.sobrenome + " "}
                        </span>
                        em
                        <span style={{ fontWeight: 'bold', fontSize: 15, color: 'green' }}>
                          {" " + noticia.data_noticia + " "} as {" " + noticia.hora_noticia + "h"}
                        </span>
                      </p>

                    </Grid>



                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={2} xl={2}
                  >
                  </Grid>
                </Grid>
              </div>
            </div>

            <Grid
              container
              direction="row"
              item xs={12} sm={12} md={12} lg={12} xl={12}
              justifyContent="flex-start"
              alignItems="flex-start"
            >



              <Grid item xs={12} sm={12} md={12} lg={8} xl={8}

              >
                <NoticiaItem props={noticia} key={noticia.id_noticia} />

              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} xl={4}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 70 }}

              >
                <Grid item xs={12} sm={12} md={12} lg={11} xl={11}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                  style={{ borderRadius:'10px', backgroundColor:'#D3D3D3' }}
                  >
                    <p  style={{ marginLeft: 30, marginRight: 30, paddingTop: 30 }}>
                      <span style={{fontSize: 22, fontWeight: 'bold' }}> Sobre o Blog:</span>
                    </p>
                    <p style={{ marginLeft: 30, marginRight: 30 }}>
                      <span style={{ fontSize: 22 }}> No Blog da LD Armazéns mantenha se informado com as principais noticias do mundo agro.
                        Saiba tudo o que aconteça nos bastidores do nosso armazém.</span>
                    </p>
                  </Grid>
                  
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                    container
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    style={{ marginTop: 5,  borderRadius:'10px', backgroundColor:'#E0FFFF'}}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
                      container
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    style={{ paddingBottom: 20, paddingTop: 10}}
                    >
                        <span style={{ margin: 10, fontSize: 22, fontWeight: 'bold' }}> Categorias: </span>
                        <br></br>
                    </Grid>
                    {
                        categorias.map((categoria) => (
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                direction="column"
                                container
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                 style={{ marginLeft: 20}}
                            >
                                    <a style={{fontSize: 22, fontWeight: 'bold' }} href={"/noticias/" + categoria.nome_categoria}> {categoria.nome_categoria} </a>
                            </Grid>

                        ))

                    }

                </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>

              </Grid>

            </Grid>
          </div>

        }


      </div>

      <div >
        <Rodape />
      </div>
    </div>
  );
}

export default VizualizarNoticia;