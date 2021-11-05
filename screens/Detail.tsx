import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Share,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { SCREEN_HEIGHT } from "./Movie";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";
import { moviesApi } from "../api";
import { useQuery } from "react-query";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native-gesture-handler";

const Container = styled.ScrollView`
  background-color: #1e272e;
`;
const Title = styled.Text`
  color: white;
  font-size: 28px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
  width: 70%;
`;
const Texts = styled.Text`
  margin-top: 7px;
  color: white;
  align-items: center;
  padding: 10px 10px;
  font-size: 17px;
  margin-bottom: 20px;
`;
const Column = styled.View`
  flex-direction: row;
`;

const Loader = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;
const Background = styled.Image``;
const VideoLink = styled.TouchableOpacity``;

export const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const ShareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = `https://www.imdb.com/title/${moviesData.imdb_id}/`;
    if (isAndroid) {
      await Share.share({
        message: `${params.item.overview}\nCheck it out: ${homepage}`,
        title: params.original_title,
      });
    } else {
      await Share.share({
        url: homepage,
        title: params.original_title,
      });
    }
  };
  const ShareBtn = () => (
    <TouchableOpacity onPress={ShareMedia}>
      <Ionicons name="share-outline" color="white" size={21} />
    </TouchableOpacity>
  );
  const { isLoading: moviesLoading, data: moviesData } = useQuery(
    ["movies", params.item.id],
    moviesApi.detail
  );
  useEffect(() => {
    setOptions({
      title: "Movie",
    });
  }, []);
  useEffect(() => {
    setOptions({
      headerRight: () => <ShareBtn />,
    });
  }, [moviesData]);
  const openYoutubLink = async (videoID) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <Container>
      <View
        style={{
          height: SCREEN_HEIGHT / 3,
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.item.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.item.poster_path} />
          <Title>{params.item.original_title}</Title>
        </Column>
      </View>
      <Texts>{params.item.overview}</Texts>
      {moviesLoading ? (
        <Loader>
          <ActivityIndicator size="large" />
        </Loader>
      ) : null}
      {moviesData?.videos?.results?.map((video) => (
        <VideoLink
          onPress={() => openYoutubLink(video.key)}
          key={video.key}
          style={{ flexDirection: "row", marginTop: 7, paddingLeft: 10 }}
        >
          <Ionicons name="logo-youtube" size={13} color="white" />
          <Text style={{ marginLeft: 5, color: "white", fontSize: 10 }}>
            {video.name}
          </Text>
        </VideoLink>
      ))}
    </Container>
  );
};
