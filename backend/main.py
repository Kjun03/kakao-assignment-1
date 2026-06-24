from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


# DB 설정
DATABASE_URL = "sqlite:///./todos.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# DB 모델 (테이블 구조 정의)
class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    completed = Column(Boolean, default=False)

# Pydantic 스키마 (요청/응답 데이터 구조 정의)
class TodoCreate(BaseModel):
    # 생성 시 필요한 필드를 직접 추가해보세요
    title: str
    completed: bool = False
    
class TodoUpdate(BaseModel):
    title: str | None = None
    completed: bool | None = None

# 테이블 생성
Base.metadata.create_all(bind=engine)

# FastAPI 앱 생성
app = FastAPI(title="Todo API")

# FastAPI 앱 미들웨어 및 CORS 설정
app.add_middleware(
    # 필요한 부분을 직접 작성해보세요.
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

# DB 세션 의존성
def get_db():
    # 필요한 부분을 직접 작성해보세요.
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 엔드포인트 구현
# API 목록에 해당되는 부분을 직접 구현해보세요.
@app.get("/todos")
def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()

@app.post("/todos")
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    db_todo = Todo(title=todo.title, completed=todo.completed)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.put("/todos/{id}")
def update_todo(id: int, todo_update: TodoUpdate, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == id).first()
    
    if not db_todo:
        raise HTTPException(status_code=404, detail="해당 Todo를 찾을 수 없습니다.")
    
    if todo_update.title is not None:
        db_todo.title = todo_update.title
    if todo_update.completed is not None:
        db_todo.completed = todo_update.completed
        
    db.commit()
    db.refresh(db_todo)
    return db_todo

@app.delete("/todos/{id}")
def delete_todo(id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == id).first()
    
    if not db_todo:
        raise HTTPException(status_code=404, detail="해당 Todo를 찾을 수 없습니다.")
    
    db.delete(db_todo)
    db.commit()
    return {"message": "삭제가 완료되었습니다."}