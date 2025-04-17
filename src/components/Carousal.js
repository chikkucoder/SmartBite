import React from 'react'

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner " id='carousel'>
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success text-black bg-success" type="submit">Search</button>
                        </form>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/023/809/530/small/a-flying-burger-with-all-the-layers-ai-generative-free-photo.jpg" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3PfnSxQV-C8vYvjBqpfsyG5T3ckKpvw5Vpg&s  " className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsGWIaLxtyNCFo1W3_Khd_3Q5EUfaJPLzuTw&s" className="d-block w-100" style={{filter: "brightness(40%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}
