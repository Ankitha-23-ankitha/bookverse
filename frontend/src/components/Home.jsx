import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../ContextApi/UserContext'
import AuthorData from '../Assets/AuthorData'
import GenreData from '../Assets/GenreData'
import Hero from '../Assets/Hero.webp'
import { MoveRight } from 'lucide-react'
import LowPrice from '../Assets/LowPrice.png'
import FreeDelivery from '../Assets/FreeDelivery.png'
import FastDelivery from '../Assets/FastDelivery.png'
import EasyReturn from '../Assets/EasyReturn.png'
import RollingGallery from './RollingGallery'


export default function Home() {

  const navigate = useNavigate()
  const {setInput, setSelectValue} = useContext(UserContext)

  React.useEffect(()=>{
    setInput('')
    setSelectValue({value: 'All', label: 'All'})
  }, [])

  return (
    <div className="container-fluid px-5 py-4">
      <div className="row align-items-center" style={{ minHeight: "80vh" }}>
        <div className="col-lg-6 col-md-12 d-flex flex-column justify-content-center text-center text-lg-start fs-3 gap-2">
          <div className="fs-3 fw-bold">Discover the Joy of Reading!</div>
          <div className="fs-5 fw-semibold">
            Explore a vast collection of books across genres. Whether you're looking for timeless classics, thrilling mysteries, or inspiring self-help guides, we have it all.
          </div>
          <div className="exploreBtn d-inline-block px-4 py-2 fs-5 rounded fw-semibold mt-2" style={{ width: "fit-content" }} onClick={() => navigate("/bookverse/explore")}>
            Explore <MoveRight />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <img src={Hero} className="img-fluid rounded" style={{ maxHeight: "80vh" }} />
        </div>
      </div>

      <div className="row text-center my-4">
        <div className="col-6 col-md-3 features">
          <img src={FastDelivery} className="img-fluid" style={{ width: "3rem" }} />
          <div className="fs-5">Faster delivery</div>
        </div>
        <div className="col-6 col-md-3 features">
          <img src={LowPrice} className="img-fluid" style={{ width: "3rem" }} />
          <div className="fs-5">Low prices</div>
        </div>
        <div className="col-6 col-md-3 features mt-3 mt-md-0">
          <img src={FreeDelivery} className="img-fluid" style={{ width: "3.5rem" }} />
          <div className="fs-5">Free shipping</div>
        </div>
        <div className="col-6 col-md-3 features mt-3 mt-md-0">
          <img src={EasyReturn} className="img-fluid" style={{ width: "3rem" }} />
          <div className="fs-5">Easy returns</div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12 text-center p-4 fs-4">Explore by Genres</div>
        {GenreData.map((genre, i) => (
          <div className="col-6 col-md-4 col-lg-2 mb-3" key={i}>
            <div className="card p-2" style={{ height: "18rem", backgroundColor: "#faedcd", border: "none" }} onClick={() => {
                setInput(genre.name);
                setSelectValue({ value: "Genre", label: "Genre" });
              }}>
              <div style={{ position: "relative", height: "100%", paddingTop: "100%" }}>
                <img src={genre.image} className="card-img-top img-fluid" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="card-body py-3 p-0 pt-2">
                <div className="card-text text-center text-truncate fs-5">{genre.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="row my-4">
        <div className="col-12 text-center fs-4 p-3">Read from THE BEST Authors</div>
        {AuthorData.map((author, i) => (
          <div className="col-6 col-md-4 col-lg-2 mb-3" key={i}>
            <div className="card p-2" style={{ height: "20rem", border: "none", backgroundColor: "#faedcd" }} onClick={() => {
                setInput(author.name);
                setSelectValue({ value: "Author", label: "Author" });
              }}>
              <div style={{ position: "relative", height: "100%", paddingTop: "100%" }}>
                <img src={author.image} className="card-img-top img-fluid" alt="" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="card-body py-3 p-0 pt-2">
                <div className="card-text text-center text-truncate fs-5">{author.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="row w-100">
        <div className="col-12 text-center fs-4 p-3">Hear from our customers</div>
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </div>
    </div>
  )
}