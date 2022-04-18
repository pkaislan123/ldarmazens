import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import Carousel from 'react-bootstrap/Carousel'
import { useParams } from "react-router-dom";
import RodapeBlog from '../../components/RodapeBlog';
import Pagination from '@material-ui/lab/Pagination';


const Blog = () => {

  const { categoria } = useParams();
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState([]);
  const [ultimasNoticias, setUltimasNoticias] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [parametros, setParametros] = useState(
    {
      categoria: "",
      page: 0,
      size: 8,
    }
  );

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


  /*
 <BlogPage1
          titulo={props.titulo}
          subtitulo={props.sub_titulo}
          data={props.data_noticia}
          hora={props.hora_noticia + "h"}
          redator={props.usuario.nome + " " + props.usuario.sobrenome}

          img1={props.url_img1}
          video1={props.url_video1}
          texto1={props.texto1}

          citacao={props.citacao}

          img2={props.url_img2}
          video2={props.url_video2}
          texto2={props.texto2}


          img3={props.url_img3}
          video3={props.url_video3}
          texto3={props.texto3}


        />
  */

  const handleChangePage = (event, value) => {

    setPage(value);
    let num_pagina = parseInt(value) - 1;
    console.log("numero da pagina: " + num_pagina)
    setParametros(prevState => ({ ...prevState, 'page': num_pagina }))

  };


  useEffect(() => {

    async function listarNoticias() {
      try {


        const response = await api.get('/v1/protected/noticias/listarNoticias', {
          params: {
            page: parametros.page,
            size: parametros.size,
            categoria: categoria,
          }
        });
        setNoticias(response.data.content);
        setTotalPages(response.data.totalPages);

        setUltimasNoticias(response.data.content.slice(0, 3));
        //console.log("noticia 1: " + noticias[0].id_noticia)

        setLoading(false);

      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar noticias: " + _err)

      }

    }

    checkDimenssoes();
    listarNoticias();


  }, [parametros,categoria]);


  return (
    <div >
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",


      }} >

        <Navegador noticias={'underline'} />

        <div style={{ height: 5, backgroundColor: '#808080' }}>
        </div>
      </div>



      <Grid
        container
        direction="row"
        item xs={12} sm={12} md={12} lg={12} xl={12}
        justifyContent="center"
        alignItems="center"
      >

        {loading ?
          <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
          </Skeleton> :
          <Carousel interval={5000} fade style={{ width: '100%' }}>
            {
              ultimasNoticias.map((noticia) => (
                <Carousel.Item key={noticia.id_noticia}
                >
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
                            style={{ paddingBottom: 10, height: 250, minHeight: 250, maxHeight: 250 }}
                          >

                            <a style={{ fontWeight: 'bold', fontSize: 15, color: 'green' }}
                              href={"/noticias/" + noticia.categoria.nome_categoria}
                            >
                              {noticia.categoria.nome_categoria}
                            </a>
                            <br></br>
                            <a
                              href={"/noticias/" + noticia.data_noticia + "/" + encodeURIComponent(noticia.titulo) + "/" + noticia.id_noticia}>
                              <span style={{ fontWeight: 'bold', fontSize: 48, color: 'white' }}>
                                {noticia.titulo}
                              </span>

                            </a>

                          </Grid>

                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{ height: 150, minHeight: 150, maxHeight: 150 }}
                          >
                            <span style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
                              {noticia.sub_titulo}-...
                            </span>
                          </Grid>



                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={2} xl={2}
                        >
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Carousel.Item>
              ))
            }
          </Carousel>
        }

        <span style={{ paddingTop: 20, paddingBottom: 20, width: '100%', fontWeight: 'bold', color: 'black', textAlign: 'center', fontSize: 36, textDecoration: 'underline' }} > Blog da LD Armazéns</span>

        <Grid
          container
          direction="row"
          item xs={12} sm={12} md={12} lg={12} xl={12}
          justifyContent="center"
          alignItems="center"
          style={{ marginLeft: 20, marginRight: 20, paddingTop: 5, paddingBottom: 10, textDecoration: 'underline', color: 'green' }}
        >

          <a
            href={"/noticias/ldarmazens"}>
            <span style={{ paddingLeft: 10, paddingRight: 10, width: '100%', textAlign: 'center', fontSize: 16 }} > Informativos da LD Armazém</span>
          </a>

          <a
            href={"/noticias/tecnologia"}>
            <span style={{ paddingLeft: 10, paddingRight: 10, width: '100%', textAlign: 'center', fontSize: 16 }} > Tecnologia</span>
          </a>

          <a
            href={"/noticias/fertilizantes"}>
            <span style={{ paddingLeft: 10, paddingRight: 10, width: '100%', textAlign: 'center', fontSize: 16 }} > Fertilizantes</span>
          </a>

          <a
            href={"/noticias/pecuaria"}>
            <span style={{ paddingLeft: 10, paddingRight: 10, width: '100%', textAlign: 'center', fontSize: 16 }} > Pecuária</span>
          </a>

          <a
            href={"/noticias/agronecio"}>
            <span style={{ paddingLeft: 10, paddingRight: 10, width: '100%', textAlign: 'center', fontSize: 16 }} > Agronegócio</span>
          </a>


          <a
            href={"/noticias/commodities"}>
            <span style={{ paddingLeft: 10, paddingRight: 10, width: '100%', textAlign: 'center', fontSize: 16 }} > Soja, Milho e Sorgo</span>
          </a>


        </Grid>


      </Grid>

      <div>
        {loading ?
          <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
          </Skeleton>
          :
          <div>


            <Grid
              container
              direction="row"
              item xs={12} sm={12} md={12} lg={12} xl={12}
              justifyContent="flex-start"
              alignItems="flex-start"
              style={{ paddingTop: 30 }}
            >
              <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={10} xl={10}
                container
              >

                {
                  noticias.map((noticia) => (

                    <Grid
                      key={noticia.id_noticia}
                      container
                      direction="column"
                      item xs={12} sm={6} md={4} lg={3} xl={3}
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      style={{ padding: 10 }}
                    >

                      <img alt="img1" style={{ width: '100%', height: 200, borderRadius: '10px' }}

                        src={noticia.url_capa}
                      />
                      <a style={{ textAlign: 'justify', fontSize: 14, lineHeight: '20px', color: 'green', fontWeight: 'bold' }} href={"/noticias/" + noticia.categoria.nome_categoria}>{noticia.categoria.nome_categoria}</a>
                      <p style={{ margin: 5 }} />
                      <a style={{ textAlign: 'justify', fontSize: 18, lineHeight: '20px', color: 'black', fontWeight: 'bold' }} href={"/noticias/" + noticia.data_noticia + "/" + encodeURIComponent(noticia.titulo) + "/" + noticia.id_noticia} >{noticia.titulo}</a>
                      <p style={{ margin: 5 }} />
                      <span style={{ fontSize: 16 }} > Em {noticia.data_noticia} {noticia.hora_noticia} </span>

                    </Grid>
                  ))
                }
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={1} xl={1} >
              </Grid>

            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} 
               container
               direction="row"
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

           
          </div>

        }


      </div>
      <div>
        <RodapeBlog />
      </div>
      <div >
        <Rodape />
      </div>
    </div >
  );
}

export default Blog;