### feature : 직원관리 application

### tools/library : material-ui, react-chart, etc..

---

#note

###21.02.24 수

-contextAPI로 키워드 관리를 하고 있지만 다른 State 관리를 위해서 리덕스를 설치해야할것같다.

###21.03.03 목

-직원카드 페이지를 완성했다. 추가적인 아이디어가 생각났다.

1. 검색결과가 좀 더 정리되어 보이면 좋겠다. 결과를 정렬하는 옵션이 있으면 좋을 것 같다.

\*직급검색 - 특정 직급만 보여주는 정렬

\*부서검색 - 직급위계에 따른 정렬(조직도?....), 특정 직급만 보여주는 정렬

\*직원카드 내에서도 볼 수 있는 정보를 선택적으로 볼 수 있게끔.

2. 전체 검색결과 수를 보여줄 수 있으면 좋겠다. (서버와 컴케할것)

3. 이름검색 시 정확한 당사자를 찾을 수 있으면 좋겠다(firstname, lastname 합쳐서. 이 역시 서버와 컴케)

4. 한 번 조회한 직원카드는 조회표시가 되었으면 좋겠다(서버와 컴케. post요청?..)

###21.03.04 목

1. Home 화면 디자인

background )

- SearchBar와 같은 색상 background

header )

- Employee mark 로고

main )

- 현재 전체 사원 수, 퇴사자 수, 업데이트 날짜
- 각 부서별 사원 수 입체그래프
  :사원 이모티콘 + 부서명

- nav버튼
  :사원검색 / 통계 보기 / 로그인
