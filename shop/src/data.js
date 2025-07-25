// object type array
let data = [
    // state에 저장된 순서가 바뀔 수 있으니 id값으로 인덱스 지정하면 된다
    {
        id : 0,
        title : "White and Black",
        content : "Born in France",
        price : 120000
    },

    {
        id : 1,
        title : "Red Knit",
        content : "Born in Seoul",
        price : 110000
    },

    {
        id : 2,
        title : "Grey Yordan",
        content : "Born in the States",
        price : 130000
    }
]

// 변수, 함수, 컴포넌트도 export 가능 (컴포넌트 : jsx)
export default data;