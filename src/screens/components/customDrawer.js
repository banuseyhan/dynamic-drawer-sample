import React, { Component } from "react";
import { View, Text, FlatList,TouchableOpacity } from "react-native";
import { fireStore } from "../../../firebase-config";
export default class CustomDrawer extends Component {
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
      .then((result) => {
        var list = [];
        result.forEach((item) => {
          list.push({
            docId: item.id,
            category: item.data(),
          });
        });

        this.setState({
            categories : list
        })

      });
  }

  renderItem = ({item})=>{
      return(<View>
          <TouchableOpacity>
              <Text>{item.name}</Text>
          </TouchableOpacity>
      </View>)
  }

  render() {
    return (
      <View style={{ paddingTop: 50 }}>
        <FlatList
          data={this.state.categories}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.docId}
        />
      </View>
    );
  }
}
