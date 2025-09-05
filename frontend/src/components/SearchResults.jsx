import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../ContextApi/UserContext';

export default function SearchResults() {
  const [data, setData] = React.useState([])

  const navigate = useNavigate()
  const key = process.env.REACT_APP_BOOKS_API;

  const {input, selectValue} = useContext(UserContext)

  function generateConsistentCost(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0; 
    }
    const minCost = 200;
    const maxCost = 400;
    const price = minCost + (Math.abs(hash) % (maxCost - minCost + 1));
    return price;
  }

  const getBooks = async ()=>{
    const inp = input.trim().replace(/\s+/g, '+');
    const query = 
      `https://www.googleapis.com/books/v1/volumes?q=` +
      `${selectValue.value === 'All' ? `intitle:${inp}` : ''}` +
      `${selectValue.value === 'Book' ? `intitle:${inp}` : ''}` +
      `${selectValue.value === 'Author' ? `+inauthor:${inp}` : ''}` +
      `${selectValue.value === 'Genre' ? `+subject:${inp}` : ''}` +
      `&key=${key}&maxResults=30&orderBy=${selectValue.value === 'Genre'?'newest':'relevance'}`;

    const res = await fetch(query)
    const books = await res.json();
    if (books && books.items) {
      console.log(books)
      const formattedData = books.items
            .filter(item=>item.volumeInfo.imageLinks?.thumbnail)
            .map(item => ({
                bookId: item.id,
                bookName: item.volumeInfo.title || "Unknown Title",
                subtitle: item.volumeInfo.subtitle || 'Unknown Subtitle',
                authorName: item.volumeInfo.authors ? item.volumeInfo.authors[0] : "Unknown Author",
                image: item.volumeInfo.imageLinks?.thumbnail || "default_image_url",
                description: item.volumeInfo?.description || 'Unknown description',
                category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown',
                rating: item.volumeInfo.averageRating || 4,
                language: item.volumeInfo.language,
                pageCount: item.volumeInfo.pageCount==0? 'Unknown': item.volumeInfo.pageCount,
                publisher: item.volumeInfo.publisher || 'Unknown publisher',
                publishedDate: item.volumeInfo.publishedDate,
                price: generateConsistentCost(item.id)
            }));

      setData(formattedData);
    } else {
      console.log("No books found");
    }
  }

  React.useEffect(()=>{
    getBooks()
  }, [input, selectValue])


  return (
    <div className='container py-4'>
      {input !== '' && <h4 className='text-center mb-4'>Results for "{input}"</h4>}
      <div className='d-flex flex-wrap justify-content-center'>
        {data.map((item, i) => (
          <div 
            className='card m-3 p-0 shadow-lg border-0 rounded-3 overflow-hidden book-card' 
            style={{ width: '16rem', minHeight: '30rem', backgroundColor: '#F5E6CC', transition: 'transform 0.3s ease' }}
            key={i}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{ height: '20rem', overflow: 'hidden' }}>
              <img 
                src={item.image} 
                className="card-img-top img-fluid" 
                alt={item.bookName} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onClick={() => navigate(`/bookverse/explore/${item.bookName}`, { state: { book: item }})}
              />
            </div>
            <div className='card-body p-3 d-flex flex-column justify-content-between'>
              <div>
                <h5 className='card-title text-dark fw-bold'>{item.bookName}</h5>
                <p className='card-text text-muted small'>By: {item.authorName}</p>
                <p className='badge bg-secondary text-wrap'>{item.category}</p>
                <br />
                {
                  item.rating>0 &&  
                  <p className='badge bg-secondary text-wrap'>{'⭐'.repeat(item.rating)}</p>
                }
              </div>
              <div className='d-flex justify-content-between align-items-center mt-3'>
                <div className='fs-4 fw-bold text-danger'>₹ {item.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
