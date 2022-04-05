import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import Type from '../Type';


// 테스트 케이스 1
test("display product images from server",async()=>{
    render(<Type orderType="products" />);
    // 이미지 찾기
    const productImages = await screen.findAllByRole("img",{
        name: /product$/i // i를 통해 대소문자 구문없이 잡아줌 
    })
    expect(productImages).toHaveLength(2);

    const altText = productImages.map((element)=>element.alt);
    expect(altText).toEqual(["America product","England product"]);
})

// 테스트 케이스 2 
test("when fetching product data, face an error", async()=>{
    server.resetHandlers(
        rest.get(`http://localhost:4000/products`,(req,res,ctx)=>{
            return res(ctx.status(500))
        })
    )
    render(<Type orderType="products"/>)

    const errorBanner = await screen.findByTestId("error-banner")
    expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");
})

// 테스트 케이스3
test("fetch option imformation from server", async()=>{
    render(<Type orderType="options" />)
    // bring checkbox
    const optionCheckboxes = await screen.findAllByRole("checkbox");
    expect(optionCheckboxes).toHaveLength(2);
})