"use client";

import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import Image from "next/image";
import TagButton from "@/components/TagButton";
import ArrowRight from "@/icons/ArrowRight";

type Props = {
  imageSrc: string;
  title: string;
  category: string;
};

type TagColor = "brown" | "green" | "blue";

const getTagColor = (category: string): TagColor => {
  switch (category.toLowerCase()) {
    case "category 1":
      return "brown";
    case "category 2":
      return "green";
    case "category 3":
      return "blue";
    default:
      return "brown"; // fallback
  }
};

const Wrapper = styled.div`
  width: 270px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #f0f0f0;
  cursor: pointer;

  &:hover .read-more-text {
    color: #031716;
  }

  &:hover .arrow-icon {
    display: inline;
  }

  @media (max-width: 1152px) {
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 140px;
  max-height: 140px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const Content = styled.div`
  max-height: 160px;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: -12px;
  position: sticky;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
  }
`;

const Title = styled(Typography)`
  color: #354545;
`;

const ReadMore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    text-decoration: underline;
    color: #9aa2a2;
  }

  .arrow-icon {
    display: none;
  }
`;

const BlogCard = ({ imageSrc, title, category }: Props) => {
  const tagColor = getTagColor(category);

  return (
    <Wrapper>
      <ImageWrapper>
        <StyledImage
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="(max-width: 768px) 100vw, 270px"
        />
      </ImageWrapper>
      <Content>
        <TagButton text={category} color={tagColor} />
        <Title variant="h4">{title}</Title>
        <ReadMore>
          <Typography variant="paragraph-medium" className="read-more-text">
            Read now
          </Typography>
          <span className="arrow-icon">
            <ArrowRight />
          </span>
        </ReadMore>
      </Content>
    </Wrapper>
  );
};

export default BlogCard;
