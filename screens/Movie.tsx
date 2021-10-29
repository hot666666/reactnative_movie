import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "d99e10906e2ee7f3f74c493e0dde192b";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Loader = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;
const Container = styled.ScrollView``;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
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

const UpcomingScroll = styled.ScrollView`
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

const Movie: React.FC<NativeStackScreenProps<any, "Movie">> = ({
  navigation: { navigate },
}) => {
  const isDark = true; //useColorSchema()==="dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // true일때만 로딩표시

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getUpcoming(), getNowPlaying(), getTrending()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
      style={{ backgroundColor: "#1e272e" }}
    >
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
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        contentContainerStyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((movie) => (
          <TrendingMovie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
          </TrendingMovie>
        ))}
      </TrendingScroll>
      <ListTitle>Upcoming Movies</ListTitle>
      <UpcomingScroll showsHorizontalScrollIndicator={false}>
        {upcoming.map((movie) => (
          <UpcomingMovie key={movie.id}>
            <Poster path={movie.poster_path} />
            <UpcomingColumn>
              <Title>
                {movie.original_title.slice(0, 15)}
                {movie.original_title.length > 15 ? "..." : null}
              </Title>
              <Release></Release>
              <Content>{movie.overview.slice(0, 100)}...</Content>
            </UpcomingColumn>
          </UpcomingMovie>
        ))}
      </UpcomingScroll>
    </Container>
  );
};

export default Movie;
