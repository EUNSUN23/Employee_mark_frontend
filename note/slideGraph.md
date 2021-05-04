#### 📚에러/배운 것 정리 :

</br>

**슬라이드형 그래프의 특정 슬라이드에서 slidePrev() 함수가 오작동한다.**

navigation 동작을 콘솔로 디버깅해봤더니, 현재 슬라이드의 x좌표(width값이 누적되는 방법)를 통해 index를 구하고, 이 index-1한 값으로 translate하는 로직을 사용하고 있었다.

예를들면

[0,425,950,1325...] 이런 식으로 전체 슬라이드 배열이 있고, 슬라이드가 넘어갈 수록 누적되는 x값(?)으로 해당 슬라이드가 전체배열에서 몇번째인지를 구하는데, 이 width가 어느 슬라이드에서는 이상하게 계산되고 있었고, index가 -1이 되어서 back클릭시 그냥 맨 앞으로 가버리는 거였다.

</br>

#### 👩‍💻해결/코드 구현 :

- back버튼 클릭 시 slidePrev()대신 current index를 직접 구해서 slideTo(current index-1)함.

```js
const onClickBackward = useCallback(() => {
  if (chartSwiper.isBeginning) return setDisabledNav("backward");
  if (disabledNav === "forward") setDisabledNav(null);

  const snappedIndex = chartSwiper.snapIndex;
  chartSwiper.slideTo(snappedIndex - 1);
}, [chartSwiper, disabledNav]);
```

참고 : swiper.js 공식문서(https://swiperjs.com/swiper-api#methods-and-properties)
