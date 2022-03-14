import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { fireStore } from "../../firebase-config";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    fireStore
      .collection("categories")
      .get()
      .then((response) => {
        var list = [];
        response.forEach((item) => {
          list.push({
            docId: item.id,
            category: item.data(),
          });
        });

        this.setState({
          categories: list,
        });
      });
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Product", {
              categoryId: item.category.categoryId,
            });
          }}
        >
          <Text>{item.category.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.categories}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.docId}
      />
    );
  }
}
