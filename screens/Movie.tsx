import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import { useQueryClient, useQuery } from "react-query";
import { MovieResponse, moviesApi } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Loader = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;
const Container = styled.FlatList``;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
  margin-bottom: 40px;
`;
const TrendingMovie = styled.View`
  margin-right: 15px;
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const UpcomingScroll = styled.FlatList`
  margin-top: 20px;
`;
const UpcomingMovie = styled.View`
  margin-left: 30px;
  margin-bottom: 15px;
  flex-direction: row;
`;

const UpcomingColumn = styled.View`
  margin-left: 20px;
  width: 60%;
`;
const Content = styled.Text`
  color: white;
  opacity: 0.8;
  font-size: 13px;
`;
const Release = styled.Text``;

const Movie: React.FC<NativeStackScreenProps<any, "Movie">> = () => {
  const queryClient = useQueryClient();
  const isDark = true; //useColorSchema()==="dark";
  const {
    isRefetching: isRefetchingNowPlaying,
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isRefetching: isRefetchingTrending,
    isLoading: trendingLoading,
    data: trendingData,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const {
    isRefetching: isRefetchingUpcoming,
    isLoading: upcomingLoading,
    data: upcomingData,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const refreshing =
    isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ backgroundColor: "#1e272e" }}
      ListHeaderComponent={
        <>
          <Swiper
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 3,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          {trendingData ? (
            <FlatList
              style={{ marginTop: 20, marginBottom: 40 }}
              data={trendingData.results}
              keyExtractor={(item) => item.id + ""}
              horizontal
              contentContainerStyle={{ paddingLeft: 30 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TrendingMovie>
                  <Poster path={item.poster_path || ""} />
                  <Title>
                    {item.original_title.slice(0, 13)}
                    {item.original_title.length > 13 ? "..." : null}
                  </Title>
                </TrendingMovie>
              )}
            />
          ) : null}
          <ListTitle>Upcoming Movies</ListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <UpcomingMovie>
          <Poster path={item.poster_path || ""} />
          <UpcomingColumn>
            <Title>
              {item.original_title.slice(0, 15)}
              {item.original_title.length > 15 ? "..." : null}
            </Title>
            <Release></Release>
            <Content>{item.overview.slice(0, 100)}...</Content>
          </UpcomingColumn>
        </UpcomingMovie>
      )}
    />
  ) : null;
};

export default Movie;
