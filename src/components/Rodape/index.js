import React from 'react'
import './styles.scss';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

const Rodape = () => {

    const date = new Date();


    return (
        <div>
            <div className="footer-top-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">


                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <div className="footer-about-us">
                                    <h2><span>LD Armazéns</span></h2>
                                    <p>Aqui na LD Armazéns Atender bem nossos Clientes é nossa prioridade, nosso melhor serviço é
                tratar nosso cliente com todo respeito e dedicação, quer seja na negociação, quer seja em todo o cuidado
                das etapas do beneficiamento dos grãos.</p>
                                   
                                </div>
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <div className="footer-menu">
                                    <h2 className="footer-wid-title">Navegação </h2>
                                    <ul>
                                        <li><a href="/">Início</a></li>
                                        <li><a href="/minhaconta">Minha Conta</a></li>
                                        <li><a href="/sobre">Sobre Nós</a></li>
                                        <li><a href="/localizacao">Onde Estamos</a></li>
                                        <li><a href="/noticias">Notícias</a></li>
                                        <li><a href="/contato">Fale Conosoco</a></li>
                                    </ul>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <div className="footer-menu">
                                    <h2 className="footer-wid-title">Acesso Rápido</h2>
                                    <ul>
                                        <li><a href="/patio">Informaçõs do Pátio</a></li>
                                        <li><a href="/cotacoes">Cotações</a></li>
                                        <li><a href="/status">Status</a></li>
                                    </ul>
                                </div>
                            </Grid>


                        </Grid>


                    </div>
                </div>
            </div>

            <div className="footer-bottom-area">
                <div className="container">
                    <Grid item xs={12} >
                        <div  style={{ textAlign: 'center' }}>
                            <div className="copyright">
                                <p style={{ paddingTop: 20, fontSize: 20 }} >&copy; {moment(date).format("yyyy")} LD Armazéns. Todos os Direitos Reservados Programado <i className="fa fa-heart"></i> por <a href="https://wpexpand.com" target="noopener noreferrer"> titaniwm</a></p>
                                <p style={{ margin: 40 }} />
                                <p style={{ margin: 0 , fontSize: 20}} > Encontre nós na Rodovia MG 188 Km 242, Zona Rural de Guarda-Mor/MG CEP: 38570-000 </p>

                            </div>

                        </div>
                    </Grid>

                </div>
            </div>

        </div>

    )
}
export default Rodape;