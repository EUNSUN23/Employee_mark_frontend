import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fade } from "@material-ui/core/styles";
import theme from "../../../shared/theme";
import Svg from "../../../shared/svgIcons";
import useInput from "../../../hooks/useInput";
import { openKeywords } from "../../../store/actions/keywords";
import { Input } from "../../UI/Input";

const InputContainer = styled.section`
  position: relative;
  margin-left: ${(props) => props.theme.spacing(3)};
  width: 85%;
`;

const SearchIcon = styled.article`
  padding: ${(props) => props.theme.spacing(0, 2)};
  height: 50%;
  position: absolute;
  pointer-events: none;
  top: 15%;
`;

const SearchName = () => {
  const [name, setName] = useInput("");
  const dispatch = useDispatch();

  const handleKeywords = (bool) => {
    dispatch(openKeywords(bool));
  };

  return (
    <InputContainer theme={theme} fade={fade}>
      <SearchIcon theme={theme}>
        <Svg name="Search" />
      </SearchIcon>
      <Input
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={name}
        onChange={setName}
        onFocus={() => handleKeywords(true)}
        onBlur={() => handleKeywords(false)}
        component="article"
      />
    </InputContainer>
  );
};

export default SearchName;
