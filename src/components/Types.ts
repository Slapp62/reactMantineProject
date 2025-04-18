
export type Tcards = {
    _id: number;
    title: string;
    subtitle: string;
    description: string;
    phone: number;
    email: string;
    web: string;
    image: {
      url:string;
      _id: number;
    }
};

export type TPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export type TUsers = {
  _id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
    _id: string;
  };
  phone: string;
  email: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip?: number;
    _id: string;
  };
  isAdmin: boolean;
  isBusiness: boolean;
  createdAt: string;
};

// export const cardData: Tcards[] = 
//     const [cards, setCards] = useState<Tcards[]>([]);

//   const getCards = async () => {
//     const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
//     setCards(response.data);
//   }

//   useEffect(() => {
//     getCards();
//   }, [cards])