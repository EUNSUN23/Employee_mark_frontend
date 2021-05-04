#### 📚에러/배운 것 정리 :

</br>

**1. withStyles :**

hoc로, 스타일 객체를 return한다. MUI 공식문서의 API상세에 withStyles가 종류별 컴포넌트마다 넘겨주는 css명이 나와있으므로 이걸 참고해서 MUI의 컴포넌트 스타일을 바꿀 수 있다.
</br>

**2. makeStyles :**

mui에서 제공하는 react hook으로, 인자로 커스텀 스타일 객체를 받는다. 커스텀 스타일 객체의 클래스 이름을 키로 갖고 해당 클래스의 CSS 속성을 정의한 객체를 값으로 갖는다.
커스텀 스타일을 사용하려면 makeStyles함수의 리턴값을 classes 변수에 저장하고, 그 다음 커스텀 스타일이 필요한 곳에 className prop의 값으로 classes 변수에 저장된 클래스 이름을 넘겨준다.
</br>

**3. theme :**

withStyles를 컴포넌트의 스타일을 적용하는데 사용한다면, theme은 어플리케이션의 전체적인 스타일을 적용하는데 사용한다. ThemeProvider로 최상위 컴포넌트에 넘겨주어서, 어플리케이션 전역에 적용되게끔 한다.
</br>

</br>

#### 👩‍💻해결/코드 구현 :

- withStyles로 Slider 커스터마이징 하기

```js
const SalarySlider = withStyles((theme) => ({
  root: {
    color: "#6868ff",
    height: 2,
    padding: "15px 0",
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },
  //<---코드 생략--->
  mark: {
    backgroundColor: "#bfbfbf",
    height: "2vh",
    width: 1,
    marginTop: -4,
  },
  markActive: {
    opacity: 1,
  },
}))(Slider);
```

- theme으로 breakpoint 설정하기

```js
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#35c265",
    },
  },
});

export default theme;
```

참고 : mui공식문서(https://material-ui.com/)
