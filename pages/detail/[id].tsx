import TopupForm from "../../components/organisms/TopupForm";
import TopupItem from "../../components/organisms/TopupItem";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/Footer";
// import { useRouter } from "next/router";
import { useEffect } from "react";
import { getDetailVoucher, getFeaturedGame } from "../../services/player";
import { GameItemTypes, NominalsTypes, PaymentTypes } from "../../services/data-types";

interface DetailProps {
  dataItem: GameItemTypes;
  nominals: NominalsTypes[];
  payments: PaymentTypes[];
}

export default function Detail({dataItem, nominals, payments}: DetailProps) {
  useEffect(() => {
    localStorage.setItem("data-item", JSON.stringify(dataItem));
  }, [])

  /** PROSES CLIENT SIDE */

  // const { query, isReady } = useRouter();
  // const [dataItem, setDataItem] = useState({
  //   name: "",
  //   thumbnail: "",
  //   category: {
  //     name: "",
  //   },
  // });

  // const [nominals, setNominals] = useState([]);
  // const [payments, setPayments] = useState([]);

  // const getVoucherDetailAPI = useCallback(async (id) => {
  //   const data = await getDetailVoucher(id);
  //   setDataItem(data.detail);
  //   localStorage.setItem("data-item", JSON.stringify(data.detail));
  //   setNominals(data.detail.nominals);
  //   setPayments(data.payment);
  // }, []);

  // useEffect(() => {
  //   if (isReady) {
  //     getVoucherDetailAPI(query.id);
  //   }
  // }, [isReady]);

  return (
    <>
      <Navbar />
      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">
              Top Up
            </h2>
            <p className="text-lg color-palette-1 mb-0">
              Perkuat akun dan jadilah pemenang
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopupItem data={dataItem} type="mobile" />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              <TopupItem data={dataItem} type="desktop" />
              <hr />
              <TopupForm nominals={nominals} payments={payments} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const data = await getFeaturedGame();
  const paths = data.map((item: GameItemTypes) => ({
    params: {
      id: item._id
    }
  }))

  return {
    paths,
    fallback: false,
  };
}

interface GetStaticProps {
  params: {
    id: string;
  }
}

export async function getStaticProps({params}: GetStaticProps) {
  const {id} = params;
  const data = await getDetailVoucher(id);

  return {
    props: {
      dataItem: data.detail,
      nominals: data.detail.nominals, 
      payments: data.payment
    }
  }
}