import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductGroup from './ProductGroup';
import Cart from './Cart';

function groupDataGoods(data, names) {
  const groupedGoods = [];
  const groupIdToIndexMap = {};

  Object.entries(names).forEach(([groupId, group], index) => {
    groupedGoods.push({ groupName: group.G, id: groupId, content: [] });
    groupIdToIndexMap[groupId] = index;
  });

  const { Value: { Goods: goods } } = data;

  goods.forEach(good => {
    const { P: quantity, C: priceUsd, T: goodId, G: groupId } = good;
    const groupIndex = groupIdToIndexMap[groupId];
    const name = names[groupId].B[goodId].N;
    groupedGoods[groupIndex].content.push({ name, quantity, priceUsd });
  });

  return groupedGoods.filter((elem) => elem.content.length);
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      cart: [],
      usdToRubExchangeRate: 65,
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
      this.setState({ productData: groupDataGoods(data, names) });
    });
  }

  getGroupIdByName = (productName) => {
    const groupId = this.state.productData.find((elem) => elem.content.find((elem) => elem.name === productName)).id;
    return groupId;
  }

  getPriceByName = (productName) => {
    let price = 'Cannot find price for product';
    this.state.productData.find((elem) => elem.content.find((elem) => {
      price = elem.priceUsd;
      return (elem.name === productName)}));

    return price;
  }

  addToCart = (productName, quantity = 1) => {

    const groupId = this.getGroupIdByName(productName);
    const priceUsd = this.getPriceByName(productName);
    const currentGroup = this.state.productData.find((elem) => elem.id === groupId);
    const groupIndex = this.state.productData.findIndex((elem) => elem.id === groupId);

    const productIndex = currentGroup.content.findIndex((elem) => elem.name === productName);
    currentGroup.content[productIndex].quantity -= quantity;
    const newProductData = this.state.productData.slice();
    newProductData.splice(groupIndex, 1, currentGroup);
    
    const cart = this.state.cart.slice();
    const currentProductInCart = cart.find((elem) => elem.productName === productName);
    const isInCart = !!currentProductInCart;
    
    if (isInCart) {
      const index = cart.findIndex((elem) => elem.productName === productName);
      cart[index].quantity += 1;
    } else {
      cart.push({ productName, priceUsd, quantity, groupId })
    }
    console.log(cart)
    this.setState({ productData: newProductData, cart: cart });
  }

  removeFromCart = (productName, quantity) => {
    const groupId = this.getGroupIdByName(productName);
    const newCart = this.state.cart.slice();
    const removingItemIndex = newCart.indexOf((elem) => elem.productName === productName);
    newCart.splice(removingItemIndex, 1);

    const currentGroup = this.state.productData.find((elem) => elem.id === groupId);
    const groupIndex = this.state.productData.findIndex((elem) => elem.id === groupId);

    const productIndex = currentGroup.content.findIndex((elem) => elem.name === productName);
    currentGroup.content[productIndex].quantity += quantity;
    const newProductData = this.state.productData.slice();
    newProductData.splice(groupIndex, 1, currentGroup);
   
    this.setState({ productData: newProductData, cart: newCart });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="Grocery-list">
          {this.state.productData.map(goodGroup => (
            <ProductGroup
              key={goodGroup.id}
              groupName={goodGroup.groupName}
              id={goodGroup.id}
              content={goodGroup.content}
              exchangeRate={this.state.usdToRubExchangeRate}
              addToCart={this.addToCart}
            />
          ))}
        </div>
        <Cart
          className="Cart-list"
          cart={this.state.cart}
          exchangeRate={this.state.usdToRubExchangeRate}
          removeFromCart={this.removeFromCart}
        />
      </div>
    );
  }
}

export default App;
