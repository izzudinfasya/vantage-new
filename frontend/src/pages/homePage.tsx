import React, { useState } from "react";
import { Layout } from "antd";
import ModalPromo from "../components/modalPromo";
import EmailSubscriptionModal from "../components/emailSubs";
import ProductCategories from "../components/productCategories";
import CarouselCustom from "../components/carouselCustom";
import BannerPromo from "../components/bannerPromo";

import newArrivalImage from "../assets/noimage.jpg";
import collectionImage from "../assets/noimage.jpg";
import bestsellerImage from "../assets/noimage.jpg";
import ProductInterest from "components/productInterest";

const { Content } = Layout;

const HomePage: React.FC = () => {
  const [isModalSubsOpen, setIsModalSubsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalSubsOpen(false);
  };

  return (
    <Layout>
      {/* Tampilkan modal */}
      {isModalSubsOpen && <EmailSubscriptionModal onClose={handleModalClose} />}

      {/* Tampilkan modal */}
      {isModalOpen && <ModalPromo onClose={handleModalClose} />}

      {/* Section Carousel */}
      <CarouselCustom />

      {/* Section Product Categories */}
      <Content>
        <div
          style={{
            marginTop: "80vh",
            zIndex: 2,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <ProductCategories
            newArrivalImage={newArrivalImage}
            bestsellerImage={bestsellerImage}
            collectionImage={collectionImage}
          />
        </div>
      </Content>

      <ProductInterest />

      {/* Section Banner Promo */}
      <Content>
        <div
          style={{
            zIndex: 2,
            position: "relative",
            backgroundColor: "#fff",
          }}
        >
          <BannerPromo />
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
