import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_TallHero_Gamers_en_US_1x._CB667161802_.jpg" alt="" />
                <div className="home__row">
                    <Product id={1} title="The Lean Startup" price={14.44} image="https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UY327_FMwebp_QL65_.jpg" rating={4} />
                    <Product id={2} title="Mixer" price={22.04} image="https://m.media-amazon.com/images/I/61V5bYIh0XL._QL65_AC_UL640_.jpg" rating={5} />
                </div>
                <div className="home__row">
                    <Product id={3} title="Juicer" price={34.44} image="https://m.media-amazon.com/images/I/7155EbXa3XL._QL65_AC_UL640_.jpg" rating={4} />
                    <Product id={4} title="Microwave" price={44.44} image="https://m.media-amazon.com/images/I/71TQwLgWoqL._QL65_AC_UL640_.jpg" rating={3} />
                    <Product id={5} title="Thermometer Gun" price={10.44} image="https://m.media-amazon.com/images/I/61QrQrH7tHL._AC_UL480_FMwebp_QL65_.jpg" rating={5} />
                </div>
                <div className="home__row">
                    <Product id={6} title="Samsung curved LED" price={144.44} image="https://m.media-amazon.com/images/I/91+fneWO62L._AC_UY327_FMwebp_QL65_.jpg" rating={4} />

                </div>
            </div>
        </div>
    )
}

export default Home
