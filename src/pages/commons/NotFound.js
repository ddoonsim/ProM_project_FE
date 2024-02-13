import E404 from '../../images/errors/404.png'

const NotFound = () => {
    return (
        <>
            <img src={E404} alt="error 404" />
            <h1>페이지 없음</h1>
        </>
    );
};

export default NotFound;