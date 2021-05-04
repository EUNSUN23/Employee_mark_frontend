#### 📚에러/배운 것 정리 :

</br>

**api 요청 묶어서 보내기(Promise all)**

Home에서 하는 api요청은 총 4개인데(dept,title,total,left), loader를 어느 시점에 끄고 페이지를 렌더링해야하는지 등의 문제로 인해 각각의 요청을 따로 따로 하는 것이 애매했다.

인터넷에 검색결과 두 개의 요청을 한번에 묶어서 response도 2개를 한꺼번에 받는 방법이 있었다.

</br>

#### 👩‍💻해결/코드 구현 :

- dept/title, total/left를 Promise.all로 묶어주기.

```js
export const getEmpAPI = async () => {
  const res = await Promise.all([getDeptEmp(), getTitleEmp()]);
  const deptEmp = res[0].data.packet;
  const titleEmp = res[1].data.packet;
  return {
    dept: deptEmp,
    title: titleEmp,
  };
};

export const getTotalAPI = async () => {
  const res = await Promise.all([getTotalEmp(), getLeftEmp()]);
  const total = res[0].data.packet[0].count;
  const left = res[1].data.packet[0].count;
  return {
    total: total,
    left: left,
  };
};
```

(출처 : https://www.youtube.com/watch?v=aoQSOZfz3vQ&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=13)
