#### 📚에러/배운 것 정리 :

</br>

**foreignObject 이용해서 그래프의 tick, label 커스터마이징하기**

rechart의 그래프들은 svg이고, 이 svg사이에 리액트 컴포넌트를 넣으려면 foreignObject라는 태그로 감싸고, width와 height값을 넣어야 한다고 한다.

</br>

**참고:** https://pganalyze.com/blog/building-svg-components-in-react

</br>

#### 👩‍💻해결/코드 구현 :

- PieLabel

```js
const PieLabel = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: ${(props) => props.color};
`;
```

- CustomizedPieLabel

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

  //<--코드생략-->

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={labelColor}
        strokeWidth={1}
        fill="none"
      />
      <foreignObject
        x={ex + (cos > 0 ? 0.5 : -3) * 12}
        y={ey - (cos > 0 ? 15 : 15)}
        width="100"
        height="20"
        textAnchor={textAnchor}
      >
        <PieLabel
          color={labelColor}
          active={active}
        >{`${payload.sal}`}</PieLabel>
      </foreignObject>
    </g>
  );
};
```
