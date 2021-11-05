import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, test } from "../api";
import Poster from "../components/Poster";

const Loader = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
  margin-top: 10px;
`;

const Container = styled.ScrollView`
  background-color: #1e272e;
`;
const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 95%;
  margin: 15px auto;
`;
const Title = styled.Text`
  margin-top: 7px;
  color: white;
  font-weight: 600;
  align-items: center;
`;
const HSeparator = styled.View`
  margin-right: 10px;
`;

const Search = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [testData, setTestData] = useState(null);
  const onChangeText = (text: string) => setQuery(text);
  const {
    data: movieData,
    isLoading: isLoadingMovie,
    refetch: searchMovie,
  } = useQuery(["searchMovie", query], moviesApi.search, {
    enabled: false,
  });
  const onSubmit = async () => {
    if (query === "") {
      return;
    }
    searchMovie();
    const test = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=d99e10906e2ee7f3f74c493e0dde192b&language=en-US&query=${query}&page=1&include_adult=true`
      )
    ).json();
    console.log(movieData);
    setTestData(test);
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv show"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {isLoadingMovie ? (
        <Loader>
          <ActivityIndicator size="large" />
        </Loader>
      ) : null}
      {testData ? (
        <FlatList
          contentContainerStyle={{ paddingLeft: 30, marginBottom: 30 }}
          data={testData.results}
          ItemSeparatorComponent={HSeparator}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Stack", {
                  screen: "Detail",
                  params: { item },
                });
              }}
              style={{ alignItems: "center" }}
            >
              <Poster path={item.poster_path} />
              <Title>
                {item ? item.original_title.slice(0, 13) : null}
                {item.original_title.length > 13 ? "..." : null}
              </Title>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </Container>
  );
};

export default Search;
