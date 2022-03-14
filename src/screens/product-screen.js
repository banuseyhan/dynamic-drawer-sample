import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { fireStore } from "../../firebase-config";
import ProductItem from "./components/productItem";
export default class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {

    console.log(this.props.route.params);
    fireStore
      .collection("products")
      .where("categoryId", "==", this.props.route.params.categoryId)
      .get()
      .then((response) => {
        var list = [];
        response.forEach((item) => {
          list.push({
            docId: item.id,
            product: item.data(),
          });
        });
        this.setState({
          products: list,
        });
      });
  }

  renderItem = ({ item }) => {
    return (
      <ProductItem productItem={item.product}/>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.products}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.docId}
      />
    );
  }
}
