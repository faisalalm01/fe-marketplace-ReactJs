import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabClickHandler = (tab) => {
    setActiveTab(tab);
  };

  const TabName = ({ tab }) => (
    <button
      className={`${
        activeTab === tab ? "bg-indigo-500 text-white" : "bg-white text-indigo-500"
      } p-4 rounded shadow-md flex items-center justify-center`}
      onClick={() => tabClickHandler(tab)}
    >
      {tab}
    </button>
  );

  const ProductCard = ({ productName, productDescription }) => (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">{productName}</h2>
      <p>{productDescription}</p>
    </div>
  );

  const TabContent = ({ products }) => (
    <div
      className={`${
        activeTab === products.tabName ? "block" : "hidden"
      } shadow-xl border border-gray-100 font-light p-8 rounded text-gray-500 bg-white mt-6`}
    >
      {products.productsList.map((product, index) => (
        <ProductCard
          key={index}
          productName={product.name}
          productDescription={product.description}
        />
      ))}
    </div>
  );

  const tabsData = {
    tab1: {
      tabName: "dikemas",
      productsList: [
        {
          name: "Produk 1",
          description: "Deskripsi produk 1"
        },
        {
          name: "Produk 2",
          description: "Deskripsi produk 2"
        }
      ]
    },
    tab2: {
      tabName: "dikirim",
      productsList: [
        {
          name: "Produk 3",
          description: "Deskripsi produk 3"
        },
        {
          name: "Produk 4",
          description: "Deskripsi produk 4"
        }
      ]
    },
    tab3: {
      tabName: "selesai",
      productsList: [
        {
          name: "Produk 5",
          description: "Deskripsi produk 5"
        },
        {
          name: "Produk 6",
          description: "Deskripsi produk 6"
        }
      ]
    }
  };

  return (
    <div className="p-12 bg-opacity-80 bg-gray-200 ml-60 mt-20">
      <div className="grid grid-cols-3 gap-5">
        <TabName tab="dikemas" />
        <TabName tab="dikirim" />
        <TabName tab="selesai" />
      </div>
      <TabContent products={tabsData.tab1} />
      <TabContent products={tabsData.tab2} />
      <TabContent products={tabsData.tab3} />
    </div>
  );
};

export default Tabs;
