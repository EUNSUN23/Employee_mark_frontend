#### 📚에러/배운 것 정리 :

</br>

**React.memo로 쓸데없는 label 리렌더링 방지하기.**

pie그래프의 label을 컴포넌트로 만들면서 화면 사이즈가 변경될 때 등 필요없는 리렌더링이 너무 많이 일어난다. 컴포넌트로 넘겨지는 salary값이 달라질때만 때만 리렌더링 되도록 해야한다.

</br>

#### 👩‍💻해결/코드 구현 :

- memo의 두번째 인자로 prevProps, nextProps를 비교하는 함수를 넣기.

```js
const CustomizedPieLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    payload,
    index,
    activeIndex,
    overLg,
  } = props;

  //<---코드 생략--->

  return (
    <g>
        //<---코드 생략--->
    </g>
  );
};

export default memo(CustomizedPieLabel, (prevProps, nextProps) => {
  return prevProps.salary === nextProps.salary || nextProps.salary === null;
});

```
