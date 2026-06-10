// 1. 상태 변수 선언 구역
let todoList = [];          // 모든 할 일 데이터를 담아둘 빈 배열
let currentFilter = "all";  // 현재 선택된 필터 상태 ('all', 'active', 'completed')
let currentDate = new Date(); // 화면에 보여줄 기준 날짜 (초기값은 오늘)

// 2. DOM 요소 선택 구역 (HTML에서 조작할 요소들을 가져옴)
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoListContainer = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const dateDisplay = document.getElementById("current-date-display");
const prevDateBtn = document.getElementById("prev-date-btn");
const nextDateBtn = document.getElementById("next-date-btn");

// 3. 앱 초기화 구역: 로컬스토리지에 저장된 데이터가 있다면 불러와서 todoList에 복원
const savedTodos = localStorage.getItem("minimalTodos");
if (savedTodos !== null) {
    todoList = JSON.parse(savedTodos); // 문자열을 자바스크립트 배열 객체로 변환
}

/**
 * 화면에 할 일 목록을 그려주는(렌더링) 핵심 함수
 * 데이터나 상태가 변경될 때마다 이 함수를 호출하여 화면을 최신화합니다.
 */
function renderTodo() {
    // 이전 목록을 모두 지우고 새롭게 다시 그림 (중복 방지)
    todoListContainer.innerHTML = "";

    // 1차 필터링: 화면의 '현재 날짜'와 일치하는 할 일만 걸러냄
    const targetDateStr = getFormatDateString(currentDate);
    let dateFilteredList = todoList.filter(todo => todo.date === targetDateStr);

    // 2차 필터링: 하단 탭(전체/진행 중/완료) 상태에 따라 한 번 더 걸러냄
    let filteredList = dateFilteredList;
    if (currentFilter === "active") {
        filteredList = dateFilteredList.filter(todo => !todo.completed);
    } else if (currentFilter === "completed") {
        filteredList = dateFilteredList.filter(todo => todo.completed);
    }

    // 최종적으로 걸러진 목록들을 순회하며 HTML 요소를 동적으로 생성
    filteredList.forEach(todo => {
        // <li> 태그 생성 및 완료 여부에 따른 클래스 부여
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        // 텍스트를 담을 <span> 태그 생성
        const textSpan = document.createElement("span");
        textSpan.className = "todo-text";
        textSpan.textContent = todo.text;
        
        // 버튼들을 담을 <div> 태그 생성
        const buttonGroup = document.createElement("div");
        buttonGroup.className = "button-group";

        // 완료/취소 버튼 생성 및 클릭 이벤트 연결
        const completeBtn = document.createElement("button");
        completeBtn.className = "action-btn complete-btn";
        completeBtn.textContent = todo.completed ? "취소" : "완료";
        completeBtn.addEventListener("click", () => toggleTodoComplete(todo.id));

        // 수정 버튼 생성 및 클릭 이벤트 연결
        const editBtn = document.createElement("button");
        editBtn.className = "action-btn edit-btn";
        editBtn.textContent = "수정";
        editBtn.addEventListener("click", () => editTodoText(todo.id));

        // 삭제 버튼 생성 및 클릭 이벤트 연결
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "action-btn delete-btn";
        deleteBtn.textContent = "삭제";
        deleteBtn.addEventListener("click", () => deleteTodoItem(todo.id));

        // 생성한 버튼들을 buttonGroup 컨테이너에 넣음
        buttonGroup.appendChild(completeBtn);
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        // 텍스트와 버튼 그룹을 <li> 태그에 넣고, 최종적으로 화면(ul)에 추가
        li.appendChild(textSpan);
        li.appendChild(buttonGroup);
        todoListContainer.appendChild(li);
    });
}

/**
 * 폼 제출 시 새로운 할 일을 배열에 추가하는 함수
 */
function addTodoItem(event) {
    // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막음
    event.preventDefault();
    
    // 입력값의 양옆 공백 제거
    const todoText = todoInput.value.trim();
    if (todoText === "") {
        alert("할 일을 입력해주세요.");
        return;
    }
    
    // 새 할 일 객체 생성 (고유 ID, 내용, 완료 상태, 현재 날짜)
    const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false,
        date: getFormatDateString(currentDate)
    };
    
    todoList.push(newTodo); // 원본 배열에 추가
    saveTodos();            // 변경된 데이터를 로컬스토리지에 저장
    todoInput.value = "";   // 입력창 비우기
    renderTodo();           // 화면 다시 그리기
}

/**
 * 할 일의 완료/미완료 상태를 반전시키는 함수
 */
function toggleTodoComplete(id) {
    // map을 사용해 클릭된 항목의 id와 일치하는 객체만 completed 속성을 뒤집음
    todoList = todoList.map(todo => {
        if (todo.id === id) {
            return {...todo, completed: !todo.completed}
        }
        return todo;
    });
    saveTodos();
    renderTodo();
}

/**
 * 기존 할 일의 텍스트를 수정하는 함수
 */
function editTodoText(id) {
    // 수정할 항목을 배열에서 찾음
    const todoToEdit = todoList.find(todo => todo.id === id);
    if (!todoToEdit) return;
    
    // prompt 창을 띄워 새 내용을 입력받음 (기존 내용을 기본값으로 보여줌)
    const updatedText = prompt("할 일을 수정하세요:", todoToEdit.text);
    if (updatedText === null) return; // '취소'를 누른 경우 함수 종료
    
    const trimmedText = updatedText.trim();
    if (trimmedText === "") {
        alert("할 일을 입력해주세요.");
        return;
    }
    
    todoToEdit.text = trimmedText; // 내용 변경
    saveTodos();
    renderTodo();
}

/**
 * 할 일을 배열에서 삭제하는 함수
 */
function deleteTodoItem(id) {
    // filter를 사용해 클릭된 항목의 id와 '일치하지 않는' 항목만 남겨서 새 배열 만듦
    todoList = todoList.filter(todo => todo.id !== id);
    saveTodos();
    renderTodo();
}

/**
 * 필터 탭(전체/진행 중/완료) 클릭 시 화면 상태를 변경하는 함수
 */
function handleFilterClick(event) {
    // 1. 모든 탭에서 'active' 클래스 제거
    filterButtons.forEach(btn => btn.classList.remove("active"));
    
    // 2. 방금 클릭한 탭에만 'active' 클래스 추가
    const clickedButton = event.target;
    clickedButton.classList.add("active");
    
    // 3. 버튼의 data-filter 속성값('all', 'active', 'completed')을 전역 변수에 저장
    currentFilter = clickedButton.getAttribute("data-filter");
    renderTodo();
}

/**
 * Date 객체를 받아서 'YYYY-MM-DD' 형식의 문자열로 변환하는 유틸리티 함수
 */
function getFormatDateString(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 상단 네비게이션에 현재 선택된 날짜 텍스트를 최신화하여 보여주는 함수
 */
function updateDateDisplay() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    dateDisplay.textContent = `${year}년 ${month}월 ${day}일`;
}

/**
 * 이전/다음 화살표 클릭 시 날짜를 하루 전/후로 변경하는 함수
 */
function changeDate(days) {
    // 현재 날짜에서 인자로 받은 숫자(-1 또는 1)만큼 일을 더함
    currentDate.setDate(currentDate.getDate() + days);
    updateDateDisplay();
    renderTodo();
}

/**
 * 데이터가 변경될 때마다 최신 todoList 배열을 로컬스토리지에 저장하는 함수
 */
function saveTodos() {
    // 자바스크립트 객체/배열을 JSON 형태의 문자열로 변환하여 저장
    localStorage.setItem("minimalTodos", JSON.stringify(todoList));
}

// 4. 이벤트 리스너 연결 구역 (버튼 클릭이나 폼 제출 등 사용자의 행동을 감지)
filterButtons.forEach(btn => {
    btn.addEventListener("click", handleFilterClick);
});
todoForm.addEventListener("submit", addTodoItem);
prevDateBtn.addEventListener("click", () => changeDate(-1));
nextDateBtn.addEventListener("click", () => changeDate(1));

// 5. 앱 실행 시 가장 먼저 동작하는 초기 렌더링 호출
updateDateDisplay();
renderTodo();