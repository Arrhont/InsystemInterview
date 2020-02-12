import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductGroup from './ProductGroup';
import Cart from './Cart';
import GoodRecord from './GoodRecord';

function groupDataGoods(data, names) {
  // const groupedGoods = [];
  // const groupIdToIndexMap = {};

  // Object.entries(names).forEach(([groupId, group], index) => {
  //   groupedGoods.push({ groupName: group.G, id: groupId, content: [] });
  //   groupIdToIndexMap[groupId] = index;
  // });

  // const { Value: { Goods: goods } } = data;

  // goods.forEach(good => {
  //   const { P: quantity, C: priceUsd, T: goodId, G: groupId } = good;
  //   const groupIndex = groupIdToIndexMap[groupId];
  //   const name = names[groupId].B[goodId].N;
  //   groupedGoods[groupIndex].content.push({ name, quantity, priceUsd });
  // });

  // return groupedGoods.filter((elem) => elem.content.length);

  const goodsWithNames = data.Value.Goods.map(good => [
    good.T.toString(),
    {
      id: good.T.toString(),
      groupId: good.G.toString(),
      name: names[good.G].B[good.T].N,
      quantity: good.P,
      priceUsd: good.C
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsMap: new Map(),
      groupMap: new Map(),
      cart: new Map(),
      usdToRubExchangeRate: 65
    };
  }

  componentDidMount() {
    const datapromise = fetch('./data.json').then(response => {
      return response.json();
    });

    const namesPromise = fetch('./names.json').then(response => {
      return response.json();
    });

    Promise.all([datapromise, namesPromise]).then(([data, names]) => {
      const { goodsMap, groupMap } = groupDataGoods(data, names);
      this.setState({ goodsMap, groupMap });
    });
  }

  exchangeRateChange = exchangeRate => {
    this.setState({ usdToRubExchangeRate: exchangeRate });
  };

  addToCart = (goodId, quantity = 1) => {
    const { goodsMap, cart } = this.state;
    const newCart = new Map(cart);
    if (cart.has(goodId)) {
      newCart.set(goodId, cart.get(goodId) + quantity);
    } else {
      newCart.set(goodId, quantity);
    }

    const newGoodsMap = new Map(goodsMap);
    const newGood = { ...newGoodsMap.get(goodId) };
    newGood.quantity -= quantity;
    newGoodsMap.set(goodId, newGood);

    this.setState({ goodsMap: newGoodsMap, cart: newCart });
  };

  removeFromCart = (goodId, quantity) => {
    const { goodsMap, cart } = this.state;
    const newCart = new Map(cart);

    newCart.set(goodId, cart.get(goodId) - quantity);
    if (newCart.get(goodId) === 0) {
      newCart.delete(goodId);
    }

    const newGoodsMap = new Map(goodsMap);
    const newGood = { ...newGoodsMap.get(goodId) };
    newGood.quantity += quantity;

    newGoodsMap.set(goodId, newGood);

    this.setState({ goodsMap: newGoodsMap, cart: newCart });
  };

  getGoodsFromGroup = goodGroup => {
    const goods = goodGroup.goods
      .map(goodId => this.state.goodsMap.get(goodId))
      .filter(Boolean);

    return goods;
  };

  cartArrayFromMap = () => {
    const { goodsMap, cart } = this.state;

    return Array.from(cart).map(([goodId, quantity]) => ({
      goodName: goodsMap.get(goodId).name,
      priceUsd: goodsMap.get(goodId).priceUsd,
      goodId,
      quantity
    }));
  };

  render() {
    const groupArray = Array.from(this.state.groupMap);
    console.log(this.state);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Курс доллара:
          <input
            type="number"
            value={this.state.usdToRubExchangeRate}
            onChange={event => this.exchangeRateChange(event.target.value)}
          ></input>
        </header>

        <div className="Grocery-list">
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
                      good={good}
                      addToCart={this.addToCart}
                    />
                  ))}
                </ProductGroup>
                
              )
            );
          })}
        </div>

        <Cart
          className="Cart-list"
          cart={this.cartArrayFromMap()}
          exchangeRate={this.state.usdToRubExchangeRate}
          removeFromCart={this.removeFromCart}
        />
      </div>
    );
  }
}

export default App;
