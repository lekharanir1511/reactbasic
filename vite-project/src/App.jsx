// /
// import { useEffect, useState } from 'react';
// import './App.css';

// const App = () => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch(
//           'https://api.nasa.gov/planetary/apod?count=10&api_key=DEMO_KEY'
//         );
//         if (!response.ok) {
//           throw new Error('Unable to fetch images');
//         }
//         const data = await response.json();
//         console.log(response.status);
//         setImages(
//           data.filter((item) => item.media_type === 'image')
//         );
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchImages();
//   }, []);
//   return (
//     <main className="space-page">
//       <h1>NASA Space Gallery</h1>
//       <p className="subtitle">Explore the universe</p>
//       {loading && <p>Loading images...</p>}
//       {error && <p className="error">{error}</p>}

//       <section className="space-list">
//         {images.map((item) => (
//           <article className="space-card" key={item.date}>
//             <img src={item.hdurl || item.url} alt={item.title} />

//             <h2>{item.title}</h2>
//             <p><strong>Date:</strong> {item.date}</p>
//             <p>{item.explanation}</p>

//             <a href={item.hdurl || item.url} target="_blank" rel="noreferrer">
//               View Image
//             </a>
//           </article>
//         ))}
//       </section>
//     </main>
//   );
// };
// export default App;
// import {useState} from "react";
// import Title from "./components/title.jsx";
// function App() {
//   const [count, setCount]=useState(0);
//   return(
//     <>
//     <Title count={count} />
//     <button onClick={() => setCount(count + 1)}>Click me</button>
//     </>
//   );
// }
// export default App;



import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState(0);

  const [form, setForm] = useState({
    author: '',
    imageUrl: '',
    width: '',
    height: '',
  });

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=1&limit=12')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch images');
        }
        return res.json();
      })
      .then((data) => {
        const formattedObj = {
          data,
          status: data.length > 0 ? 200 : 404,
        };

        setImages(formattedObj.data);
        setStatus(formattedObj.status);
      })
      .catch((error) => {
        console.log(error);
        setStatus(404);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.author.trim() || !form.imageUrl.trim()) {
      alert('Please enter the author name and image URL');
      return;
    }

    const newImage = {
      id: Date.now(),
      author: form.author,
      download_url: form.imageUrl,
      url: form.imageUrl,
      width: Number(form.width) || 400,
      height: Number(form.height) || 250,
    };

    setImages((prevImages) => [...prevImages, newImage]);

    setForm({
      author: '',
      imageUrl: '',
      width: '',
      height: '',
    });
  };

  return (
    <div className="gallery-page">
      <h1>🌿 Nature Gallery</h1>
      <p className="subtitle">Explore beautiful photography</p>

      <h2>Add New Image</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="author"
          placeholder="Photographer Name"
          value={form.author}
          onChange={handleChange}
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <input
          name="width"
          type="number"
          placeholder="Image Width"
          value={form.width}
          onChange={handleChange}
        />

        <input
          name="height"
          type="number"
          placeholder="Image Height"
          value={form.height}
          onChange={handleChange}
        />

        <button type="submit">Add Image</button>
      </form>

      <h2>Image Details</h2>

      <p>
        {status === 200
          ? 'Successfully fetched images!'
          : status === 404
          ? 'Images not found!'
          : 'Loading images...'}
      </p>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Photo</th>
            <th>ID</th>
            <th>Photographer</th>
            <th>Width</th>
            <th>Height</th>
            <th>Original Image</th>
          </tr>
        </thead>

        <tbody>
          {images.map((image) => (
            <tr key={image.id}>
              <td>
                <img
                  src={
                    image.download_url ||
                    `https://picsum.photos/id/${image.id}/200/120`
                  }
                  alt={image.author}
                  width="100"
                  height="70"
                  style={{ objectFit: 'cover' }}
                />
              </td>

              <td>{image.id}</td>
              <td>{image.author}</td>
              <td>{image.width}</td>
              <td>{image.height}</td>

              <td>
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <h3>Counter: {counter}</h3>

      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>

      <button onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default App;
