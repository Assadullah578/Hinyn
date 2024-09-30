import Head from 'next/head';
import Header from '../components/section/Header';
import Main from '../components/section/Main';
import Footer from '../components/section/Footer';
import { useEffect, useState } from 'react';
import { getCategories } from '../components/forms/formService';

export { getServerSideProps } from '../src/store';

const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((result) => {
      if (result?.data) {
        setCategories(() => []);
        result?.data?.data.map((item) => {
          let temp = { id: item.id };
          setCategories((prev) => prev.concat({ ...item.attributes, ...temp }));
        });
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>Home App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header categories={categories} />
      <Main categories={categories} />
      <Footer />
    </>
  );
};

export default Home;
