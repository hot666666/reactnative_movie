import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "../components/Poster";

const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`; // 색상의 표현방식

const Container = styled.ScrollView``;
// style={StyleSheet.absoluteFill}

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`; // margin: 0 auto; 내용물들 붙여주기.
const BgImg = styled.Image``;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
}) => {
  const isDark = true;
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        tint={isDark ? "dark" : "light"}
        intensity={85}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
