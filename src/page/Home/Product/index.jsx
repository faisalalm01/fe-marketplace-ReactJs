import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../store/action';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../../../components/CardProduct/CardProduct';
import { formatRupiah } from '../../../utils';
import Pagination from '../../../components/Pagination';
import axios from 'axios';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Product } = useSelector((state) => state);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   getDataProduct();
  // }, []);
  // const getDataProduct = () => {
  //   dispatch(getAllProduct());
  // };

  // useEffect(() => {
  //   getDataProduct();
  // }, []);

  // useEffect(() => {
  //   if (Product.dataProduct.length >= 0) {
  //     setProducts(Product.dataProduct);
  //   } else {
  //     setProducts([]);
  //   }
  // }, [Product.dataProduct]);

  // const handleButtonClick = () => {
  //   console.log('Button clicked', Product.dataProduct.map((e, i) => {
  //     return {}
  //   }));
  // };
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // if (searchTerm === '') {
      //   // Jika kata kunci kosong, kosongkan hasil pencarian
      //   setData([]);
      //   return;
      // }
      try {
        const response = await
        axios.get(import.meta.env.VITE_BASE_URL + `product/list?page=${currentPage}&limit=${limit}&search=${searchTerm}`)
        // const response = await axios.get(
        //   `https://api.example.com/data?page=${currentPage}`
        // );
        setData(response.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
console.log(data);
  return (
    <>
    <div className="text-center pt-7">
     <input
     className="border border-gray-500  px-5 py-1 w-80 rounded-lg"
        type="text"
        placeholder="Cari Produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
    <div className="md:gap-5 mx-2 md:mx-44 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-10">
      {data &&
        data?.data?.map((item) => (
          // <div key={item.id}>
          <CardProduct
            key={item.id}
            image={item.image}
            id={item.id}
            title={item.title}
            price={
              item.price === null || item.price === 0
                ? "Free"
                : `${formatRupiah(item.price)},-`
            }
            description={item.description}
            onClick={() => {
              navigate(`/product/detail/${item.id}`);
            }}
          />
          // </div>
        ))}
        <p></p>
    </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        />
    </>
    // </section>
  )
}

export default Product
