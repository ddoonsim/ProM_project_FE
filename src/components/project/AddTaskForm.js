import { InputText } from "../commons/InputStyle";


const AddTaskForm = () => {
    return (
        <>
            <h1>업무 추가</h1>
            <form>
                <InputText placeholder="업무 내용 요약"></InputText>
                <InputText placeholder="업무 내용 상세"></InputText>
            </form>
        </>
    );
}

export default AddTaskForm;