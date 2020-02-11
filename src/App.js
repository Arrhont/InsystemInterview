import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductGroup from './ProductGroup';

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

  return groupedGoods;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { productsData: [], usdToRubExchangeRate: 65 };
  }

  componentDidMount() {
    let datapromise = fetch('./data.json').then(response => {
      return response.json();
    });

    let namesPromise = fetch('./names.json').then(response => {
      return response.json();
    });

    Promise.all([datapromise, namesPromise]).then(([data, names]) => {
      this.setState({ productsData: groupDataGoods(data, names) });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        
        {this.state.productsData.map(goodGroup => (
          <ProductGroup 
            key={ goodGroup.id } 
            groupName={ goodGroup.groupName }
            id={ goodGroup.id } 
            content={goodGroup.content} 
            exchangeRate={this.state.usdToRubExchangeRate} 
          />
        ))}
      </div>
    );
  }
}

export default App;
