import React from 'react';
import Type from './Type';

function OrderPage() {
  return (
    <div>
        <h1>여행 상품</h1>
        <div>
            <Type OrderType ="products"/>
        </div>
        <div style={{display : "flex", marginTop : 20}}>
            <div style={{width : '50%'}}>
                <Type OrderType="options"/>
            </div>
            <div style={{width : '50%'}}>
                <h2>총 금액 : </h2><br/>
                <button>주문하기</button>
            </div>


        </div>
    </div>
  )
}

export default OrderPage;