import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  //const [restInfo, setRestInfo] = useState(null);

  const { resId } = useParams();
  console.log(resId);

  const restInfo = useRestaurantMenu(resId);
  console.log(restInfo);

  /*useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_API_URL + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );

    const json = await data.json();
    console.log(json);
    setRestInfo(json.data);
  };*/

  if (restInfo === null) return <Shimmer />;

  //name of resturant,cuisines types and price
  const { name, cuisines, costForTwoMessage } =
    restInfo?.cards[0]?.card?.card?.info;

  //menulist for each restaurant
  const { itemCards } =
    restInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;

  //console.log(itemCards);

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>

      <ul>
        {itemCards.map((itemCard) => (
          <li key={itemCard.card.info.id}>
            {itemCard.card.info.name} -{" "}
            {"₹" +
              (itemCard.card.info.price / 100 ||
                itemCard.card.info.defaultPrice / 100)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
