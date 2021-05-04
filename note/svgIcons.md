#### 📚에러/배운 것 정리 :

</br>
</br>

**1. bitmap**

(JPEG,PNG,GIF 등이 여기 속함.)

- 이미지의 각 픽셀이 어떤 색으로 그려질지 정의된 대로 이미지가 구현된다.
- 고퀄리티의 이미지 구현에 적합함
- can be heavy for low-resolution devices or if they are connected to a low
  bandwidth work.

</br>

**2. svg**

- vector image format for the web
- 각 픽셀이 어떻게 그려질지 rendering software 가 명령을 내려서 이미지 표현하는 방식.
- 상대적으로 무겁지 않은 간단한 이미지를 특히 사이즈별로 그려야할 때, 아이콘이나 막대그래프의 bar같은 이미지들을 그릴 때 유용하다.

**+ 참고 )**

- svg는 HTML과 같이 text-written tag임.
- HTML처럼 css 스타일링이 가능함
- HTML처럼 js와 함께 쓰일 수 있다.
- HTML은 본래 문서 describing을 위해서 만들어진 것이고, svg는 이미지 describing을 위해 만들어진 것이다.

- Inskape, Illustrator, Sketch등이 svg작업용 소프트웨어 대표.
  snap.svg, Bonsai, D3.js등의 svg용 자바스크립트 라이브러리도 있음.

</br>

**3. SvgIcon**

커스텀 SVG 아이콘을 사용할 수 있도록 mui가 제공하는 컴포넌트. fontSize, component 등 material-ui/icons가 제공했던 props를 그대로 쓸 수 있다.

</br>

**참고 사이트:**
https://material-ui.com/components/icons/
https://www.youtube.com/watch?v=hA7ESX7FsE4
</br>

#### 👩‍💻해결/코드 구현 :

- material-icons 삭제하고(패키지 자체가 무겁기 때문에) svg로 모든 이모티콘 대체

```js
const ExpandMore = ({ fontSize, component }) => {
  return (
    <SvgIcon fontSize={fontSize} component={component}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 90 90"
        enable-background="new 0 0 55.751 55.751"
      >
    //<---코드 생략--->
      </svg>
    </SvgIcon>
  );
};
```
