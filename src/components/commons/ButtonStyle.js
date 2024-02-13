import styled from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/sizes';

const {large} = sizeNames;
const {primary, white} = colorNames;

// 메인 큰 버튼 ex) 로그인 버튼
export const BigButton = styled.button`
    background: ${({color}) => (color ? colorNames[color] : primary)};
    font-size: ${({fsize}) => (fsize ? sizeNames[fsize] : large)};
    width: ${({width}) => width || '100%'};
    height: ${({height}) => height || '40px'};
    color: ${({fcolor}) => (fcolor ? colorNames[fcolor] : white)};
    border: 1px solid ${({bcolor}) => (bcolor ? colorNames[bcolor] : primary)};
    cursor: pointer;
    border-radius: 3px;

    & + & {
        margin-left: 5px;
    }
`;

// 여러 개의 버튼 그룹
export const ButtonGroup = styled.div``;