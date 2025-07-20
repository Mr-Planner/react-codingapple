// object type array
let data = [
    {
        // state에 저장된 순서가 바뀔 수 있으니 id값으로 인덱스 지정하면 된다
        id: 0,
        img: "/airforce.png",
        title: "Nike Airforce",
        content: "Classic sneakers",
        price: 120000
    },

    {
        id: 1,
        img: "/superstar.png",
        title: "Adidas Superstar",
        content: "Symbol of 1990s",
        price: 110000
    },

    {
        id: 2,
        img: "/newbalance.png",
        title: "Newbalance 2002",
        content: "Steady gray sneakers",
        price: 130000
    }
]

// 변수, 함수, 컴포넌트도 export 가능 (컴포넌트 : jsx)
export default data;