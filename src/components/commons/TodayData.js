const TodayData = () => {
    const week = ['월', '화', '수', '목', '금', '토', '일'];
    let now = new Date();
    let todayMonth = (now.getMonth()+1) > 9 ? (now.getMonth()+1) : (now.getMonth()+1);
    let todayDate = now.getDate() > 9 ? now.getDate() : '0' + now.getDate();
    let dayOfWeek = week[now.getDay()];
    return todayMonth + '월' + ' ' + todayDate + '일' + ' ' + dayOfWeek + '요일'
}
export default TodayData;