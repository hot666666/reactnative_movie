import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Poster from "../components/Poster";
import { RefreshControl } from "react-native";

const Loader = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;
const TrendingContainter = styled.View``;
const Title = styled.Text`
  margin-top: 7px;
  color: white;
  font-weight: 600;
  align-items: center;
`;
const HSeparator = styled.View`
  margin-right: 10px;
`;

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    data: trendingData,
    isLoading: isLoadingTredning,
    isRefetching: isRefetchingTrending,
  } = useQuery(["tv", "trending"], tvApi.trending);
  const onRefresh = async () => {
    queryClient.refetchQueries(["tv"]);
  };
  const {
    data: todayData,
    isLoading: isLoadingToday,
    isRefetching: isRefetchingToday,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    data: topData,
    isLoading: isLoadingTop,
    isRefetching: isRefetchingTop,
  } = useQuery(["tv", "top"], tvApi.topRated);

  const loading = isLoadingTredning || isLoadingToday || isLoadingTop;
  const refreshing =
    isRefetchingTrending || isRefetchingTop || isRefetchingToday;
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: "#1e272e" }}
    >
      <TrendingContainter>
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          Trending Tv
        </Text>
        <FlatList
          contentContainerStyle={{ paddingLeft: 30, marginBottom: 30 }}
          data={trendingData.results}
          ItemSeparatorComponent={HSeparator}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <Poster path={item.poster_path} />
              <Title>
                {item.original_name.slice(0, 13)}
                {item.original_name.length > 13 ? "..." : null}
              </Title>
            </View>
          )}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          Today Tv
        </Text>
        <FlatList
          contentContainerStyle={{ paddingLeft: 30, marginBottom: 30 }}
          data={todayData.results}
          ItemSeparatorComponent={HSeparator}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <Poster path={item.poster_path} />
              <Title>
                {item.original_name.slice(0, 13)}
                {item.original_name.length > 13 ? "..." : null}
              </Title>
            </View>
          )}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 20,
            marginBottom: 20,
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          TopRated Tv
        </Text>
        <FlatList
          contentContainerStyle={{ paddingLeft: 30, marginBottom: 30 }}
          data={topData.results}
          ItemSeparatorComponent={HSeparator}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <Poster path={item.poster_path} />
              <Title>
                {item.original_name.slice(0, 13)}
                {item.original_name.length > 13 ? "..." : null}
              </Title>
            </View>
          )}
        />
      </TrendingContainter>
    </ScrollView>
  );
};

export default Tv;
