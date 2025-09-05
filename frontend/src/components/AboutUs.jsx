import React from 'react'
import { Book } from 'lucide-react'
import AboutAsset1 from '../Assets/AboutAsset1.jpg'
import AboutAsset2 from '../Assets/AboutAsset2.jpg'
import AboutAsset3 from '../Assets/AboutAsset3.jpg'
import AboutAsset4 from '../Assets/AboutAsset4.jpg'

export default function AboutUs() {

    return (
        <div className='row m-0 p-0 text-center'>
            <div className='col-12 flex-grow-1 d-flex justify-content-center align-items-center py-3 px-5 flex-grow-1'>
                <Book strokeWidth={3} size={36} className=''/>
                <div className='fs-1 text-bottom ps-2'>BookVerse</div>
            </div>
            <div className='col-5 text-center mx-auto'>
                Welcome to BookVerse, your ultimate online destination for books! Whether you're a passionate reader, a student, or someone looking for a perfect gift, we have something for everyone.

                At BookVerse, we believe that books have the power to inspire, educate, and transform lives. That's why we offer a vast collection of titles across various genres, including fiction, non-fiction, academic, self-help, and more.
            </div>
            <div className='fs-4 mt-3 mb-2'>Why Choose Us?</div>
            <div className="container w-50">
                <div className="row row-cols-1 row-cols-md-2 g-1 mx-auto text-white">
                    <div className="col">
                        <div className="feature p-3 rounded" 
                            style={{ 
                                minHeight: '13rem', 
                                backgroundImage: `url(${AboutAsset1})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center',
                                position: 'relative', 
                                color: 'white', // Ensures text is white for contrast
                            }}
                        >
                            <div style={{ 
                                position: 'absolute', 
                                top: 0, left: 0, right: 0, bottom: 0, 
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                                borderRadius: 'inherit'
                            }}></div>

                            <div style={{ position: 'relative', zIndex: 1 }}>  
                                <div className="fs-5 fw-bold">Extensive Collection</div>
                                <p>From timeless classics to the latest bestsellers, we've got it all.</p>
                            </div>
                        </div>

                    </div>
                    <div className="col">
                        <div className="feature p-3 rounded" 
                            style={{ 
                                minHeight: '13rem', 
                                backgroundImage: `url(${AboutAsset2})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center',
                                position: 'relative', 
                                color: 'white', // Ensures text is white for contrast
                            }}
                        >
                            <div style={{ 
                                position: 'absolute', 
                                top: 0, left: 0, right: 0, bottom: 0, 
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                                borderRadius: 'inherit'
                            }}></div>

                            <div style={{ position: 'relative', zIndex: 1 }}>  
                                <div className="fs-5 fw-bold">Affordable Prices</div>
                                <p>Great books at the best prices.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                    <div className="feature p-3 rounded" 
                            style={{ 
                                minHeight: '13rem', 
                                backgroundImage: `url(${AboutAsset3})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center',
                                position: 'relative', 
                                color: 'white', // Ensures text is white for contrast
                            }}
                        >
                            <div style={{ 
                                position: 'absolute', 
                                top: 0, left: 0, right: 0, bottom: 0, 
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                                borderRadius: 'inherit'
                            }}></div>

                            <div style={{ position: 'relative', zIndex: 1 }}>  
                                <div className="fs-5 fw-bold">Seamless Shopping Experience</div>
                                <p>A user-friendly website designed for easy browsing and checkout.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="feature p-3 rounded" 
                            style={{ 
                                minHeight: '13rem', 
                                backgroundImage: `url(${AboutAsset4})`, 
                                backgroundSize: 'cover', 
                                backgroundPosition: 'center',
                                position: 'relative', 
                                color: 'white', // Ensures text is white for contrast
                            }}
                        >
                            <div style={{ 
                                position: 'absolute', 
                                top: 0, left: 0, right: 0, bottom: 0, 
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                                borderRadius: 'inherit'
                            }}></div>

                            <div style={{ position: 'relative', zIndex: 1 }}>  
                                <div className="fs-5 fw-bold">Fast & Reliable Delivery</div>
                                <p>Get your favorite books delivered to your doorstep.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12 fs-5 my-2'>
            Join our community of book lovers and embark on a journey of endless stories, knowledge, and imagination.
            </div>
            <div className='fs-4 my-2'>Discover · Read · Repeat</div>  
        </div>
    )
}
