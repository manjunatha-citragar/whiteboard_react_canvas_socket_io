import rough from 'roughjs/bundled/rough.esm';
import {toolTypes} from '../../../constants';

const generator = rough.generator();

const generatorRectangle = ({x1, x2, y1, y2}) => {
    return generator.rectangle(x1, y1, x2-x1, y2-y1)
}

export const createElement = ({x1,x2, y1, y2, toolType, id}) => {
    let roughElement;
    
    switch(toolType) {
        case toolTypes.RECTANGLE:
            roughElement = generatorRectangle({x1, x2, y1, y2});
            return {
                id,
                roughElement,
                type: toolType,
                x1,
                y1,
                x2,
                y2
            }
            
        default: 
            throw new Error('Something went wrong while creating element');
    }
};