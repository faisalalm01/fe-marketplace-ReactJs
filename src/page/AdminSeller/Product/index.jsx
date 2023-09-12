import React from 'react'

const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const token = localStorage.getItem('token'); // Ambil token dari localStorage

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('file', selectedFile);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'access_token': `Bearer ${token}`, // Sertakan token bearer dalam header
        },
      });

      if (response.status === 200) {
        console.log('File dan data berhasil diunggah!');
      } else {
        console.error('Gagal mengunggah file dan data.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };
  return (
    <div>
      <h2>Unggah File dan Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Deskripsi"
          value={formData.description}
          onChange={handleInputChange}
        />
        <button type="submit">Unggah</button>
      </form>
    </div>
  )
}

export default AddProduct