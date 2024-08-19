
# \<label>

- 사용자 인터페이스 항목의 설명을 나타낸다.
- 스크린리더는 label을 읽기 때문에 \<input>과 함께 사용하면 유용하다.
    - \<input>에는 id 속성 필요
    - \<label>에는 id와 같은 값의 for 속성 필요
- for (htmlFor in React)
    
    ```html
    <div class="preference">
        <label for="cheese">Do you like cheese?</label>
        <input type="checkbox" name="cheese" id="cheese">
    </div>
    
    <div class="preference">
        <label for="peas">Do you like peas?</label>
        <input type="checkbox" name="peas" id="peas">
    </div>
    ```
    

# don't

- label 안에 anchors 또는 buttons와 같은 interactive element를 배치하지 마세요.
    
    ❎
    
    ```html
    <label for="tac">
      <input id="tac" type="checkbox" name="terms-and-conditions">
      I agree to the <a href="terms-and-conditions.html">Terms and Conditions</a>
    </label>
    ```
    
    ✅
    
    ```html
    <label for="tac">
      <input id="tac" type="checkbox" name="terms-and-conditions">
      I agree to the Terms and Conditions
    </label>
    <p>
      <a href="terms-and-conditions.html">Read our Terms and Conditions</a>
    </p>
    ```
    
- \<label> 안에 제목 요소를 배치하지 마세요. assistive technology를 방해합니다.
- \<input>이 유효한 value 속성을 가졌을 경우, 필요하지 않습니다.