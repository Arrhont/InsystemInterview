import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductGroup from './ProductGroup';
import Cart from './Cart';
import GoodRecord from './GoodRecord';
import CartRecord from './CartRecord';

function groupDataGoods(data, names) {
  const goodsWithNames = data.Value.Goods.map(good => [
    good.T.toString(),
    {
      id: good.T.toString(),
      groupId: good.G.toString(),
      name: names[good.G].B[good.T].N,
      quantity: good.P,
      priceUsCents: good.C * 100
    }
  ]);

  const goodsMap = new Map(goodsWithNames);
  const groupArr = Object.entries(names).map(([groupId, groupEntry]) => [
    groupId,
    {
      name: groupEntry.G,
      id: groupId,
      goods: Object.keys(groupEntry.B)
    }
  ]);

  const groupMap = new Map(groupArr);

  return { groupMap, goodsMap };
}

const PRICE_STATE = {
  INCREASED: 'increased',
  DECREASED: 'decreased'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsMap: new Map(),
      groupMap: new Map(),
      cart: new Map(),
      priceState: new Map(),
      usdToRubExchangeRate: 65
    };
  }

  getPriceState = (goodsMap, prevGoodsMap) => {
    const priceState = new Map();
    for (let [goodId, good] of prevGoodsMap) {
      if (good.priceUsCents > goodsMap.get(goodId).priceUsCents) {
        priceState.set(goodId, PRICE_STATE.DECREASED);
      }
      if (good.priceUsCents < goodsMap.get(goodId).priceUsCents) {
        priceState.set(goodId, PRICE_STATE.INCREASED);
      }
    }

    return priceState;
  };

  setStateFromJson = (isFirstLaunch = false) => {
    const datapromise = fetch('./data.json').then(response => {
      return response.json();
    });

    const namesPromise = fetch('./names.json').then(response => {
      return response.json();
    });

    Promise.all([datapromise, namesPromise]).then(([data, names]) => {
      const { goodsMap, groupMap } = groupDataGoods(data, names);

      if (!isFirstLaunch) {
        // goodsMap.get('1').priceUsCents = 1000;
        const priceState = this.getPriceState(goodsMap, this.state.goodsMap);
        this.setState({ priceState });
      }

      this.setState({ goodsMap, groupMap });
    });
  };

  componentDidMount() {
    this.setStateFromJson(true);
    setInterval(this.setStateFromJson, 15 * 1000);
  }

  exchangeRateChange = exchangeRate => {
    this.setState({ usdToRubExchangeRate: exchangeRate });
  };

  addToCart = (goodId, quantity = 1) => {
    const { cart } = this.state;
    const newCart = new Map(cart);
    if (cart.has(goodId)) {
      newCart.set(goodId, cart.get(goodId) + quantity);
    } else {
      newCart.set(goodId, quantity);
    }

    this.setState({ cart: newCart });
  };

  removeFromCart = (goodId, quantity) => {
    const { cart } = this.state;
    const newCart = new Map(cart);

    newCart.set(goodId, cart.get(goodId) - quantity);
    if (newCart.get(goodId) === 0) {
      newCart.delete(goodId);
    }

    this.setState({ cart: newCart });
  };

  getGoodsFromGroup = goodGroup => {
    const goods = goodGroup.goods
      .map(goodId => this.state.goodsMap.get(goodId))
      .filter(Boolean);

    return goods;
  };

  cartArrayFromMap = () => {
    const { goodsMap, groupMap, cart } = this.state;

    return Array.from(cart).map(([goodId, quantity]) => ({
      goodName: goodsMap.get(goodId).name,
      priceUsCents: goodsMap.get(goodId).priceUsCents,
      inStock: goodsMap.get(goodId).quantity,
      groupName: groupMap.get(goodsMap.get(goodId).groupId).name,
      goodId,
      quantity
    }));
  };

  getGoodsPreview = good => {
    const { cart } = this.state;
    const goodQuantityInCart = cart.has(good.id) ? cart.get(good.id) : 0;
    return {
      ...good,
      quantity: good.quantity - goodQuantityInCart
    };
  };

  render() {
    const { groupMap, usdToRubExchangeRate, priceState } = this.state;
    const groupArray = Array.from(groupMap);
    const cartArray = this.cartArrayFromMap();

    return (
      <div className="App">
        <header className="AppHeader">
          <img src={logo} className="AppLogo" alt="logo" />
          Курс доллара:
          <input
            className="ExchangeRate"
            type="number"
            value={usdToRubExchangeRate}
            onChange={event => this.exchangeRateChange(event.target.value)}
          ></input>
        </header>

        <div className="GroceryList">
          {groupArray.map(([groupId, goodGroup]) => {
            const goods = this.getGoodsFromGroup(goodGroup);
            return (
              goods.length > 0 && (
                <ProductGroup
                  key={groupId}
                  groupName={goodGroup.name}
                  id={groupId}
                >
                  {goods.map(good => (
                    <GoodRecord
                      key={good.id}
                      good={this.getGoodsPreview(good)}
                      priceState={priceState.get(good.id)}
                      addToCart={this.addToCart}
                    />
                  ))}
                </ProductGroup>
              )
            );
          })}
        </div>

        <Cart
          cart={cartArray}
          exchangeRate={usdToRubExchangeRate}
        >
          {cartArray.map(cartRecord => (
            <CartRecord
              key={cartRecord.goodId}
              cartRecord={cartRecord}
              exchangeRate={usdToRubExchangeRate}
              addToCart={this.addToCart}
              removeFromCart={this.removeFromCart}
            />
          ))}
        </Cart>
      </div>
    );
  }
}

export default App;
