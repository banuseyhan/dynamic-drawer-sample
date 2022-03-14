import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fireStore } from "../../../firebase-config";
export default class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler = () => {
    fireStore
      .collection("productStock")
      .where("productId", "==", this.props.productItem.productId)
      .get()
      .then((response) => {
        var quantity = 0;
        response.forEach(item=>{
            quantity = item.data().quantity;
        })
        console.log("Stok Adedi")
        console.log(quantity);
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.clickHandler}>
          <Text>{this.props.productItem.name}</Text>
          <Text>{this.props.productItem.description}</Text>
          <Text>{this.props.productItem.price}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
