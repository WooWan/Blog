React를 이루는 근간에는 `Virtual DOM`이 있다. React는 "어떻게 웹이 바뀌는지" 보다 "웹이 어떤 모습이여야 하는지" 선언적 방식을 제공하고 있다. 따라서, 웹을 변경할때 이전 버전과의 비교를 통해 재조정(Reconciliation)하는데, 가장 빠르다고 알려진 비교 알고리즘은 O(n^3)으로 프로젝트의 크기가 조금만 커진다고 해도, 웹은 성능문제에서 자유로워 질 수 없다.

따라서, 리액트는 휴리스틱한 방식으로 Virtual DOM 을 통해 O(n) 시간 복잡도로 개선하였다. 이러한 개선된 시간 복잡도를 제공하는 휴리스틱 방식에는 두 가지 가정이 있다.

>
1. Two elements of different types will produce different trees.
2. The developer can hint at which child elements may be stable across different renders with a key prop.

첫번째로, 
두 개의 트리를 비교할 때 트리의 루트부터 비교하게 되는데, 아래와 같이 타입이 다를 경우, 완전히 이전 노드를 지우고 다시 생성하고 타입의 속성이 다를 때 해당하는 타입의 속성만 업데이트해줍니다.
``` html
1.타입이 다를경우, 노드를 지우고 다시 생성 
///이전
<div/>
///이후
<span/>
2. 타입의 속성만 다를 경우 해당 속성만 업데이트
/// title의 변경 없이, className만 업데이트가 일어난다.
<div className="before" title="stuff" />
<div className="after" title="stuff" />
```

두번째로,
React에서 배열이 있을 경우 map을 통해 자식 노드들을 생성해주는 경우가 많은데, 이럴 때 개발자들은 key prop을 통해 어떤 노드가 변경으로부터 안전한지 아래와 같이 hint를 주어야한다.

```javascript
 toDos.map((item) => {
 	return <ToDo key={item.id} />

```

![에러](https://images.velog.io/images/woohobi/post/69a40172-2512-4a30-9f85-199d5cfd6e47/image.png)
만약 주지 않는다면,, 리액트 처음 배울때 굉장히 우리를 정겹게 맞아주는 에러가 우리를 기다리고 있다.
이는 앞서 본 2번째 규칙과 밀접한 관계가 있다. 재조정 과정에서 child node를 재귀적으로 처리할 때, key 값이 없으면, 모든 노드들을 재생성하는 반면에, key 값이 있을 경우, key를 통해 비교함으로써 모든 노드들을 재생성 하는 대신에 새로운 노드만을 추가하는 방식으로 재조정이 이루어진다.
```html
<ul>
  <li key="2015">A</li>
  <li key="2016">B</li>
</ul>

<ul>
  <li key="2014">C</li>
  <li key="2015">A</li>
  <li key="2016">B</li>
</ul>

```
key 값을 가지고 있으므로, C가 맨앞에 추가되고, A와 B는 이동한다. 만약 key값이 없었다면, 비교 과정에서 C, A, B가 모두 재생성됩니다. 또한 재조정과정은 성능 최적화와 불변성과도 관련이 깊다.
