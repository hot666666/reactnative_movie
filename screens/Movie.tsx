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
import { useQueryClient, useQuery, useInfiniteQuery } from "react-query";
import { MovieResponse, moviesApi } from "../api";

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  const [refreshing, setRefresh] = useState(false);
  const queryClient = useQueryClient();
  const isDark = true; //useColorSchema()==="dark";
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const onRefresh = async () => {
    setRefresh(true);
    await queryClient.refetchQueries(["movies"]);
    setRefresh(false);
  };

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
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
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ""}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <UpcomingMovie>
          <Poster path={item.poster_path || ""} />
          <UpcomingColumn>
            <Title>
              {item ? item.original_title.slice(0, 15) : null}
              {item.original_title.length > 15 ? "..." : null}
            </Title>
            <Release></Release>
            <Content>{item ? item.overview.slice(0, 100) : null}...</Content>
          </UpcomingColumn>
        </UpcomingMovie>
      )}
    />
  ) : null;
};

export default Movie;

/*{
"pageParams": [undefined],
"pages": [
  {"dates": [Object], "page": 1, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 2, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 3, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 4, "results": [Array], "total_pages": 18, "total_results": 348}
  ]
}*/
