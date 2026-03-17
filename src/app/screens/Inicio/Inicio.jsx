import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Link } from '@react-navigation/native';
import { globalStyles } from "../../styles/globalStyles";
import axios from "axios";
import { useEffect, useState } from "react";
import { BannerTendencias } from "./components/BannerTendencias";
import { NoticiaCard } from "./components/NoticiaCard";
export function Inicio() {

    const [noticiasTrending, setNoticiasTrending] = useState([])
    const [noticiaActual, setNoticiaActual] = useState([
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Kyle Torpey",
            "title": "Bitcoin Crashed 50% in 4 Months. Fidelity Says That’s a Good Thing",
            "description": "Fidelity Digital Assets analysts do see one ray of hope for bitcoin maxis.",
            "url": "https://gizmodo.com/bitcoin-crashed-50-in-4-months-fidelity-says-thats-a-good-thing-2000727284",
            "urlToImage": "https://gizmodo.com/app/uploads/2025/10/bitcoin-explosion-1200x675.jpg",
            "publishedAt": "2026-02-27T15:30:11Z",
            "content": "Bitcoin’s price has taken a beating recently. After reaching a new all-time high above $126,000 in October, the crypto asset fell below $60,000 earlier this month before recovering to trade around $6… [+5115 chars]"
        },
        {
            "source": {
                "id": "the-verge",
                "name": "The Verge"
            },
            "author": "David Morris",
            "title": "Jeffrey Epstein saw promise in Bitcoin — and its far-right supporters",
            "description": "The tranche of Jeffrey Epstein emails and files released on January 30th tie the infamous pedophile, sex trafficker, and influence peddler to elite figures across the tech industry. The world of cryptocurrency is no exception. Epstein's connections are intrig…",
            "url": "https://www.theverge.com/tech/885252/jeffrey-epstein-bitcoin-cryptocurrency-connections",
            "urlToImage": "https://platform.theverge.com/wp-content/uploads/sites/2/2026/02/268350_Did_Jeffrey_Epstein_shape_bitcoin_or_not_understand_it_at_all__CVirginia.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
            "publishedAt": "2026-02-26T22:59:06Z",
            "content": "\u003Cul\u003E\u003Cli\u003E\u003C/li\u003E\u003Cli\u003E\u003C/li\u003E\u003Cli\u003E\u003C/li\u003E\u003C/ul\u003E\r\nJeffrey Epstein saw promise in Bitcoin and its far-right supporters\r\nEpstein may not have fully understood crypto, but he helped shape its culture anyway.\r\nby\r\nD… [+21731 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Kyle Torpey",
            "title": "Disgraced Mt Gox CEO Suggests Bitcoin Hard Fork to Recover $5 Billion in Customer Funds",
            "description": "One critic replied simply \"go away.\"",
            "url": "https://gizmodo.com/disgraced-mt-gox-ceo-suggests-bitcoin-hard-fork-to-recover-5-billion-in-customer-funds-2000728118",
            "urlToImage": "https://gizmodo.com/app/uploads/2026/02/btc-fork-1200x675.jpg",
            "publishedAt": "2026-03-01T10:00:33Z",
            "content": "On Friday, former Mt Gox CEO Mark Karpeles posted on X promoting a pull request he opened on the Bitcoin Core GitHub repository. The request outlined a one-time hard fork to recover roughly 79,956 BT… [+5437 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Kyle Torpey",
            "title": "How the War in Iran Is Hitting Crypto",
            "description": "The \"digital gold\" narrative is getting a stress test.",
            "url": "https://gizmodo.com/how-the-war-in-iran-is-hitting-crypto-2000729067",
            "urlToImage": "https://gizmodo.com/app/uploads/2026/03/iran_tehran_israel-1200x675.jpg",
            "publishedAt": "2026-03-04T20:10:17Z",
            "content": "Many analysts had written off bitcoins digital gold narrative after its poor performance when compared to real, physical gold over the past year or so, but the crypto asset has held up amid the recen… [+4641 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Kyle Torpey",
            "title": "The Two Key Villains of 2022’s Crypto Crash are Trying to Rewrite History",
            "description": "The rot at the heart of crypto in 2022 is now up for debate, as the industry goes through another crash.",
            "url": "https://gizmodo.com/the-two-key-villains-of-2022s-crypto-crash-are-trying-to-rewrite-history-2000727029",
            "urlToImage": "https://gizmodo.com/app/uploads/2026/02/2022-Crypto-Crash-FTX-Terra-1200x675.jpg",
            "publishedAt": "2026-02-26T14:55:02Z",
            "content": "The crypto bubble that inflated through 2021 burst in 2022 with two defining failures.\r\nIn May, Terraform Labs algorithmic stablecoin UST lost its $1 peg, eventually leading to hyperinflation of the … [+6387 chars]"
        },
    ])
    /*    useEffect(() => {
            function obtenerNoticias() {
                axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=e40831872b2d4868aee6e2a4ba34a15e")
                .then(response => {
                    setNoticiasTrending(response.data.articles)
                })
            }
            obtenerNoticias()
        }, [])*/


    return (
        <ScrollView style={styles.pantalla}>
            <BannerTendencias noticias={noticiaActual} />


            <View style={{ margin: 20, justifyContent: "center" }}>
                <TouchableOpacity>
                    <Link style={[globalStyles.botonOscuro]}>Nuestras fuentes</Link>
                </TouchableOpacity>
            </View>

            <View style={{ margin: 20, justifyContent: "center" }}>
                <TouchableOpacity>
                    <Link style={[globalStyles.botonOscuro]}>Seguidos</Link>
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.carrusel}>
                    <Text style={globalStyles.titulo}>Entretenimiento</Text>
                    <Link style={globalStyles.redirecciones}>
                        <Text>Ver más</Text>
                    </Link>
                </View>
                <ScrollView horizontal>
                    {noticiaActual.map((noticia, index) => (
                        <NoticiaCard noticia={noticia} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View>
                <View style={styles.carrusel}>
                    <Text style={globalStyles.titulo}>Negocio</Text>
                    <Link style={globalStyles.redirecciones}>
                        <Text>Ver más</Text>
                    </Link>
                </View>
                <ScrollView horizontal>
                    {noticiaActual.map((noticia, index) => (
                        <NoticiaCard noticia={noticia} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View>
                <View style={styles.carrusel}>
                    <Text style={globalStyles.titulo}>Tecnología</Text>
                    <Link style={globalStyles.redirecciones}>
                        <Text>Ver más</Text>
                    </Link>
                </View>
                <ScrollView horizontal>
                    {noticiaActual.map((noticia, index) => (
                        <NoticiaCard noticia={noticia} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View>
                <View style={styles.carrusel}>
                    <Text style={globalStyles.titulo}>Deporte</Text>
                    <Link style={globalStyles.redirecciones}>
                        <Text>Ver más</Text>
                    </Link>
                </View>
                <ScrollView horizontal>
                    {noticiaActual.map((noticia, index) => (
                        <NoticiaCard noticia={noticia} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View>
                <View style={styles.carrusel}>
                    <Text style={globalStyles.titulo}>Ciencia</Text>
                    <Link style={globalStyles.redirecciones}>
                        <Text>Ver más</Text>
                    </Link>
                </View>
                <ScrollView horizontal>
                    {noticiaActual.map((noticia, index) => (
                        <NoticiaCard noticia={noticia} key={index} />
                    ))}
                </ScrollView>
            </View>

            <View>
                <View style={styles.carrusel}>
                    <Text style={globalStyles.titulo}>Salud</Text>
                    <Link style={globalStyles.redirecciones}>
                        <Text>Ver más</Text>
                    </Link>
                </View>
                <ScrollView horizontal>
                    {noticiaActual.map((noticia, index) => (
                        <NoticiaCard noticia={noticia} key={index} />
                    ))}
                </ScrollView>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    carrusel: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10
    },
    pantalla: {
    }
})