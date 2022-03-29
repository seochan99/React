import React, { useState } from 'react'

function SummaryPage() {
    const [checked, setChecked] = useState(false);

  return (
    <div>
        <form>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e)=>setChecked(e.target.checked)} //이벤트를 가져온다
                id="confirm-checkbox"
            />
            {/* htmlFor과 id가 같아야함 */}
            {/* label과 test에 적은게 동일해야함 */}
            <label htmlFor="confirm-checkbox">
            주문하려는 것을 확인하셨나요? 
            </label>
            <button disabled={!checked} type="submit">
                주문 확인
            </button>
        </form>
    </div>
  )
}

export default SummaryPage