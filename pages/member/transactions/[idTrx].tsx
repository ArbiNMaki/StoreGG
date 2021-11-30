import TransactionsDetailContent from '../../../components/organisms/TransactionDetailContent';
import { HistoryTransactionTypes, JWTPayloadTypes, UserTypes } from '../../../services/data-types';
import jwt_decode from 'jwt-decode';
import { getTransactionDetail } from '../../../services/member';

interface TransactionsDetailProps {
  transactionDetail: HistoryTransactionTypes
}

export default function TransactionsDetail(props: TransactionsDetailProps) {
  const {transactionDetail} = props;

  return (
    <section className="transactions-detail overflow-auto">
      <TransactionsDetailContent data={transactionDetail} />
    </section>
  );
}


interface getServerSideProps {
  req: {
    cookies: {
      token: string;
    }
  },
  params: {
    idTrx: string
  }
}

export async function getServerSideProps({ req, params }: getServerSideProps) {
  const {idTrx} = params
  
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwt_decode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  const response = await getTransactionDetail(idTrx, jwtToken)
  
  return {
    props: {
      transactionDetail: response.data
    },
  };
}
