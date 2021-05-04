#### 📚에러/배운 것 정리 :

</br>

**material ui의 withStyles로 DefaultUI를 만들고 컴포넌트별로 다른 스타일 override 했다.**

</br>

#### 👩‍💻해결/코드 구현 :

- DefaultMenu(example)

```js
export const DefaultMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    width: "35vw",
    [theme.breakpoints.up("lg")]: {
      width: "25vw",
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
```

- SearchDetail에서 다른 스타일 override해서 적용

```js
const StyledMenuBtn = withStyles({
  root: {
    width: "30vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
  },
  text: {
    width: "35vw",
    [theme.breakpoints.up("md")]: {
      width: "25vw",
    },
  },
})(DefaultMenuBtn);
```
