import './App.css';
import Home from './Screens/Home/Home';

function App() {
  return (
    <Home/>
  );
}

export default App;


// import React, { useState } from 'react';

// function App() {
//   const [image, setImage] = useState(null);

//   const handleImageChange = (event) => {
//     const selectedImage = event.target.files[0];
//     const imageUrl = URL.createObjectURL(selectedImage);
//     setImage(imageUrl);
//     console.log('imageUrl',imageUrl)
//   };

//   return (
//     <div>
//       <h2>Image Uploader</h2>
//       <input type="file" onChange={handleImageChange} />
//       {image && (
//         <div>
//           <h3>Preview:</h3>
//           <img src={image} alt="Uploaded" style={{ maxWidth: '300px' }} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { Upload, Image } from 'antd';
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = (error) => reject(error)
//   })

// const App = () => {
//   const [fileList, setFileList] = useState([]);
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const onChange = async (info) => {
//     const { fileList: newFileList } = info;

//     if (newFileList.length > 0) {
//       const file = newFileList[0];
//       file.base64 = await getBase64(file?.originFileObj);
//       setFileList([file]); // Set fileList with only the uploaded file
//       setUploadedImage(file.base64); // Set uploaded image URL
//       console.log('Uploaded Image URL:', file.base64); // Log URL to console
//     }
//   };

//   return (
//     <Upload
//       onChange={onChange}
//       showUploadList={false}
//       className='upload_main_div'
//       accept='image/*' // Accept only image files
//     >
//       {uploadedImage ? (
//         <Image src={uploadedImage} width={100} />
//       ) : (
//         <button>Upload Image</button>
//       )}
//     </Upload>
//   );
// };

// export default App;
